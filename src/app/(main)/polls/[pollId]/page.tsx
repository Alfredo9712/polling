import { notFound } from "next/navigation";
import prisma from "../../../../../prisma/prismaClient";
import axios from "axios";
import { PollType } from "@/lib/types";
import { fetchPoll } from "@/utils/apis";
import Avatar from "@/compononents/ui/avatar";
import PollData from "@/compononents/ui/pollData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
