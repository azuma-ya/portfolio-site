"use client";

import React from "react";

import Autoplay from "embla-carousel-autoplay";

import { Carousel } from "@/components/ui/carousel";

const AutoCarousel = ({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) => {
  return (
    <Carousel
      className={className}
      plugins={[
        Autoplay({
          delay: delay,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      {children}
    </Carousel>
  );
};

export default AutoCarousel;
