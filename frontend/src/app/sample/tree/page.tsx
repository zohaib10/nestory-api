"use client";

import { getTree, getTreeData } from "@/utils";
import dynamic from "next/dynamic";

const TreeCanvas = dynamic(() => import("@/components/Tree/Tree"), {
  ssr: false,
});

const ErrorModal = dynamic(
  () => import("@/components/Modals/ErrorModal/ErrorModal"),
  {
    ssr: false,
  }
);

export default function SampleTree() {
  const tree = getTree();
  const treeData = getTreeData();

  if (!tree || !treeData) {
    console.log("setting moda ", tree, treeData);
    return (
      <ErrorModal message="No tree or tree data found. Please re-add your data from the Tree Sampling page." />
    );
  }

  return <TreeCanvas treeData={treeData} treeName={tree.name} />;
}
