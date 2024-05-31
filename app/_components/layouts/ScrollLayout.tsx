"use client";

import React from "react";

import { useScroll, useSpring } from "framer-motion";

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
        className="fixed inset-x-0 top-0 z-50 h-2 origin-left bg-secondary"
        style={{ scaleX }}
      />
      {children}
    </>
  );
};

export default ScrollLayout;
