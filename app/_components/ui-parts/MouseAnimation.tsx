"use client";

import useMousePosition from "@/app/_hooks/useMouse";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const MouseAnimation = () => {
  //   const mousePosition = useMousePosition();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: any) => {
    setMousePosition({ x: e.pageX, y: e.clientY });
  };
  return (
    <motion.div
      className="relative h-screen w-full"
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-secondary z-50"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      />
      {/* <motion.div
        className="absolute w-4 h-4 rounded-full bg-primary"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "spring" }}
      />
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-primary"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "tween" }}
      /> */}
    </motion.div>
  );
};

export default MouseAnimation;
