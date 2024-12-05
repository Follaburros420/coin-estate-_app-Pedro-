// import prisma from "@/libs/prisma";

// export default async function handler(req, res) {
//   if (req.method === "PUT") {
//     const { id, heading, details, image, description, subheading, items } = req.body;

//     if (!id) {
//       return res.status(400).json({ error: "Blog ID is required" });
//     }

//     try {
//       // Update the blog with the provided data
//       const updatedBlog = await prisma.blog.update({
//         where: { id },
//         data: {
//           heading,
//           details,
//           image,
//           description,
//           subheading,
//           items: {
//             upsert: items.map((item) => ({
//               where: { id: item.id || 0 }, // Use item ID if available, otherwise default to 0 (non-existing ID)
//               update: {
//                 name: item.name,
//                 text_details: item.text_details,
//               },
//               create: {
//                 name: item.name,
//                 text_details: item.text_details,
//               },
//             })),
//           },
//         },
//         include: { items: true }, // Include updated related items if needed
//       });

//       res.status(200).json({ success: true, data: updatedBlog, message: "Blog updated successfully" });
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       res.status(500).json({ error: "Failed to update blog" });
//     }
//   } else {
//     res.setHeader("Allow", ["PUT"]);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }

import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, heading, details, image, description, subheading, items } = req.body;

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

      if (!id) {
        return res.status(400).json({ error: "Blog ID is required." });
      }

      // Verify ownership (optional, if blogs are user-specific)
      const blog = await prisma.blog.findUnique({
        where: { id },
        select: { userId: true },
      });

      if (!blog) {
        return res.status(404).json({ error: "Blog not found." });
      }

      if (blog.userId !== decoded.userId) {
        return res.status(403).json({ error: "Forbidden. You are not allowed to update this blog." });
      }
      console.log("🚀 ~ handler ~ decoded:", decoded, blog)

      // Update the blog with the provided data
      const updatedBlog = await prisma.blog.update({
        where: { id },
        data: {
          heading,
          details,
          image,
          description,
          userId:blog.userId,
          subheading,
          items: {
            upsert: items.map((item) => ({
              where: { id: item.id || 0 }, // Use item ID if available, otherwise default to 0 (non-existing ID)
              update: {
                name: item.name,
                text_details: item.text_details,
              },
              create: {
                name: item.name,
                text_details: item.text_details,
              },
            })),
          },
        },
        include: { items: true }, // Include updated related items if needed
      });

      res.status(200).json({ success: true, data: updatedBlog, message: "Blog uuserIdpdated successfully." });
    } catch (error) {
      console.error("Error updating blog:", error);

      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized. Token has expired." });
      }

      res.status(500).json({ error: "Failed to update blog. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
