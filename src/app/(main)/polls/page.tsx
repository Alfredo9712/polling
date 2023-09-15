import prisma from "../../../../prisma/prismaClient";
import Link from "next/link";

import { Plus } from "lucide-react";

export default async function PollsPage() {
  //TODO: replace tshis with polls
  const polls = await prisma.poll.findMany({
    include: {
      votes: true,
    },
  });

  return (
    <div className="mx-auto ">
      <div className="flex items-center justify-between mb-14">
        <h1 className="font-medium text-lg">View public polls</h1>
        <Link
          href="/polls/add"
          className="bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 rounded-md flex py-2 px-3 items-center gap-1"
        >
          <Plus size={20} />
          Add poll
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        {polls.map(({ title, description, id, userId, votes }) => {
          const totalVotes = votes.length;
          return (
            <div
              key={id}
              className="border rounded p-4 flex flex-col gap-2 max-w-screen-sm"
            >
              <h2 className="text-lg">{title}</h2>
              <p className="text-sm text-slate-500">Total votes:{totalVotes}</p>
              <Link href={`/polls/${id}`} className="underline">
                Visit poll
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
