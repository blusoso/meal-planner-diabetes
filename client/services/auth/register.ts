import axios from "axios";

export type RegisterRequest = {
  email: string;
  password?: string;
  login_with?: string;
};

export type LoginData = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type RegisterResponse = {
  data: LoginData;
};

const signUp = async (request: RegisterRequest): Promise<any> => {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
    request
  );

  return { data: result.data };
};

export default signUp;
