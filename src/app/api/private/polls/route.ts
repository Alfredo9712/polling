import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { pollid: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const polls = await prisma.poll.findMany({
    where: {
      isPublic: true,
      isClosed: false,
    },
    include: {
      votes: true,
    },
  });

  return NextResponse.json(polls);
}
