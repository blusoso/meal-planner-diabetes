import axios from "axios";

const getUser = async (userId: string) => {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}`
  );

  return { data: result.data };
};

export default getUser;
