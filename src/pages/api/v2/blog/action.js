import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { heading, items, details, image, description, subheading, blogStatus } = req.body;

    if (!heading || !details || !image || !description || !subheading) {
      return res.status(400).json({ error: "All required fields must be provided." });
    }

    try {
      // Create blog and related items
      const content = await prisma.blog.create({
        data: {
          heading,
          details,
          blogStatus,
          image,
          description,
          subheading,
          items: {
            create: items?.map((item) => ({
              name: item.name,
              text_details: item.text_details,
            })),
          },
        },
        include: {
          items: true, // Include related items in the response
        },
      });

      return res.status(201).json({ success: true, data: content });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ error: "Failed to create blog. Please try again later." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed.` });
  }
}
