"use client";

import { useRef } from "react";

import { useFollowPointer } from "@/hooks/use-follow-pointer";
import { MotionDiv } from "./MotionComponents";

const FollowPointer = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <MotionDiv
      ref={ref}
      className="pointer-events-none absolute z-10 hidden size-16 rounded-full bg-secondary mix-blend-multiply md:block"
      style={{ x, y }}
    />
  );
};

export default FollowPointer;
