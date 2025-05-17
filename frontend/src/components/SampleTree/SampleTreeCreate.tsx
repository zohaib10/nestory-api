import Image from "next/image";

type SampleTreeCreateProps = {
  setCreateNewTree: () => void;
};

export const SampleTreeCreate = ({
  setCreateNewTree,
}: SampleTreeCreateProps) => {
  return (
    <div className="flex flex-col items-center h-[500px] ">
      <h2 className="text-4xl font-bold mb-2">Sample a Tree</h2>
      <p className="mb-0.5 font-light tracking-wide">
        Welcome to Nestory! Sampling a tree lets you play around and explore
      </p>
      <p className="mb-0.5 font-light tracking-wide">
        how it works — nothing you do here will be saved.
      </p>
      <button onClick={setCreateNewTree} className="btn btn-primary btn-lg m-8">
        <Image src="/plus.png" alt="plus" width={40} height={10} />
        Start with Sample Tree
      </button>

      <div className="mt-8 max-w-3xl">
        <h2 className="text-xl font-semibold mb-2">How Sampling Works</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li>Create a new sample tree</li>
          <li>Add a few people to it</li>
          <li>Connect them with relationships</li>
          <li>Explore and edit freely — nothing is saved</li>
        </ol>
      </div>
    </div>
  );
};
