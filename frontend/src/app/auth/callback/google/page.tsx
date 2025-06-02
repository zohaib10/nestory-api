"use client";

import { createUser } from "@/api";
import { Loading } from "@/components";
import { supaClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supaClient.auth.getSession();
      const user = data.session?.user;
      if (user?.email && user.id) {
        try {
          await createUser({ email: user?.email, supabaseId: user?.id });
          router.push("/");
        } catch (error) {
          console.log("Error ", error);
          router.push("/auth");
        }
      }
    })();
  }, [router]);

  return <Loading />;
}
