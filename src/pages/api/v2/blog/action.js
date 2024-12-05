import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { heading, items, details, image, description, subheading, blogStatus, email } = req.body;

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

      // Proceed to create the blog
      if (!heading || !details || !image || !description || !subheading) {
        return res.status(400).json({ error: "All required fields must be provided." });
      }

      // Create blog and related items
      const content = await prisma.blog.create({
        data: {
          heading,
          details,
          blogStatus,
          image,
          description,
          subheading,
          email,
          items: {
            create: items?.map((item) => ({
              name: item.name,
              text_details: item.text_details,
            })),
          },
          userId: decoded.userId, // Associate blog with the authenticated user
        },
        include: {
          items: true, // Include related items in the response
        },
      });

      return res.status(201).json({ success: true, data: content });
    } catch (error) {
      console.error("Error creating blog:", error);

      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized. Invalid token.33" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized. Token has expired." });
      }

      return res.status(500).json({ error: "Failed to create blog. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
