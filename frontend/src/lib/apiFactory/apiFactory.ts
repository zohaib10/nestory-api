import { supaClient } from "../supabase/client";

export const apiFactory = async (url: string, options: RequestInit = {}) => {
  const { data, error } = await supaClient.auth.getSession();

  if (error || !data.session) {
    throw new Error("Session invalid or expired");
  }

  const token = data.session.access_token;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error("Fetch failed");
  }

  return res.json();
};
