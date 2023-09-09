import { PollOptionType } from "@/lib/types";

interface Props {
  pollOption: PollOptionType;
}

export default function PollOption({ pollOption }: Props) {
  const { text } = pollOption;
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
}
