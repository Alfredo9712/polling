"use client";
import { PollType } from "@/lib/types";
import { fetchPoll } from "@/utils/apis";
import React from "react";
import { useQuery } from "react-query";
import PollOption from "./pollOption";
import axios from "axios";

interface Props {
  initialPoll: PollType;
}

export default function PollData({ initialPoll }: Props) {
  const { data: poll } = useQuery({
    queryKey: ["poll", initialPoll?.id],
    queryFn: () => fetchPoll(initialPoll?.id),
    initialData: initialPoll,
  });

  if (!poll) return <h1>No poll data</h1>;

  const { pollOptions } = poll;

  const handleVote = async (pollOptionId: string) => {
    try {
      const { data } = await axios.post(`/api/private/poll/${poll.id}/vote`, {
        pollOptionId,
      });
      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="mt-14 grid grid-cols-3 gap-10 gap-y-48">
      {pollOptions.map((pollOption) => (
        <PollOption
          key={pollOption.id}
          pollOption={pollOption}
          handleVote={handleVote}
        />
      ))}
    </div>
  );
}