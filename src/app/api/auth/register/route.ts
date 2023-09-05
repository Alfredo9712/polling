import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaClient";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export async function POST(request: Request) {
  const res = await request.json();
  const { email, password } = res;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const token = jwt.sign({ data: email }, process.env.JWT_SECRET as Secret, {
    expiresIn: "3h",
  });

  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email,
    },
  });

  const authedResponse = NextResponse.json(newUser, { status: 200 });

  authedResponse.cookies.set({
    name: "AUTH_TOKEN",
    value: token,
    sameSite: "lax",
    httpOnly: true,
    secure: true,
    path: "/",
  });
  return authedResponse;
}
