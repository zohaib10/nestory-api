import classNames from "classnames";
import { create } from "pinch-zoom-pan";
import React, { useEffect, useRef } from "react";

import css from "./PinchZoomPan.module.css";

interface PinchZoomPanProps {
  min?: number;
  max?: number;
  captureWheel?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const PinchZoomPan = ({
  min,
  max,
  captureWheel,
  className,
  style,
  children,
}: PinchZoomPanProps) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const canvas = create({
      element,
      minZoom: min,
      maxZoom: max,
      captureWheel,
    });
    return canvas.destroy;
  }, [min, max, captureWheel]);

  return (
    <div ref={root} className={classNames(className, css.root)} style={style}>
      <div className={css.point}>
        <div className="absolute translate-x-[-50%] translate-y-[-50%] cursor-pointer">
          {children}
        </div>
      </div>
    </div>
  );
};
