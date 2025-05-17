declare module "react-d3-tree" {
  import * as React from "react";

  export interface RawNodeDatum {
    name: string;
    attributes?: Record<string, string>;
    children?: RawNodeDatum[];
  }

  export interface TreeProps {
    data: RawNodeDatum | RawNodeDatum[];
    translate?: { x: number; y: number };
    nodeSize?: { x: number; y: number };
    separation?: { siblings: number; nonSiblings: number };
    orientation?: "horizontal" | "vertical";
    pathFunc?: string;
    renderCustomNodeElement?: (props: any) => React.ReactNode;
    initialDepth?: number;
    allowForeignObjects?: boolean;
    zoom?: number;
    setZoom?: (zoom: number) => void;
    transitionDuration?: number; // ✅ Add this
    nodeLabelComponent?: {
      render: (props: any) => React.ReactNode;
      foreignObjectWrapper: {
        width: number;
        height: number;
        x?: number;
        y?: number;
      };
    };
  }

  const Tree: React.FC<TreeProps>;
  export default Tree;
}
