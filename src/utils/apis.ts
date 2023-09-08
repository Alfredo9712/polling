import axios from "axios";

export const fetchUsers = async () => {
  const data = await axios("/api/private/users");
  return data;
};
