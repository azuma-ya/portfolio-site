"use client";

import { useScroll, useSpring } from "framer-motion";
import React from "react";
import { MotionDiv } from "../ui-elements/Motion/MotionComponents";

const ScrollLayout = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <>
      <MotionDiv
        className="fixed top-0 left-0 right-0 h-2 bg-secondary z-50 origin-left"
        style={{ scaleX }}
      />
      {children}
    </>
  );
};

export default ScrollLayout;
