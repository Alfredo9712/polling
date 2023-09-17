import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prismaClient";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(
  request: Request,
  { params }: { params: { pollid: string } }
) {
  //   if (!session) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }
  //   return NextResponse.json(predictions);
}
