import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  return NextResponse.json({ users });
}
