"use client";

import { PollsReturnType } from "@/lib/types";
import { fetchPolls } from "@/utils/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

type Props = {
  initialPolls: PollsReturnType;
};

export default function Polls({ initialPolls }: Props) {
  const { data: polls } = useQuery({
    queryKey: ["polls"],
    queryFn: fetchPolls,
    initialData: initialPolls,
  });

  if (!polls) return <h1>No Public Polls available</h1>;

  return (
    <div className="flex flex-col gap-5">
      {polls?.map(({ title, votes, id }) => {
        const totalVotes = votes.length;
        return (
          <div
            key={id}
            className="border rounded p-4 flex flex-col gap-2 max-w-screen-sm"
          >
            <h2 className="text-lg">{`${title}`}</h2>
            <p className="text-sm text-slate-500">
              Total {totalVotes === 1 ? "vote" : "votes"}: {`${totalVotes}`}
            </p>
            <Link href={`/polls/${id}`} className="underline">
              Visit poll
            </Link>
          </div>
        );
      })}
    </div>
  );
}
