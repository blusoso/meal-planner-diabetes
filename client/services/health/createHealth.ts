import Axios from "@/utils/axios";

const createHealth = async (userId: string, request: any) => {
  const result = await Axios.post(`/health/${userId}`, request);

  return { data: result.data };
};

export default createHealth;
