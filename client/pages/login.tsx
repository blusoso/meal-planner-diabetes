import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

import login from "../services/auth/login";
import setAuthToken from "../utils/setAuthToken";
import { useRecoilState } from "recoil";
import { authState } from "../recoils";

const Login = () => {
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    const loginRequest: any = {
      email: email,
      password: password,
    };

    const res: any = await login(loginRequest);
    if (res) {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded: any = jwtDecode(token);
      setAuth(decoded);

      router.push("/");
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
