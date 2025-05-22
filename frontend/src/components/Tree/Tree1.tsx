import { CSSProperties, useMemo, useState } from "react";
import ReactFamilyTree from "react-family-tree";
import type { ExtNode } from "relatives-tree/lib/types";

import { FamilyNode } from "./FamilyNode";
import style from "./Tree.module.css";
import { PinchZoomPan } from "./Zoom";

type Gender = "male" | "female";

const nodes = [
  {
    id: "goku",
    age: 10,
    gender: "male" as Gender,
    parents: [{ id: "bardock", type: "biological" }],
    children: [
      { id: "gohan", type: "biological" },
      { id: "goten", type: "biological" },
    ],
    siblings: [{ id: "raditz", type: "biological" }],
    spouses: [{ id: "chi-chi", type: "married" }],
  },
  {
    id: "chi-chi",
    gender: "female" as Gender,
    parents: [{ id: "ox-king", type: "biological" }],
    children: [
      { id: "gohan", type: "biological" },
      { id: "goten", type: "biological" },
    ],
    siblings: [],
    spouses: [{ id: "goku", type: "married" }],
  },
  {
    id: "gohan",
    gender: "male" as Gender,
    parents: [
      { id: "goku", type: "biological" },
      { id: "chi-chi", type: "biological" },
    ],
    children: [{ id: "pan", type: "biological" }],
    siblings: [{ id: "goten", type: "biological" }],
    spouses: [{ id: "videl", type: "married" }],
  },
  {
    id: "goten",
    gender: "male" as Gender,
    parents: [
      { id: "goku", type: "biological" },
      { id: "chi-chi", type: "biological" },
    ],
    children: [],
    siblings: [{ id: "gohan", type: "biological" }],
    spouses: [],
  },
  {
    id: "videl",
    gender: "female" as Gender,
    parents: [],
    children: [{ id: "pan", type: "biological" }],
    siblings: [],
    spouses: [{ id: "gohan", type: "married" }],
  },
  {
    id: "pan",
    gender: "female" as Gender,
    parents: [
      { id: "gohan", type: "biological" },
      { id: "videl", type: "biological" },
    ],
    children: [],
    siblings: [],
    spouses: [],
  },
  {
    id: "raditz",
    gender: "male" as Gender,
    parents: [{ id: "bardock", type: "biological" }],
    children: [],
    siblings: [{ id: "goku", type: "biological" }],
    spouses: [],
  },
  {
    id: "bardock",
    gender: "male" as Gender,
    parents: [],
    children: [
      { id: "goku", type: "biological" },
      { id: "raditz", type: "biological" },
    ],
    siblings: [],
    spouses: [],
  },
  {
    id: "ox-king",
    gender: "male" as Gender,
    parents: [],
    children: [{ id: "chi-chi", type: "biological" }],
    siblings: [],
    spouses: [],
  },
];

export function getNodeStyle({ left, top }: Readonly<ExtNode>): CSSProperties {
  return {
    width: 70,
    height: 80,
    transform: `translate(${left * (70 / 2)}px, ${top * (80 / 2)}px)`,
  };
}

export default function Tree() {
  const firstNodeId = useMemo(() => nodes[0].id, [nodes]);
  const [rootId, setRootId] = useState(firstNodeId);

  const [selectId, setSelectId] = useState<string>();
  const [hoverId, setHoverId] = useState<string>();

  return (
    <div className={style.root}>
      {nodes.length > 0 && (
        <PinchZoomPan
          min={0.8}
          max={2.5}
          captureWheel
          className={style.wrapper}
        >
          <ReactFamilyTree
            nodes={nodes as any}
            rootId={rootId}
            width={70}
            className="bg-gray-100 w-[400px]"
            height={80}
            renderNode={(node: Readonly<ExtNode>) => (
              <FamilyNode
                key={node.id}
                node={node as any}
                isRoot={node.id === rootId}
                isHover={node.id === hoverId}
                onClick={setSelectId}
                onSubClick={setRootId}
                style={getNodeStyle(node)}
              />
            )}
          />
        </PinchZoomPan>
      )}
    </div>
  );
}
