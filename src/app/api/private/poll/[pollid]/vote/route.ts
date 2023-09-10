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
  const { pollOptionId } = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

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
              connectOrCreate: {
                where: {
                  id: session.user.id as string,
                },
                create: {
                  id: session.user.id as string,
                },
              },
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
}

// where: {
//     id: pollid,
//   },
//   data: {
//     pollOptions: {
//       update: {
//         where: {
//           id: pollOptionId,
//         },
//         data: {
//           votes: {
//             connect: {
//               id: pollOptionId,
//             },
//           },
//         },
//       },
//     },
//   },
