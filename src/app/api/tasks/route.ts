import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const projectId = params.get("projectId");
  let where = {};
  if (projectId) {
    where = { projectId: +projectId };
  }
  const data = await prisma.task.findMany({
    where,
    orderBy: [{ createdAt: "asc" }],
  });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  let data = await request.json();
  let newData = await prisma.task.create({ data });
  return NextResponse.json(newData, { status: 201 });
}
