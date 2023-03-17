import axios from "axios";

const createHealth = async (userId: string, request: any) => {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/health/${userId}`,
    request
  );

  return { data: result.data };
};

export default createHealth;
