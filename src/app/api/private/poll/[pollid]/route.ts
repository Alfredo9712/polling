import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { pollid: string } }
) {
  const { pollid } = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const poll = await prisma.poll.findUnique({
    where: {
      id: pollid,
    },
    include: {
      pollOptions: {
        include: {
          votes: true,
        },
      },
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return NextResponse.json(poll);
}
