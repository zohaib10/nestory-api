import Image from "next/image";

export default function GatedFeaturesList() {
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-semibold mb-4">
        Unlock this and additional features below by signing up
      </h2>
      <div className="space-y-3">
        <div className="flex gap-2 items-center pb-2">
          <Image src="/share.png" alt="share" width={40} height={40} />
          <p>Share your family tree with others privately or publicly</p>
        </div>

        <div className="flex gap-2 items-center pb-2">
          <Image src="/create.png" alt="share" width={32} height={32} />
          <p>
            Create timelines for each person or family — add photos, voice
            memos, and moments
          </p>
        </div>

        <div className="flex gap-2 items-center pb-2">
          <Image src="/stories.png" alt="share" width={40} height={40} />

          <p>
            Tell stories about your relatives — capture memories in your own
            words
          </p>
        </div>

        <div className="flex gap-2 items-center pb-2">
          <Image src="/nia-wave.png" alt="share" width={42} height={42} />
          <p>
            Meet Nia, your AI assistant — she helps build trees, create events,
            and connect the dots
          </p>
        </div>
        <div className="flex justify-end w-full">
          <button className="btn btn-primary">Sign up now</button>
        </div>
      </div>
    </div>
  );
}
