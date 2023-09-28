import { PollType, PollsReturnType } from "@/lib/types";
import axios, { AxiosError } from "axios";

export const fetchUsers = async () => {
  const data = await axios("/api/private/users");
  return data;
};

export const fetchPoll = async (pollId: string | undefined) => {
  const response = await axios.get(
    `http://localhost:3000/api/private/poll/${pollId}`
  );

  return response.data as PollType;
};

export const fetchPublicPolls = async () => {
  const response = await axios.get(`http://localhost:3000/api/private/polls`);

  return response.data as PollsReturnType;
};

export const handleVoteMutation = async (
  pollOptionId: string,
  pollId: string | undefined
) => {
  await axios.post(`/api/private/poll/${pollId}/vote`, {
    pollOptionId,
  });
};

export const closePollMutation = async (pollId: string | undefined) => {
  await axios.post(`/api/private/poll/${pollId}/close`);
};

export const createPoll = async ({
  title,
  description,
  pollOptions,
  isPublic,
}: {
  title: string;
  description: string;
  pollOptions: { title: string }[];
  isPublic: boolean;
}) => {
  await axios.post(`/api/private/poll/create`, {
    title,
    description,
    pollOptions,
    isPublic,
  });
};
