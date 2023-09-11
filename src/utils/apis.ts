import { PollType } from "@/lib/types";
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

export const handleVoteMutation = async (
  pollOptionId: string,
  pollId: string | undefined
) => {
  await axios.post(`/api/private/poll/${pollId}/vote`, {
    pollOptionId,
  });
};
