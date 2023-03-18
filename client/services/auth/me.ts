import Axios from "@/utils/axios";

export type UserData = {
  _id: string;
  name: string;
  email: string;
  birthday: Date;
  gender: string;
  weight: number;
  weightUnit: string;
  height: number;
  heightUnit: string;
  activityLevel: string;
  isSetPreference: boolean;
  date: Date;
  health: any;
};

export type UserResponse = {
  data: UserData;
};

export type MeRequest = {
  token: string | undefined;
};

const fetchAuth = async ({ token }: MeRequest): Promise<UserResponse> => {
  const result = await Axios.get(`/auth/me`);

  return { data: result.data };
};

export default fetchAuth;
