"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorModal from "../Modals/ErrorModal/ErrorModal";
import { googleSignin, login, signup } from "./login/authActions";

import { useCreateUser } from "@/queries";
import { Loading } from "../Loading";

type AuthProps = {
  tab: "signin" | "signup";
};

type AuthFormInputs = {
  email: string;
  password: string;
};

type AuthError = {
  type: "signup" | "signin";
  message?: string;
};

export const Auth = ({ tab }: AuthProps) => {
  const [error, setError] = useState<AuthError>();
  const [loading, setLoading] = useState(false);

  const { mutate: createUser } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const handleSignin = async (data: AuthFormInputs) => {
    try {
      await login(data);
    } catch (error: any) {
      console.log(error);
      setError({ type: "signin", message: error?.message });
    }
  };

  const handleSignup = async (data: AuthFormInputs) => {
    try {
      const { user } = await signup(data);
      createUser({ email: user?.email || "", supabaseId: user?.id || "" });
    } catch (error: any) {
      setError({ type: "signup", message: error?.message });
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

  const handleGoogleSignin = async () => {
    try {
      await googleSignin();
    } catch (error: any) {
      setError({ type: "signup", message: error?.message });
    }
  };

  return (
    <div className="w-full">
      {loading && <Loading />}
      {error?.type === "signin" && (
        <ErrorModal title="Login failed" onClose={() => setError(undefined)}>
          <p>
            {error?.message ?? `Invalid email or password.`}{" "}
            <Link
              className="text-blue-600 underline"
              href={"/auth/forgot-password"}
            >
              Need help?
            </Link>
          </p>
        </ErrorModal>
      )}
      {error?.type === "signup" && (
        <ErrorModal title="Signup failed" onClose={() => setError(undefined)}>
          <p>
            {error.message ??
              `We couldn't create your account. Please check your details and try
            again.`}
          </p>
        </ErrorModal>
      )}

      <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mt-4 mb-0.5"
          {...register("email", { required: "Email is required" })}
        />
        <p className="text-red-500">{errors?.email?.message || ""}</p>

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mt-4 mb-0.5"
          {...register("password", { required: "Password is required" })}
        />

        <p className="text-red-500 w-full">{errors?.password?.message}</p>

        <button type="submit" className="btn btn-primary w-full my-2">
          {tab === "signup" ? "Sign up" : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-center mt-2">
        <a href="#" className="link">
          Forgot password?
        </a>
      </p>

      <div className="divider">or</div>

      <button
        onClick={handleGoogleSignin}
        className="btn btn-outline w-full flex items-center justify-center gap-2"
      >
        <Image src="/google.png" alt="Google logo" width={24} height={24} />
        Continue with Google
      </button>
    </div>
  );
};
