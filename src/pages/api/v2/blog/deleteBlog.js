// import prisma from "@/libs/prisma";

// export default async function handler(req, res) {
//   if (req.method === "DELETE") {
//     const { id } = req.body;

//     if (!id) {
//       return res.status(400).json({ error: "Blog ID is required" });
//     }

//     try {
//       // Delete related items first (if needed)
//       await prisma.item.deleteMany({
//         where: { contentId: id },
//       });

//       // Then delete the blog
//       await prisma.blog.delete({
//         where: { id },
//       });

//       res.status(200).json({ success: true, message: "Blog deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//       res.status(500).json({ error: "Failed to delete blog" });
//     }
//   } else {
//     res.setHeader("Allow", ["DELETE"]);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }

import prisma from "@/libs/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

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
        return res.status(403).json({ error: "Forbidden. You are not allowed to delete this blog." });
      }

      // Delete related items first (if needed)
      await prisma.item.deleteMany({
        where: { contentId: id },
      });

      // Then delete the blog
      await prisma.blog.delete({
        where: { id },
      });

      res.status(200).json({ success: true, message: "Blog deleted successfully." });
    } catch (error) {
      console.error("Error deleting blog:", error);

      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Unauthorized. Token has expired." });
      }

      res.status(500).json({ error: "Failed to delete blog. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
