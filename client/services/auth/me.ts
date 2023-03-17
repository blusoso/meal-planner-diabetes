import axios from "axios";

export type MeData = {
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

export type MeResponse = {
  data: MeData;
};

const me = async (): Promise<MeResponse> => {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/me`
  );

  return { data: result.data };
};

export default me;
