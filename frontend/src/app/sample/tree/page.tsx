"use client";

import { getTree, getTreeData } from "@/utils";
import dynamic from "next/dynamic";

const treeData = {
  name: "Jim Rose (me)",
  attributes: {
    age: "67",
    gender: "male",
  },
  children: [
    {
      name: "Nancy Rose",
      attributes: {
        age: "34",
        gender: "female",
      },
      children: [
        {
          name: "Nancy Rose",
          attributes: {
            age: "34",
            gender: "female",
          },
        },
        {
          name: "Heath Rose",
          attributes: {
            age: "25",
            gender: "male",
          },
        },
        {
          name: "Roger Rose",
          attributes: {
            age: "21",
            gender: "male",
          },
          children: [
            {
              name: "Devnarayan",
              attributes: {
                age: "34",
                gender: "male",
              },
            },
            {
              name: "sufiyan",
              attributes: {
                age: "25",
                gender: "male",
              },
            },
            {
              name: "aishwariya",
              attributes: {
                age: "21",
                gender: "female",
              },
            },
          ],
        },
      ],
    },
    {
      name: "Heath Rose",
      attributes: {
        age: "25",
        gender: "male",
      },
    },
    {
      name: "Roger Rose",
      attributes: {
        age: "21",
        gender: "male",
      },
      children: [
        {
          name: "Nancy Rose",
          attributes: {
            age: "34",
            gender: "female",
          },
        },
        {
          name: "Heath Rose",
          attributes: {
            age: "25",
            gender: "male",
          },
        },
        {
          name: "Roger Rose",
          attributes: {
            age: "21",
            gender: "male",
          },
        },
      ],
    },
  ],
};

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
