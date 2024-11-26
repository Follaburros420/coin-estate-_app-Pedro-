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
