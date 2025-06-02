import { apiFactory } from "@/lib/apiFactory";

export const createUser = async (user: {
  supabaseId: string;
  email: string;
}) => {
  console.log("These are params ", user);
  const res = await apiFactory(
    `${process.env.NEXT_PUBLIC_NESTORY_API}/api/v1/user`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
  );

  console.log(res);
  return res;
};
