import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const content = await prisma.blog.findMany({
        where: {
          // Add filters if needed, or leave empty to fetch all
        },
      });

      res.status(200).json({ message: "Blogs fetched successfully", data: content });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
