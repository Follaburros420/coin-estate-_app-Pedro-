// import prisma from "@/libs/prisma";

// export default async function handler(req, res) {
//   if (req.method === "DELETE") {
//     const { blogId } = req.body; // Extract `blogId` from the request body

//     if (!blogId) {
//       return res.status(400).json({ error: "Blog ID is required" });
//     }

//     try {
//       // First, delete related items
//       await prisma.item.deleteMany({
//         where: {
//           contentId: blogId, // Ensure this matches your schema
//         },
//       });

//       // Then, delete the blog
//       await prisma.blog.delete({
//         where: {
//           id: blogId,
//         },
//       });

//       res.status(200).json({ success: true, message: "Blog and related items deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting blog:", error);

//       // Handle specific errors if Prisma throws them
//       if (error.code === "P2025") {
//         // Record not found
//         return res.status(404).json({ error: "Blog not found" });
//       }

//       // General error response
//       res.status(500).json({ error: "An error occurred while deleting the blog" });
//     }
//   } else {
//     // If method is not DELETE, return Method Not Allowed
//     res.setHeader("Allow", ["DELETE"]);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }
// pages/api/blog/delete.js
import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    try {
      // Delete related items first (if needed)
      await prisma.item.deleteMany({
        where: { contentId: id },
      });

      // Then delete the blog
      await prisma.blog.delete({
        where: { id },
      });

      res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ error: "Failed to delete blog" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
