"use client";
import { PollType } from "@/lib/types";
import { fetchPoll, handleVoteMutation } from "@/utils/apis";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PollOption from "./pollOption";
import Pusher from "pusher-js";
import type { PusherEvent } from "../../../types/pusher-events/PusherEvent";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import BarChart from "./barChart";

interface Props {
  initialPoll: PollType;
}

export default function PollData({ initialPoll }: Props) {
  const queryClient = useQueryClient();

  const { data: poll } = useQuery({
    queryKey: ["polls", "detail", initialPoll?.id],
    queryFn: () => fetchPoll(initialPoll?.id),
    initialData: initialPoll,
  });

  const pollMutation = useMutation({
    mutationFn: (pollOptionId: string) =>
      handleVoteMutation(pollOptionId, initialPoll?.id),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data);
      }
      toast("Something went wrong, please try again later");
    },
  });

  useEffect(() => {
    const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "us3",
    });

    const channel = pusherClient.subscribe(`poll`);

    channel.bind("vote", (event: PusherEvent) => {
      const queryKey = [...event.entity, event.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    });

    return () => {
      channel.unbind("vote");
      pusherClient.unsubscribe(`poll`);
    };
  }, []);

  if (!poll) return <h1>No poll data</h1>;

  const { pollOptions, title } = poll;
  const keys = pollOptions.map((pollOption) => pollOption.text);
  const handleVoteClick = async (pollOptionId: string) => {
    pollMutation.mutate(pollOptionId);
  };

  const data = pollOptions.map((pollOption) => ({
    id: pollOption.text,
    votes: pollOption.votes.length,
  }));

  return (
    <div>
      <div className="h-[600px] w-full">
        <BarChart title={title} keys={keys} data={data.reverse()} />
      </div>
      <div className="mt-14 grid grid-cols-3 gap-10 gap-y-48">
        {pollOptions?.map((pollOption) => (
          <PollOption
            key={pollOption.id}
            pollOption={pollOption}
            handleVote={handleVoteClick}
          />
        ))}
      </div>
    </div>
  );
}
