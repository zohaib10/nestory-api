"use client";
import { CSSProperties, useMemo, useState } from "react";
import ReactFamilyTree from "react-family-tree";
import type { ExtNode } from "relatives-tree/lib/types";

import { FamilyNode, Node } from "./FamilyNode";
import { PinchZoomPan } from "./Zoom";

export function getNodeStyle({ left, top }: Readonly<ExtNode>): CSSProperties {
  return {
    width: 100,
    height: 60,
    transform: `translate(${left * (100 / 2)}px, ${top * (60 / 2)}px)`,
  };
}

type TreeProps = {
  nodes: Node[];
  editPerson: (id: string) => void;
};

export default function Tree({ nodes, editPerson }: TreeProps) {
  const firstNodeId = useMemo(() => nodes[0].id, [nodes]);
  const [rootId, setRootId] = useState(firstNodeId);

  return (
    <div className="bg-gray-200 w-full h-[600px] relative" id="family-tree">
      {nodes.length > 0 && (
        <PinchZoomPan>
          <ReactFamilyTree
            nodes={nodes}
            rootId={rootId}
            width={100}
            className="bg-gray-100 w-[400px]"
            height={60}
            renderNode={(node: Readonly<ExtNode>) => (
              <FamilyNode
                key={node.id}
                node={node as any}
                onClick={() => editPerson(node.id)}
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
