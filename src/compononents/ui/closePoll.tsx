"use client";

import { closePollMutation, fetchPoll } from "@/utils/apis";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  useQuery({
    queryKey: ["polls", "detail", initialPollId],
    queryFn: () => fetchPoll(initialPollId),
  });

  const closePoll = useMutation({
    mutationFn: closePollMutation,
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast(error.response?.data);
      }
      toast("Something went wrong, please try again later");
    },
  });

  return (
    <Button onClick={() => closePoll.mutate(initialPollId)}>Close poll</Button>
  );
}
