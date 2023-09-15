import { PollOptionType } from "@/lib/types";
import { Button } from "./button";
import { useSession } from "next-auth/react";
import { cn } from "@/utils";

interface Props {
  pollOption: PollOptionType;
  handleVote: (pollOptionId: string) => void;
}

export default function PollOption({ pollOption, handleVote }: Props) {
  const { text, votes, id } = pollOption;
  const votesCount = votes.length;
  const { data } = useSession();
  const usersVotedOption = votes.find((vote) => vote.userId === data?.user.id);

  return (
    <div
      className={cn("border rounded", { "border-green-400": usersVotedOption })}
    >
      {usersVotedOption && <p>You voted for this option</p>}
      <h1>{text}</h1>
      <p>{votesCount} votes</p>
      <Button onClick={() => handleVote(id)}>Vote</Button>
    </div>
  );
}
