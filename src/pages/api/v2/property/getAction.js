import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const properties = await prisma.property.findMany({
        where: {
          // Add filters if needed, or leave empty to fetch all
        },
      });

      res.status(200).json({ success: true, data: properties });
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ success: false, error: "Failed to fetch properties" });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
