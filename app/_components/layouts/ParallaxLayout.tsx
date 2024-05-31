"use client";

import React from "react";

import { MotionValue, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { MotionDiv } from "../ui-elements/Motion/MotionComponents";

const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [0, -distance]);
};

const Parallaxlayout = ({
  children,
  className,
  distance = 100,
}: {
  children?: React.ReactNode;
  className?: string;
  distance?: number;
}) => {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, distance);
  return (
    <MotionDiv className={twMerge("size-full", className)} style={{ y }}>
      {children}
    </MotionDiv>
  );
};

export default Parallaxlayout;
