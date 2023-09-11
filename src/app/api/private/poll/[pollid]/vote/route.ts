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
    // TODO: add validation to see if user has already voted on this poll

    const pollOption = await prisma.votes.findFirst({
      where: {
        userId: session.user.id!,
        pollOptionId: pollOptionId,
      },
    });

    if (pollOption) {
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
        },
      });

      return NextResponse.json(poll);
    }

    // delete previous votes
    await prisma.votes.deleteMany({
      where: {
        userId: session.user.id!,
      },
    });

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
                create: [{ userId: session.user.id! }],
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
