import prisma from "../../../../../prisma/prismaClient";

interface Poll {
  params: {
    pollId: string;
  };
}

export default async function Poll({ params }: Poll) {
  const { pollId } = params;

  const poll = await prisma.poll.findUnique({
    where: {
      id: pollId,
    },
    include: {
      pollOption: {
        include: {
          vote: true,
        },
      },
    },
  });

  return <div>My Post: {pollId}</div>;
}
