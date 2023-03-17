import axios from "axios";

export type LoginRequest = {
  email: string;
  password?: string;
  login_with?: string;
};

export type LoginData = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type LoginResponse = {
  data: LoginData;
};

const updateUser = async (userId: string, request: any) => {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}`,
    request
  );

  return { data: result.data };
};

export default updateUser;
