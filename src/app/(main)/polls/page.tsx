import prisma from "../../../../prisma/prismaClient";
import Link from "next/link";

import { Plus } from "lucide-react";

export default async function PollsPage() {
  //TODO: replace tshis with polls
  const polls = await prisma.poll.findMany();

  return (
    <div className="mx-auto ">
      <div className="flex items-center justify-between mb-14">
        <h1 className="font-medium text-lg">View active polls</h1>
        <Link
          href="/polls/add"
          className="bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 rounded-md flex py-2 px-3 items-center gap-1"
        >
          <Plus size={20} />
          Add poll
        </Link>
      </div>
      <div>
        {polls.map(({ title, description, id, userId }) => (
          <div key={id} className="border rounded p-4">
            <p>{title}</p>
            <Link href={`/polls/${id}`}>Visit poll</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
