"use client";

import { motion } from "framer-motion";
import React from "react";

import { Button } from "@/components/ui/button";

export interface MotionDivProps {
  children?: React.ReactNode;
  className?: string;
}

const MotionDivComponent = React.forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

MotionDivComponent.displayName = "MotionDivComponent";

const UlComponent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>((props, ref) => <ul ref={ref} {...props} />);

UlComponent.displayName = "UlComponent";

export const MotionDiv = motion(MotionDivComponent);

export const MotionButton = motion(Button);

export const MotionUl = motion(UlComponent);
