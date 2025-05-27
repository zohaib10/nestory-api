"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorModal from "../Modals/ErrorModal/ErrorModal";
import { login, signup } from "./login/authActions";

type AuthProps = {
  tab: "signin" | "signup";
};

type AuthFormInputs = {
  email: string;
  password: string;
};

export const Auth = ({ tab }: AuthProps) => {
  const [error, setError] = useState<"signup" | "signin" | undefined>();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const handleSignin = async (data: AuthFormInputs) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
      setError("signin");
    }
  };

  const handleSignup = async (data: AuthFormInputs) => {
    try {
      await signup(data);
    } catch (error) {
      console.log(error);
      setError("signup");
    }
  };

  const onSubmit = async (data: AuthFormInputs) => {
    setLoading(true);
    if (tab === "signup") {
      await handleSignup(data);
    } else {
      await handleSignin(data);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 bg-black opacity-60 flex justify-center">
          <span className="loading loading-spinner loading-xl text-white mb-[180px]"></span>
        </div>
      )}
      {error === "signin" && (
        <ErrorModal title="Login failed" onClose={() => setError(undefined)}>
          <p>
            Invalid email or password.{" "}
            <Link
              className="text-blue-600 underline"
              href={"/auth/forgot-password"}
            >
              Need help?
            </Link>
          </p>
        </ErrorModal>
      )}
      {error === "signup" && (
        <ErrorModal title="Signup failed" onClose={() => setError(undefined)}>
          <p>
            {`We couldn't create your account. Please check your details and try
            again.`}
          </p>
        </ErrorModal>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button type="submit" className="btn btn-primary w-full">
          {tab === "signup" ? "Sign up" : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-center mt-2">
        <a href="#" className="link">
          Forgot password?
        </a>
      </p>

      <div className="divider">or</div>

      <button className="btn btn-outline w-full flex items-center justify-center gap-2">
        <Image src="/google.png" alt="Google logo" width={24} height={24} />
        Continue with Google
      </button>
    </>
  );
};
