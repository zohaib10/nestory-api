"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center">
          <Link
            className="flex items-center font-medium text-xl cursor-pointer"
            href="/"
          >
            <Image src="/logo.png" alt="Nestory logo" width={48} height={48} />
            <p className="text-3xl">Nestory</p>
          </Link>
        </div>
        <div className="flex-none">
          <button
            onClick={() => router.push("/auth")}
            className="btn btn-primary btn-sm md:btn-md"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};
