"use client";

import { MotionValue, useScroll, useTransform } from "framer-motion";
import React from "react";
import { MotionDiv } from "../ui-elements/Motion/MotionComponents";

const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [0, distance], {
    clamp: false,
  });
};

const Parallaxlayout = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, 3000);
  return (
    <MotionDiv className="" style={{ y }}>
      {children}
    </MotionDiv>
  );
};

export default Parallaxlayout;
