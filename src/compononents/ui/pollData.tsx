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
import ClosePoll from "./closePoll";
import { useSession } from "next-auth/react";

interface Props {
  initialPoll: PollType;
}

export default function PollData({ initialPoll }: Props) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
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

  useEffect(() => {
    const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "us3",
    });

    const channel = pusherClient.subscribe(`poll`);

    channel.bind("close", (event: PusherEvent) => {
      const queryKey = [...event.entity, event.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    });

    return () => {
      channel.unbind("close");
      pusherClient.unsubscribe(`close`);
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

  if (poll.isClosed) {
    //find poll with the move votes
    const winningPoll = poll.pollOptions.reduce((prev, current) => {
      return prev.votes.length > current.votes.length ? prev : current;
    });
    const winningPollData = [
      {
        id: winningPoll.text,
        votes: winningPoll.votes.length,
      },
    ];
    const { votes, text } = winningPoll;

    return (
      <div>
        <h2>Poll is closed, here are the results</h2>

        <h3>
          {text} was the winner with {votes.length} votes
        </h3>

        <div className="h-80 w-full">
          <BarChart
            title={"result"}
            keys={[winningPoll.text]}
            data={winningPollData}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {session?.user?.id === poll.userId ? (
        <div className="pt-5">
          <ClosePoll initialPollId={poll.id} />
        </div>
      ) : null}
      <div className="flex flex-col items-center justify-between ">
        <div className="h-[45vh] w-full">
          <BarChart title={title} keys={keys} data={data.reverse()} />
        </div>
        <div className="pt-10 grid grid-cols-1 w-full gap-2 gap-x-4  justify-between sm:grid-cols-2 ">
          {pollOptions.map((pollOption) => (
            <PollOption
              key={pollOption.id}
              pollOption={pollOption}
              handleVote={handleVoteClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
