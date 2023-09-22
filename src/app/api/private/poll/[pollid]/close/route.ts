import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/utils/pusher";

export async function POST(
  request: Request,
  { params }: { params: { pollid: string } }
) {
  const { pollid } = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const poll = await prisma.poll.findUnique({ where: { id: pollid } });

    if (!poll) {
      return new Response("Poll does not exist", { status: 404 });
    }

    if (poll.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const updatedPoll = await prisma.poll.update({
      where: {
        id: pollid,
        userId: session.user.id,
      },
      data: {
        isClosed: true,
      },
    });

    await pusherServer.trigger(`poll`, "vote", {
      entity: ["polls", "detail"],
      id: updatedPoll.id,
    });

    return NextResponse.json(updatedPoll);
  } catch (error) {
    return new Response("Invalid request", { status: 400 });
  }
}
