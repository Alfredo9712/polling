import { PollOptionType } from "@/lib/types";
import { Button } from "./button";
import { useSession } from "next-auth/react";
import { cn } from "@/utils";
import { CheckCheckIcon, CheckCircle, CheckCircle2Icon } from "lucide-react";

interface Props {
  pollOption: PollOptionType;
  handleVote: (pollOptionId: string) => void;
}

export default function PollOption({ pollOption, handleVote }: Props) {
  const { text, votes, id } = pollOption;
  const votesCount = votes.length;
  const { data } = useSession();
  const isPollOptionUsersVote = !!votes.find(
    (vote) => vote.userId === data?.user.id
  );

  return (
    <div
      className={cn(
        "border border-slate-800 rounded flex justify-between p-2 cursor-pointer ",
        {
          "border-green-800": isPollOptionUsersVote,
        }
      )}
      onClick={() => handleVote(id)}
    >
      <div>
        <h1>{text}</h1>
        <p>
          {`${votesCount} `}
          {votesCount === 1 ? "vote" : "votes"}
        </p>
      </div>
      {isPollOptionUsersVote && <CheckCircle2Icon size={30} color="green" />}
    </div>
  );
}
