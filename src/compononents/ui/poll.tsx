"use client";
import { PollType } from "@/lib/types";
import { fetchPoll } from "@/utils/apis";
import React from "react";
import { useQuery } from "react-query";

interface Props {
  initialPoll: PollType;
}

export default function PollData({ initialPoll }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["poll", initialPoll?.id],
    queryFn: () => fetchPoll(initialPoll?.id),
    initialData: initialPoll,
  });

  console.log(data);

  if (!data) return <div>No Poll Options available </div>;
  return <div>poll</div>;
}
