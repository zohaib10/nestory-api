"use client";

import { ValueProps } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="md:flex">
        <div className="flex-1">
          <p className="text-3xl md:text-5xl mb-2 tracking-wide">
            Every family has a story.
          </p>
          <p className="text-3xl md:text-5xl mb-2 tracking-wide">
            Start yours with
          </p>
          <p className="text-3xl md:text-5xl mb-2 tracking-wide">Nestory.</p>
          <p className="mb-0.5 font-light tracking-wide">
            Build beautiful, interactive family
          </p>
          <p className="mb-0.5 font-light tracking-wide">
            trees, Collaborate, preserve,
          </p>
          <p className="mb-0.5 font-light tracking-wide">
            and share your heritage with ease.
          </p>
          <div className="flex flex-col items-start mt-4 md:m-6">
            <button className="btn btn-primary btn-md md:btn-lg w-auto mb-4 max-w-4xl">
              Get Started
            </button>
            <button
              onClick={() => {
                router.push("/sample");
              }}
              className="btn btn-outline btn-md md:btn-lg w-auto mb-4"
            >
              Sample a Tree
            </button>
          </div>
        </div>

        <div className="flex-1">
          <Image
            src="/family_tree.png"
            alt="Landing page Tree"
            width={500}
            height={500}
            unoptimized
          />
        </div>
      </div>
      <div className="flex carousel rounded-box">
        <ValueProps
          image="/tree.png"
          title="Build Your Tree"
          prop="Add relatives, connect generations, and watch your family tree come to life."
          width={180}
          height={120}
        />
        <ValueProps
          image="/edit.png"
          title="Build Your Tree"
          prop="Easily update family info and share with loved ones privately or publicly."
          width={180}
          height={120}
        />
        <ValueProps
          image="/collaborate.png"
          title="Build Your Tree"
          prop="Invite family members to contribute and help keep history' alive."
          width={180}
          height={120}
        />
        <ValueProps
          image="/lock.png"
          title="Secure & Private"
          prop="Your famly data is encrypted and stored securely. You're always in control of your story."
          width={140}
          height={120}
        />
      </div>
    </div>
  );
}
