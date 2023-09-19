import prisma from "../../../../../prisma/prismaClient";
import Avatar from "@/compononents/ui/avatar";
import PollData from "@/compononents/ui/pollData";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Poll {
  params: {
    pollId: string;
  };
}

export default async function Poll({ params }: Poll) {
  const { pollId } = params;

  //note you cant call route handelers in server components

  const poll = await prisma.poll.findUnique({
    where: {
      id: pollId,
    },
    include: {
      pollOptions: {
        include: {
          votes: true,
        },
      },
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!poll) return <h1>Poll not found</h1>;

  const { title, description, author } = poll;
  const { image, name } = author;
  return (
    <div>
      <Link href="/polls" className="flex gap-1 pb-5 w-fit">
        <ArrowLeft /> Back
      </Link>
      <div>
        <h1 className="text-3xl mb-4">{title}</h1>
        <div className="flex items-center gap-2 text-slate-600 mb-3">
          <Avatar profileImg={image} />
          <p>{`${name}`} asked ...</p>
        </div>
        <h2 className="text-xl ">{description}</h2>
      </div>
      <div>
        <PollData initialPoll={poll} />
      </div>
    </div>
  );
}
