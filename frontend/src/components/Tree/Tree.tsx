// App.tsx (Functional version, no Material UI)
"use client";

import { useState } from "react";
import Tree, { RawNodeDatum } from "react-d3-tree";

import { useCenteredTree } from "@/hooks";
import Image from "next/image";

const containerStyles = {
  width: "100vw",
  height: "100vh",
  background: "#eee",
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}: any) => (
  <g>
    <foreignObject {...foreignObjectProps}>
      <div
        className={`flex bg-white shadow-md rounded-md h-24 border-t-4 ${
          nodeDatum.attributes?.gender === "male"
            ? "border-blue-500"
            : "border-pink-400"
        }`}
        onClick={toggleNode}
      >
        <Image
          src={
            nodeDatum.attributes?.gender === "male" ? "/man.png" : "/women.png"
          }
          alt="placeholder"
          height={100}
          width={100}
        />
        <div className="flex flex-1 flex-col justify-between relative">
          <div className="flex justify-between flex-2">
            <p>{nodeDatum.name}</p>
            <button className="btn btn-circle w-8 h-8 bg-white border-0">
              <Image src="/edit.png" alt="more" height={10} width={30} />
            </button>
          </div>
          <div className="relative flex flex-1 items-center">
            {nodeDatum.children && nodeDatum.children.length > 0 && (
              <button className="btn btn-circle absolute top-3 right-25 m-2 w-8 h-8 bg-white shadow-2xl">
                <Image src="/down.png" alt="down" height={10} width={30} />
              </button>
            )}
          </div>
        </div>
      </div>
    </foreignObject>
  </g>
);

type FamilyTreeProps = {
  treeData: RawNodeDatum | RawNodeDatum[];
};

export default function FamilyTree({ treeData }: FamilyTreeProps) {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 250, y: 300 };
  const separation = { siblings: 2, nonSiblings: 2 };
  const [zoom, setZoom] = useState(0.5);

  const foreignObjectProps = {
    width: nodeSize.x,
    y: -45,
    height: nodeSize.y,
    x: -125,
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[700px] overflow-hidden bg-gray-200"
    >
      <Tree
        data={treeData}
        translate={translate}
        nodeSize={nodeSize}
        zoom={zoom}
        setZoom={setZoom}
        separation={separation}
        transitionDuration={1000}
        pathFunc="elbow"
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        orientation="vertical"
        initialDepth={1}
      />
    </div>
  );
}
