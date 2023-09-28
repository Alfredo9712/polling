import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import prisma from "../../../../../prisma/prismaClient";

export default async function PollsAddPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      polls: {
        include: {
          votes: true,
        },
      },
    },
  });

  if (!user) return null;

  const { polls } = user;
  return (
    <div>
      <Link href="/polls" className="flex gap-1 pb-5 w-fit">
        <ArrowLeft /> Back
      </Link>
      <div className="flex flex-col gap-5">
        {polls.length === 0 ? (
          <h1 className="text-2xl pb-2">
            You have no polls,{" "}
            <Link href={"/polls/add"} className="underline">
              click here
            </Link>{" "}
            to create poll
          </h1>
        ) : (
          polls.map(({ title, votes, id }) => {
            const totalVotes = votes.length;
            return (
              <div
                key={id}
                className="border rounded p-4 flex flex-col gap-2 max-w-screen-sm"
              >
                <h2 className="text-lg">{`${title}`}</h2>
                <p className="text-sm text-slate-500">
                  Total votes: {`${totalVotes}`}
                </p>
                <Link href={`/polls/${id}`} className="underline">
                  Visit poll
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
