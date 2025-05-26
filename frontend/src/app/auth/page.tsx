"use client";

import { Auth } from "@/components";
import Image from "next/image";
import { useState } from "react";

export default function AuthCard() {
  const [tab, setTab] = useState<"signup" | "signin">("signup");

  return (
    <div className="flex flex-col justify-center items-center bg-base-100 p-4">
      <div className="rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center">
            <Image src="/logo.png" alt="Nestory logo" width={48} height={48} />
            <p className="text-3xl">Nestory</p>
          </div>
          <h1 className="text-2xl font-bold">
            Sign {tab === "signup" ? "up" : "in"} to start your family tree
          </h1>
        </div>

        <div className="card shadow-md w-full max-w-md bg-white">
          <div className="card-body">
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
