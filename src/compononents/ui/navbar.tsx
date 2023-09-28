import Link from "next/link";
import { BarChartBigIcon } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Avatar from "./avatar";
import prisma from "../../../prisma/prismaClient";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return null;

  return (
    <div className="h-[75px] w-full font-medium flex items-center text-2xl justify-between">
      <div>
        <Link
          href={`${session ? "/polls" : "/"}`}
          className="flex items-center gap-2"
        >
          polling
          <BarChartBigIcon />
        </Link>
      </div>
      {session ? (
        <ul className="flex items-center gap-6">
          <a
            href="/polls/me"
            className="text-slate-900 underline-offset-4 underline dark:text-slate-50 text-lg"
          >
            My Polls
          </a>
          <li>
            <Avatar profileImg={session?.user?.image} />
          </li>
        </ul>
      ) : null}
    </div>
  );
}
