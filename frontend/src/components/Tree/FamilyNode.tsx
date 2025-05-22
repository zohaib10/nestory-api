import Image from "next/image";
import React, { useCallback } from "react";
import type { ExtNode } from "relatives-tree/lib/types";
import css from "./FamilyNode.module.css";

interface FamilyNodeProps {
  node: ExtNode & {
    age: number;
  };
  isRoot: boolean;
  isHover?: boolean;
  onClick: (id: string) => void;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export const FamilyNode = ({
  node,
  isRoot,
  isHover,
  onClick,
  onSubClick,
  style,
}: FamilyNodeProps) => {
  const clickHandler = useCallback(() => onClick(node.id), [node.id, onClick]);
  const clickSubHandler = useCallback(
    () => onSubClick(node.id),
    [node.id, onSubClick]
  );
  console.log(node, " is node");
  return (
    <div className="absolute flex p-[10px]" style={style}>
      <div
        className={`flex flex-1 items-center justify-center bg-white shadow-md rounded-md border-t-2 overflow-hidden cursor-pointer ${
          node.gender === "male" ? "border-blue-500" : "border-pink-400"
        }`}
        onClick={clickHandler}
      >
        {/* {node?.age && <p>{node.age}</p>} */}
        <div className={css.id}>{node.id}</div>
      </div>
      {node.hasSubTree && (
        <button
          onClick={clickSubHandler}
          className="btn btn-circle w-4 h-4 bg-white absolute bottom-[6px] right-[8px]"
        >
          <Image src="/link.png" alt="down" height={8} width={6} />
        </button>
        // <div
        //   className={classNames(css.sub, css[node.gender])}
        //   onClick={clickSubHandler}
        // />
      )}
    </div>
  );
};

type NodeProps = {
  node: ExtNode;
};
