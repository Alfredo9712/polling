import { NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v4 as uuidv4 } from "uuid";

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

  const poll = await prisma.pollOptions.update({
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
