import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET() {
  const data = await prisma.project.findMany({
    orderBy: [{ title: "asc" }],
  });
  console.log("data>>>>>", data);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  let data = await request.json();
  let newData = await prisma.project.create({ data });
  return NextResponse.json(newData, { status: 201 });
}
