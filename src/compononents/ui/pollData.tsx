"use client";
import { PollType } from "@/lib/types";
import { fetchPoll } from "@/utils/apis";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PollOption from "./pollOption";
import axios from "axios";
import Pusher from "pusher-js";
import type { PusherEvent } from "../../../types/pusher-events/PusherEvent";

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

  const { pollOptions } = poll;

  const handleVote = async (pollOptionId: string) => {
    try {
      const { data } = await axios.post(`/api/private/poll/${poll.id}/vote`, {
        pollOptionId,
      });
    } catch (error) {}
  };

  return (
    <div className="mt-14 grid grid-cols-3 gap-10 gap-y-48">
      {pollOptions?.map((pollOption) => (
        <PollOption
          key={pollOption.id}
          pollOption={pollOption}
          handleVote={handleVote}
        />
      ))}
    </div>
  );
}
