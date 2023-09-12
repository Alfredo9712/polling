import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Pusher from "pusher";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "us3",
});

export async function POST(
  request: Request,
  { params }: { params: { pollid: string } }
) {
  const { pollid } = params;
  const { pollOptionId }: { pollOptionId: string } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // check if the user has already voted in this poll
    const existingVote = await prisma.votes.findMany({
      where: {
        userId: session.user.id!,
        pollId: pollid,
      },
    });

    // if a user has voted in the poll, delete it
    if (existingVote) {
      await prisma.votes.deleteMany({
        where: {
          userId: session.user.id!,
          pollId: pollid,
        },
      });
    }

    // add a new vote for this user on this poll
    const poll = await prisma.poll.update({
      where: {
        id: pollid,
      },
      data: {
        pollOptions: {
          update: {
            where: {
              id: pollOptionId,
            },
            data: {
              votes: {
                create: [{ userId: session.user.id!, pollId: pollid }],
              },
            },
          },
        },
      },
      include: {
        pollOptions: {
          include: {
            votes: true,
          },
        },
      },
    });

    await pusherServer.trigger(`poll`, "vote", {
      entity: ["polls", "detail"],
      id: poll.id,
    });

    return NextResponse.json(poll);
  } catch (error) {
    return new Response("Invalid request", { status: 400 });
  }
}
