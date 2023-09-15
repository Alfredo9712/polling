export type PollType =
  | ({
      author: {
        name: string | null;
        image: string | null;
      };
      pollOptions: PollOptionType[];
    } & {
      id: string;
      title: string;
      description: string | null;
      userId: string;
    })
  | null;

export type PollOptionType = {
  votes: {
    id: string;
    pollOptionId: string;
    createdAt: Date;
    userId: string;
    pollId: string;
  }[];
} & {
  id: string;
  text: string;
  pollId: string;
};
