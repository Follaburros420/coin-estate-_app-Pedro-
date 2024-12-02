import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const content = await prisma.blog.findMany();
      const item = await prisma.item.findMany();

      const details = content.map((blog)=>{
       const currentItems = item.filter(items=>items.contentId === blog.id)
        if(currentItems?.[0]?.contentId === blog?.id)
        return{
          ...blog,
          items:currentItems,
        }
      })

      res.status(200).json({ message: "Blogs fetched successfully", data: details });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
