import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

type IdParam = {
  params: { id: string };
};

export async function GET(request: Request, { params }: IdParam) {
  const id = parseInt(params.id);
  const data = await prisma.task.findMany({
    where: { projectId: id },
    orderBy: [{ createdAt: "asc" }],
  });
  return NextResponse.json(data);
}
