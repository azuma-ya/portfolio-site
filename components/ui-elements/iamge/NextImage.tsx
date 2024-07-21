import type { FC } from "react";

import Image from "next/image";

import { twMerge } from "tailwind-merge";

type NextImageProps = {
  // eslint-disable-next-line
  src: string | any;
  alt: string;
  className?: string;
};

export const NextImage: FC<NextImageProps> = ({ src, alt, className }) => {
  return (
    <div className="relative size-full">
      <Image
        className={twMerge("object-cover", className)}
        src={src}
        alt={alt}
        sizes="100vw"
        fill
      />
    </div>
  );
};
