import Link from "next/link";
import { BarChartBigIcon } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Avatar from "./avatar";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[75px] w-full font-medium flex items-center text-2xl justify-between">
      <div>
        <a
          href={`${session ? "/polls" : "/"}`}
          className="flex items-center gap-2"
        >
          polling
          <BarChartBigIcon />
        </a>
      </div>
      {session ? (
        <ul>
          <li>
            <Avatar profileImg={session?.user?.image} />
          </li>
        </ul>
      ) : null}
    </div>
  );
}
