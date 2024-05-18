"use client";

import { useFollowPointer } from "@/app/_hooks/use-follow-pointer";
import React, { useRef } from "react";
import { MotionDiv } from "./MotionComponents";

const FollowPointer = () => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <MotionDiv
      ref={ref}
      className="h-16 w-16 bg-secondary rounded-full absolute hidden md:block z-10 mix-blend-multiply pointer-events-none"
      style={{ x, y }}
    />
  );
};

export default FollowPointer;
