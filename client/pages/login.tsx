import React from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

import login from "../services/auth/login";
import setAuthToken from "../utils/setAuthToken";
import { useRecoilState } from "recoil";
import { authState } from "../recoils";
import { COOKIE_AGE, COOKIE_NAME } from "../utils/cookies";
import { CustomAppProps } from "./_app";
import getUser from "@/services/users/getUser";
import { UserData, UserResponse } from "@/services/auth/me";

type LoginProps = {} & CustomAppProps;

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const setupToken = async (token: string) => {
    Cookies.set(COOKIE_NAME.TOKEN, token, { expires: COOKIE_AGE.TOKEN });
    setAuthToken(token);
  };

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    const loginRequest: any = {
      email: email,
      password: password,
    };

    const res: any = await login(loginRequest);
    if (res) {
      const { token } = res.data;
      await setupToken(token);
      const decoded: any = jwtDecode(token);

      const userRes: UserResponse = await getUser(decoded.id);

      if (userRes.data.isSetPreference) {
        window.location.replace("/");
      } else {
        window.location.replace("/preference");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

        <label>Password:</label>
        <input {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
