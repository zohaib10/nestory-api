"use client";

import { Auth } from "@/components";
import { useState } from "react";

export default function AuthCard() {
  const [tab, setTab] = useState<"signup" | "signin">("signup");

  return (
    <div className="flex flex-col justify-center items-center bg-base-100 md:p-4 mt-20">
      <div className="rounded-lg shadow-md">
        <div className="card shadow-md min-w-[380px] md:min-w-[420px] bg-white">
          <div className="card-body w-full">
            <div className="flex border-b mb-4">
              <button
                onClick={() => setTab("signup")}
                className={`flex-1 py-2 font-medium border-b-2 ${
                  tab === "signup"
                    ? "border-black"
                    : "border-transparent text-gray-400"
                }`}
              >
                Sign up
              </button>
              <button
                onClick={() => setTab("signin")}
                className={`flex-1 py-2 font-medium border-b-2 ${
                  tab === "signin"
                    ? "border-black"
                    : "border-transparent text-gray-400"
                }`}
              >
                Sign in
              </button>
            </div>

            <Auth tab={tab} />
          </div>
        </div>
      </div>
    </div>
  );
}
