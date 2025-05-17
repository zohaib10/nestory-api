"use client";

import dynamic from "next/dynamic";

const treeData = {
  name: "Jim Rose (me)",
  attributes: {
    age: "67",
    gender: "male",
  },
};

const TreeCanvas = dynamic(() => import("@/components/Tree/Tree"), {
  ssr: false,
});

export default function SampleTree() {
  return (
    <div>
      <TreeCanvas treeData={treeData} />
    </div>
  );
}
