"use client";

import { closePollMutation } from "@/utils/apis";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Pusher from "pusher-js";
import type { PusherEvent } from "../../../types/pusher-events/PusherEvent";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { Button } from "./button";

export default function ClosePoll({
  initialPollId,
}: {
  initialPollId: string;
}) {
  const queryClient = useQueryClient();

  const closePoll = useMutation({
    mutationFn: closePollMutation,
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

    channel.bind("close", (event: PusherEvent) => {
      const queryKey = [...event.entity, event.id].filter(Boolean);
      queryClient.invalidateQueries({ queryKey });
    });

    return () => {
      channel.unbind("close");
      pusherClient.unsubscribe(`close`);
    };
  }, []);

  return (
    <Button onClick={() => closePoll.mutate(initialPollId)}>Close poll</Button>
  );
}
