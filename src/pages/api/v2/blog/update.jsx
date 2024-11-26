import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, heading, details, image, description, subheading, items } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    try {
      // Update the blog with the provided data
      const updatedBlog = await prisma.blog.update({
        where: { id },
        data: {
          heading,
          details,
          image,
          description,
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

      res.status(200).json({ success: true, data: updatedBlog, message: "Blog updated successfully" });
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ error: "Failed to update blog" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
