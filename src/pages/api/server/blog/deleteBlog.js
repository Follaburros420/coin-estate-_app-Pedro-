'use server'

import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export default async function getBlogsList(blogId) {
  try {
    // Delete related items first
    await prisma.Item.deleteMany({
      where: {
        contentId: blogId, // Ensure this matches your schema
      },
    });

    // Then delete the blog
    await prisma.Blog.delete({
      where: {
        id: blogId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}