// import prisma from '@/libs/prisma';
// import crypto from 'crypto';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { email, code } = req.body;

//   if (!email || !code) {
//     return res.status(400).json({ error: 'Email and code are required' });
//   }

//   // Find user by email
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || !user.verifiedCode || !user.resetTokenExpires) {
//     return res.status(404).json({ error: 'Invalid or expired code' });
//   }

//   // Check expiration
//   if (new Date() > user.resetTokenExpires) {
//     return res.status(400).json({ error: 'Verification code has expired' });
//   }

//   // Hash incoming code and compare
//   const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
//   if (hashedCode !== user.verifiedCode) {
//     return res.status(400).json({ error: 'Invalid verification code' });
//   }

//   // Code is valid → mark user as verified
//   await prisma.user.update({
//     where: { email },
//     data: {
//       verified: true,
//       verifiedCode: null,
//       resetTokenExpires: null,
//     },
//   });

//   return res.status(200).json({ message: 'User verified successfully' });
// }
import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. Missing or invalid token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.userId) {
      return res.status(401).json({ error: "Unauthorized. Invalid token payload." });
    }

    const { name, email, ...rest } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required fields." });
    }

    // Create new property linked to user
    const property = await prisma.property.create({
      data: {
        name,
        email,
        ...rest,
        userId: decoded.userId,
      },
    });

    return res.status(201).json({ message: "Property created successfully.", content: property });

  } catch (error) {
    console.error("JWT Verification Error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized. Invalid token." });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Unauthorized. Token has expired." });
    }

    return res.status(500).json({ error: "Failed to create property. Please try again later." });
  }
}
  