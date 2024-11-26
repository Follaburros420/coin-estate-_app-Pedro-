import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  try {
    const testData = await prisma.$queryRaw`SELECT 1;`; // Replace with your DB-specific test query
    res.status(200).json({ success: true, data: testData });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
