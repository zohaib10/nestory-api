// App.tsx (Functional version, no Material UI)
"use client";

import { useEffect, useState } from "react";
import Tree, { RawNodeDatum } from "react-d3-tree";

import { useCenteredTree } from "@/hooks";
import Image from "next/image";

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  editPerson,
}: any) => (
  <g>
    <foreignObject
      x={foreignObjectProps.x}
      y={foreignObjectProps.y}
      width={foreignObjectProps.width}
      height={foreignObjectProps.height}
    >
      <div
        className={`flex bg-white shadow-md rounded-md h-24 border-t-4 ${
          nodeDatum?.gender === "male" ? "border-blue-500" : "border-pink-400"
        }`}
        style={{ pointerEvents: "all" }}
        onClick={toggleNode}
      >
        <Image
          src={nodeDatum?.gender === "male" ? "/man.png" : "/women.png"}
          alt="placeholder"
          height={100}
          width={100}
        />
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-between flex-2">
            <div className="flex flex-col mt-2 ml-1">
              <p>
                {nodeDatum.firstName} {nodeDatum.lastName}
              </p>
              {nodeDatum?.age && <p>Age: {nodeDatum?.age}</p>}
            </div>
            <button
              onClick={() => {
                editPerson(nodeDatum.id);
              }}
              className="btn btn-circle w-8 h-8 border-0"
            >
              <Image src="/edit.png" alt="more" height={10} width={30} />
            </button>
          </div>
          {nodeDatum.children?.length > 0 && (
            <div className="flex justify-start px-[12px] pt-2">
              <button className="btn btn-circle w-6 h-6 bg-white">
                <Image src="/down.png" alt="down" height={10} width={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </foreignObject>
  </g>
);

type FamilyTreeProps = {
  treeData: RawNodeDatum | RawNodeDatum[];
  treeName: string;
  editPerson: (id: string) => void;
};

export default function FamilyTree({
  treeData,
  treeName,
  editPerson,
}: FamilyTreeProps) {
  const [translate, containerRef, setTranslate] = useCenteredTree();
  const nodeSize = { x: 250, y: 300 };
  const separation = { siblings: 2, nonSiblings: 2 };
  const [zoom, setZoom] = useState(1);

  const foreignObjectProps = {
    width: nodeSize.x,
    y: -45,
    height: nodeSize.y,
    x: -125,
  };

  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      const step = 50;
      if (e.key === "ArrowLeft") setTranslate((t) => ({ ...t, x: t.x + step }));
      if (e.key === "ArrowRight")
        setTranslate((t) => ({ ...t, x: t.x - step }));
      if (e.key === "ArrowUp") setTranslate((t) => ({ ...t, y: t.y + step }));
      if (e.key === "ArrowDown") setTranslate((t) => ({ ...t, y: t.y - step }));
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[700px] overflow-hidden bg-gray-200"
    >
      <p className="text-xl">{treeName}</p>
      <Tree
        className="transition-transform duration-300 ease-in-out"
        data={treeData}
        translate={translate}
        nodeSize={nodeSize}
        zoom={zoom}
        setZoom={setZoom}
        separation={separation}
        transitionDuration={1000}
        pathFunc="elbow"
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({
            ...rd3tProps,
            foreignObjectProps,
            editPerson,
          })
        }
        orientation="vertical"
        initialDepth={1}
      />
    </div>
  );
}
