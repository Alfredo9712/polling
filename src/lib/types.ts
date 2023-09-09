export type PollType =
  | ({
      author: {
        name: string | null;
        image: string | null;
      };
      pollOption: ({
        vote: {
          id: string;
          voterId: number;
          pollOptionId: string;
          createdAt: Date;
        }[];
      } & {
        id: string;
        text: string;
        pollId: string;
      })[];
    } & {
      id: string;
      title: string;
      description: string | null;
      userId: string;
    })
  | null;
