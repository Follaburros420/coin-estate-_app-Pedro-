import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Validate the Bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Missing or invalid token." });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.userId) {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }

      const data = req.body; // Access data from the request body

      // Ensure required fields are provided
      if (!data.name || !data.email) {
        return res.status(400).json({ error: "Name and address are required fields." });
      }

      // Associate the property with the authenticated user
      const propertyData = {
        ...data,
        userId: decoded.userId, // Include userId from the token
      };

      const content = await prisma.property.create({
        data: propertyData,
      });

      res.status(201).json({ message: "Property created successfully.", content });
    } catch (error) {
      console.error("Error creating property:", error);

      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized. Token has expired." });
      }

      res.status(500).json({ error: "Failed to create property. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}

