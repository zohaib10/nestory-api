import Image from "next/image";
import React, { useCallback } from "react";
import type { ExtNode } from "relatives-tree/lib/types";

export type Node = ExtNode & {
  age: number;
  firstName: string;
  lastName: string;
  birthday: string;
};

interface FamilyNodeProps {
  node: Node;
  onClick: () => void;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export const FamilyNode = ({
  node,
  onClick,
  onSubClick,
  style,
}: FamilyNodeProps) => {
  const clickSubHandler = useCallback(
    () => onSubClick(node.id),
    [node.id, onSubClick]
  );
  return (
    <div className="absolute flex p-[10px]" style={style}>
      <div
        className={`w-full h-full flex items-center bg-white shadow-md rounded-md border-t-2 p-[2px] overflow-hidden cursor-pointer ${
          node.gender === "male" ? "border-blue-500" : "border-pink-400"
        }`}
      >
        <Image
          src={node?.gender === "male" ? "/man.png" : "/women.png"}
          alt="placeholder"
          height={24}
          width={24}
          unoptimized
        />
        <div className="flex flex-col pl-[2px]">
          <p className="text-[6px]">
            {node.firstName} {node.lastName}
          </p>
          {node.age && <p className="text-[5px]">age: {node.age}</p>}
        </div>
      </div>
      <button
        onClick={onClick}
        className="btn btn-circle w-4 h-4 bg-white absolute top-[6px] right-[8px]"
      >
        <Image src="/pencil.png" alt="down" height={8} width={6} unoptimized />
      </button>
      {node.hasSubTree && (
        <button
          onClick={clickSubHandler}
          className="btn btn-circle w-4 h-4 bg-white absolute bottom-[6px] right-[8px]"
        >
          <Image src="/link.png" alt="down" height={8} width={6} unoptimized />
        </button>
      )}
    </div>
  );
};
