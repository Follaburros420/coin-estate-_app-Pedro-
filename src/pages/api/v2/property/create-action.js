// 'use server'

// import prisma from "@/libs/prisma";
// import { NextResponse } from "next/server";

// export default async function createProperty(data) {
//   try {
//     const content = await prisma.property.create({
//       data
//     });

//     const plainContent = JSON.stringify(content);

//     return { message: 'Blog Created Successfully' };
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
//   }
// }

import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body; // Access data from the request body
      const content = await prisma.property.create({
        data,
      });

      res.status(201).json({ message: "Property created successfully", content });
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ error: "Failed to create property" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

