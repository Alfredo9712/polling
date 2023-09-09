import { PollOptionType } from "@/lib/types";
import { Button } from "./button";

interface Props {
  pollOption: PollOptionType;
  handleVote: (pollOptionId: string) => void;
}

export default function PollOption({ pollOption, handleVote }: Props) {
  const { text, votes, id } = pollOption;
  const votesCount = votes.length;
  return (
    <div className="border rounded">
      <h1>{text}</h1>
      <p>{votesCount} votes</p>
      <Button onClick={() => handleVote(id)}>Vote</Button>
    </div>
  );
}
