import prisma from '@/libs/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const FORGOT_PASSWORD_KEY = process.env.FORGOT_PASSWORD_KEY;
const ENCRYPTION_KEY = FORGOT_PASSWORD_KEY
  ? crypto.createHash('sha256').update(FORGOT_PASSWORD_KEY).digest()
  : null;
const SESSION_DURATION_MINUTES = Number.isFinite(Number(process.env.SOCIAL_SESSION_MINUTES))
  ? Number(process.env.SOCIAL_SESSION_MINUTES)
  : 60;

const PLACEHOLDER_PHONE = 'pending-update';

function getEncryptionKey() {
  if (!ENCRYPTION_KEY) {
    throw new Error('FORGOT_PASSWORD_KEY env variable is required for social login encryption.');
  }

  return ENCRYPTION_KEY;
}

function encrypt(text) {
  const key = getEncryptionKey();

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text) {
  const key = getEncryptionKey();

  const [iv, encrypted] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encrypted, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

async function fetchGoogleProfile(token) {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to verify Google token.');
  }

  const data = await response.json();

  if (!data?.email) {
    throw new Error('Google response did not include an email address.');
  }

  return {
    email: data.email,
    name: data.name ?? data.email.split('@')[0],
    picture: data.picture ?? null,
    providerAccountId: data.sub ?? data.id,
  };
}

async function fetchFacebookProfile(token) {
  const url = new URL('https://graph.facebook.com/me');
  url.searchParams.set('fields', 'id,name,email,picture.type(large)');
  url.searchParams.set('access_token', token);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to verify Facebook token.');
  }

  const data = await response.json();

  if (!data?.email) {
    throw new Error('Facebook response did not include an email address.');
  }

  return {
    email: data.email,
    name: data.name ?? data.email.split('@')[0],
    picture: data?.picture?.data?.url ?? null,
    providerAccountId: data.id,
  };
}

async function ensureUser({ email, name, picture, provider, providerAccountId }) {
  let user = await prisma.user.findUnique({ where: { email } });
  let isNewUser = false;

  if (!user) {
    const wallet = ethers.Wallet.createRandom();
    const hashedPassword = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);

    user = await prisma.user.create({
      data: {
        email,
        username: name,
        listHash: hashedPassword,
        phone: PLACEHOLDER_PHONE,
        termsAcceptedPolicy: false,
        termsAcceptedServices: false,
        image: picture,
        authProvider: provider,
        providerAccountId,
        destinationValues: encrypt(wallet.address),
        destinationCalculation: encrypt(wallet.privateKey),
        profileCompleted: false,
      },
    });

    await prisma.userRecords.create({
      data: {
        username: name,
        email,
        userId: user.id,
        address: wallet.address,
      },
    });

    isNewUser = true;
  } else {
    const updates = {};

    if (!user.authProvider) updates.authProvider = provider;
    if (!user.providerAccountId) updates.providerAccountId = providerAccountId;
    if (!user.username && name) updates.username = name;
    if (!user.image && picture) updates.image = picture;

    if (Object.keys(updates).length > 0) {
      user = await prisma.user.update({ where: { id: user.id }, data: updates });
    }
  }

  return { user, isNewUser };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET env variable is required.' });
  }

  try {
    const { provider, token } = req.body ?? {};

    if (!provider || !token) {
      return res.status(400).json({ error: 'Provider and token are required.' });
    }

    if (!FORGOT_PASSWORD_KEY) {
      return res
        .status(500)
        .json({ error: 'FORGOT_PASSWORD_KEY env variable is required for social login encryption.' });
    }

    const normalizedProvider = provider.toLowerCase();
    let profile;

    switch (normalizedProvider) {
      case 'google':
        profile = await fetchGoogleProfile(token);
        break;
      case 'facebook':
        profile = await fetchFacebookProfile(token);
        break;
      default:
        return res.status(400).json({ error: 'Unsupported provider.' });
    }

    const { user, isNewUser } = await ensureUser({
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: normalizedProvider,
      providerAccountId: profile.providerAccountId,
    });

    const sessionExpiresAt = new Date(Date.now() + SESSION_DURATION_MINUTES * 60 * 1000);
    await prisma.session.create({
      data: { userId: user.id, expiresAt: sessionExpiresAt },
    });

    const tokenPayload = { userId: user.id, expiresAt: sessionExpiresAt };
    const tokenOptions = { expiresIn: `${SESSION_DURATION_MINUTES}m` };
    const signedToken = jwt.sign(tokenPayload, JWT_SECRET, tokenOptions);

    const address = decrypt(user.destinationValues);
    const { listHash, destinationValues, destinationCalculation, ...userData } = user;

    return res.status(200).json({
      message: isNewUser ? 'Account created via social login.' : 'Login success.',
      user: {
        ...userData,
        address,
        token: signedToken,
      },
      isNewUser,
      needsProfileCompletion:
        !user.profileCompleted || !userData.phone || userData.phone === PLACEHOLDER_PHONE,
    });
  } catch (error) {
    console.error('Social login error:', error);
    return res.status(400).json({ error: error.message ?? 'Unable to complete social login.' });
  }
}
