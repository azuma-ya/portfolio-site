import React from "react";

import Parallaxlayout from "./ParallaxLayout";

const BackGround = () => {
  const distance = 1000;
  return (
    <Parallaxlayout
      // eslint-disable-next-line
      className={`h-[calc(100%_+_${distance}px)] fixed inset-y-0 left-0 -z-10 w-full bg-hero-pattern bg-cover bg-repeat-y`}
      distance={distance}
    />
  );
};

export default BackGround;
