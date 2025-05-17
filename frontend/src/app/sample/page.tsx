"use client";

import { SampleTreeCreate, SampleTreeStepper } from "@/components";
import { useEffect, useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"new" | "create" | "display">("new");

  useEffect(() => {
    setMode("new");
  }, []);

  return (
    <>
      {mode === "new" && (
        <SampleTreeCreate setCreateNewTree={() => setMode("create")} />
      )}
      {mode === "create" && <SampleTreeStepper />}
    </>
  );
}
