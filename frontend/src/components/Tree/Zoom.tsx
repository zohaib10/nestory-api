"use client";

import Image from "next/image";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";

interface PinchZoomPanProps {
  children: React.ReactNode;
}

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute top-1 left-1 z-10 bg-white shadow-lg rounded-3xl p-3 flex flex-col gap-2">
      <button
        onClick={() => zoomIn()}
        className="w-8 h-8 btn btn-circle btn-primary shadow"
      >
        <Image src="/plus.png" alt="+" height={8} width={20} />
      </button>

      <button
        onClick={() => zoomOut()}
        className="w-8 h-8 btn btn-circle btn-primary shadow"
      >
        <Image src="/minus.png" alt="-" height={8} width={20} />
      </button>

      <button
        onClick={() => resetTransform()}
        className="w-8 h-8 btn btn-circle btn-primary shadow"
      >
        <Image src="/reset.png" alt="x" height={8} width={20} />
      </button>
    </div>
  );
};

export const PinchZoomPan = ({ children }: PinchZoomPanProps) => {
  return (
    <TransformWrapper
      initialScale={1.5}
      initialPositionX={200}
      initialPositionY={100}
      smooth
    >
      {() => (
        <>
          <Controls />
          <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
            {children}
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};
