'use server'

import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export default async function getBlogsList() {
  try {
    const content = await prisma.blog.findMany({
      where: {
        // Add filters if needed, or leave empty to fetch all
      },
    });

    return content

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}