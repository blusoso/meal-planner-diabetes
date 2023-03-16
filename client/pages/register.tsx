import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import signUp from "../services/auth/register";

const register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { name, email, password, confirm_password } = data;

    const registerRequest: any = {
      name: name,
      email: email,
      password: password,
      confirm_password: confirm_password,
    };

    const res = await signUp(registerRequest);
    if (res) {
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input {...register("name", { required: true, maxLength: 20 })} />
        {errors.name && <span>This field is required</span>}

        <label>Email:</label>
        <input {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

        <label>Password:</label>
        <input {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}

        <label>Confirm Password:</label>
        <input {...register("confirm_password", { required: true })} />
        {errors.confirm_password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default register;
