import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

type IdParam = {
  params: { id: string };
};

export async function GET(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  const data = await prisma.task.findUnique({ where: { id } });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  let data = await request.json();
  data.id = id;
  await prisma.task.update({ where: { id }, data });
  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  await prisma.task.delete({ where: { id } });
  return NextResponse.json({
    deleted: id,
  });
}
