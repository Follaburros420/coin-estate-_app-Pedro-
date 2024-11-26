'use server'

import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export default async function createProperty(data) {
  try {
    const content = await prisma.property.create({
      data
    });

    const plainContent = JSON.stringify(content);

    return { message: 'Blog Created Successfully' };
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}
