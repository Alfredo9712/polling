import { PollOptionType } from "@/lib/types";
import { CheckCircle2Icon } from "lucide-react";
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
  const isPollOptionUsersVote = !!votes.find(
    (vote) => vote.userId === data?.user.id
  );

  return (
    <button
      className={cn(
        "border border-slate-800 rounded flex justify-between p-2",
        {
          "border-green-800": isPollOptionUsersVote,
        }
      )}
      disabled={isPollOptionUsersVote}
      onClick={() => handleVote(id)}
    >
      <span>
        <h1>{text}</h1>
        <p className="text-left">
          {`${votesCount} `}
          {votesCount === 1 ? "vote" : "votes"}
        </p>
      </span>
      {isPollOptionUsersVote && <CheckCircle2Icon size={30} color="green" />}
    </button>
  );
}
