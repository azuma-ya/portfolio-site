import React from "react";

import Parallaxlayout from "./ParallaxLayout";

const BackGround = () => {
  const distance = 1000;
  return (
    <Parallaxlayout
      className={
        "fixed inset-y-0 left-0 -z-10 h-[calc(100%_+_1000px)] w-full bg-hero-pattern bg-cover bg-repeat-y"
      }
      distance={distance}
    />
  );
};

export default BackGround;
