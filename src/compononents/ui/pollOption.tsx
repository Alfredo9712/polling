import { PollOptionType } from "@/lib/types";
import { Button } from "./button";
import { useSession } from "next-auth/react";

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
    <div className="border rounded">
      {usersVotedOption && <p>You voted for this option</p>}
      <h1>{text}</h1>
      <p>{votesCount} votes</p>
      <Button onClick={() => handleVote(id)}>Vote</Button>
    </div>
  );
}
