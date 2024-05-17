"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
};

export default MotionWrapper;
