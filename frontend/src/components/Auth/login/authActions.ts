"use server";

import { createClient } from "@/lib/supabase/server";

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
