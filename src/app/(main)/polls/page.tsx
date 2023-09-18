import { Plus } from "lucide-react";
import prisma from "../../../../prisma/prismaClient";
import Link from "next/link";

import Polls from "@/compononents/ui/polls";

export default async function PollsPage() {
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
          Create Poll
        </Link>
      </div>
      <Polls initialPolls={polls} />
    </div>
  );
}
