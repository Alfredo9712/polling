import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  request: Request,
  { params }: { params: { pollid: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { title, description, pollOptions } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id!,
      },
      data: {
        polls: {
          create: {
            title,
            description,
            pollOptions: {
              create: pollOptions,
            },
          },
        },
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}
