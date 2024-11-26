'use server'

import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

// pages/api/content/create.js

// import prisma from "@/libs/prisma";

export default async function createBlog(data) {
  // if (request.method === 'POST') {
  const { heading, items, details, image, description, subheading } = data;

  try {
    const content = await prisma.Blog.create({
      data: {
        heading,
        details,
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
        items: true,
      },
    });

    const plainContent = JSON.parse(JSON.stringify(content));

    return NextResponse.json(plainContent, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
  // } else {
  //   // Response.json.status(405).json({ error: 'Method not allowed' });
  // }
}
