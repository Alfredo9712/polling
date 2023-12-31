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
      isClosed: boolean;
      isPublic: boolean;
    })
  | null;

export type PollOptionType = {
  votes: {
    id: number;
    pollOptionId: string;
    createdAt: Date;
    userId: string;
    pollId: string | null;
  }[];
} & {
  id: string;
  text: string;
  pollId: string;
};

export type PollsReturnType = ({
  votes: {
    id: number;
    pollOptionId: string;
    createdAt: Date;
    userId: string;
    pollId: string | null;
  }[];
} & {
  id: string;
  title: string;
  description: string | null;
  userId: string;
})[];
