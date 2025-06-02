"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type AuthFormInputs = {
  email: string;
  password: string;
};

export async function login({ email, password }: AuthFormInputs) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }
}

export async function signup({ email, password }: AuthFormInputs) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }
  return data;
}

export async function googleSignin() {
  const supabase = await createClient();

  console.log(`${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/callback`);

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/auth/callback`,
    },
  });
  console.log("data ", data);
  if (data.url) {
    redirect(data.url);
  }
}
