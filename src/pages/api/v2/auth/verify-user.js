// import prisma from '@/libs/prisma';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';

// const generateCode = () => {
//   const code = Math.floor(100000 + Math.random() * 900000); // 6-digit number
//   return code.toString(); // Ensure it's a string
// };

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { email } = req.body;
//   console.log('🚀 ~ handler ~ email:', email);
//   // Find user by email
//   const user = await prisma.user.findUnique({ where: { email } });
//   console.log('🚀 ~ handler ~ user:', user);
//   if (!user) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   // Generate a reset token
//   const hashedToken = crypto.createHash('sha256').update(generateCode).digest('hex');

//   // Set token and expiration
//   const tokenExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
//   const { id, ...userData } = user;
//   await prisma.user.update({
//     where: { id: id },
//     data: {
//       ...userData,
//       verificationCode: hashedToken,
//     },
//   });

//   // Send email with reset link
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports like 587
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;
//   const mailOptions = {
//     from: `"Coin Estate" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Password Reset Request - Coin Estate',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h2 style="color: #333;">Password Reset Request</h2>
//         <p>You requested a password reset for your Coin Estate account.</p>
//         <p>Click the button below to reset your password:</p>
//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${resetUrl}" 
//              style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
//             Reset Password
//           </a>
//         </div>
//         <p style="color: #666; font-size: 14px;">This link will expire in 15 minutes.</p>
//         <p style="color: #666; font-size: 14px;">If you didn't request this reset, please ignore this email.</p>
//       </div>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Password reset email sent' });
//   } catch (error) {
//     console.error('Email error:', error);
//     res.status(500).json({
//       error: 'Could not send email',
//       details: process.env.NODE_ENV === 'development' ? error.message : undefined,
//     });
//   }
// }


import prisma from '@/libs/prisma';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const generateCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  return code.toString();
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  console.log(req.body)
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Generate and hash verification code
  const verificationCode = generateCode();
  console.log({verificationCode})
  const hashedCode = crypto.createHash('sha256').update(verificationCode).digest('hex');
  const expiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  // Update user in database
  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationCode: hashedCode,
      resetTokenExpires: expiration, // reuse existing field if you want expiry
    },
  });

  // Send email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Coin Estate" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - Coin Estate',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Email Verification</h2>
        <p>Use the following code to verify your email address:</p>
        <h3 style="color: #4CAF50; font-size: 24px;">${verificationCode}</h3>
        <p>This code will expire in 15 minutes.</p>
        <p>If you didn't request this, please ignore this message.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification code sent to email' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Could not send email' });
  }
}
