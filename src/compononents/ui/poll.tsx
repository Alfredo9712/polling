"use client";
import { PollType } from "@/lib/types";
import { fetchPoll } from "@/utils/apis";
import React from "react";
import { useQuery } from "react-query";

interface Props {
  initialPoll: PollType;
}

export default function PollData({ initialPoll }: Props) {
  const { data: poll, isLoading } = useQuery({
    queryKey: ["poll", initialPoll?.id],
    queryFn: () => fetchPoll(initialPoll?.id),
    initialData: initialPoll,
  });
  console.log(poll);
  if (!poll) return <div>No poll </div>;
  const { title } = poll;
  return <div>{title}</div>;
}
