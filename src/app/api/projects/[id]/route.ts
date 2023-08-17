import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

type IdParam = {
  params: { id: string };
};

export async function GET(request: Request, { params }: IdParam) {  
  const id = parseInt(params.id);
  const data = await prisma.project.findUnique({ where: { id } });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  let data = await request.json();
  data.id = id;
  await prisma.project.update({ where: { id }, data });
  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({
    deleted: id,
  });
}
