import React from "react";

import Link from "next/link";

import { twMerge } from "tailwind-merge";

import { MotionDiv } from "@/app/_components/ui-elements/Motion/MotionComponents";
import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import { Work as WorkType } from "@/app/_types/work";

export interface WorkProps {
  work: WorkType;
  className?: string;
}

const Work = ({ work, className }: WorkProps) => {
  return (
    <Link href={`/works/${work.id}`} className={twMerge("", className)}>
      <MotionDiv
        className=""
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        viewport={{ once: true }}
      >
        <div
          className={twMerge(
            "h-80 overflow-hidden lg:rounded-l-[6rem] lg:rounded-tr-[6rem] md:rounded-l-[5rem] md:rounded-tr-[5rem] rounded-l-[4rem] rounded-tr-[4rem] border-2",
            className
          )}
        >
          <NextImage
            src={work.image[0]}
            alt="image"
            className="duration-200 hover:brightness-75"
          />
        </div>
        <p className="text-primary">
          {work.createdAt.toLocaleDateString("ja-JP")}
        </p>
        <h3 className="text-end text-2xl font-semibold">{work.title}</h3>
      </MotionDiv>
    </Link>
  );
};

export default Work;
