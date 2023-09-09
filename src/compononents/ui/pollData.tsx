"use client";
import { PollType } from "@/lib/types";
import { fetchPoll } from "@/utils/apis";
import React from "react";
import { useQuery } from "react-query";
import PollOption from "./pollOption";

interface Props {
  initialPoll: PollType;
}

export default function PollData({ initialPoll }: Props) {
  const { data: poll, isLoading } = useQuery({
    queryKey: ["poll", initialPoll?.id],
    queryFn: () => fetchPoll(initialPoll?.id),
    initialData: initialPoll,
  });

  if (!poll) return <h1>No poll data</h1>;

  const { pollOptions } = poll;
  console.log(pollOptions);
  return (
    <div>
      {pollOptions.map((pollOption) => (
        <PollOption key={pollOption.id} pollOption={pollOption} />
      ))}
    </div>
  );
}
