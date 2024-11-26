'use server'

import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export default async function getProperty() {
  try {
    const content = await prisma.property.findMany({
      where: {
        // Add filters if needed, or leave empty to fetch all
      },
    });

    const plainContent = JSON.stringify(content);
    return content

    // return NextResponse.json(plainContent, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
  // } else {
  //   // Response.json.status(405).json({ error: 'Method not allowed' });
  // }
}