import axios from "axios";

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

const me = async (): Promise<UserResponse> => {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/me`
  );

  return { data: result.data };
};

export default me;
