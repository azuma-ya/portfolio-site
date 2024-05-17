import Link from "next/link";
import React from "react";
import { NextImage } from "../../../_components/ui-elements/iamge/NextImage";
import { Work as WorkType } from "@/app/_types/work";
import { twMerge } from "tailwind-merge";
import { MotionDiv } from "@/app/_components/ui-elements/Motion/MotionComponents";

export interface WorkProps {
  work: WorkType;
  className?: string;
}

const Work = ({ work, className }: WorkProps) => {
  return (
    <Link href={`/works/${work.id}`} className={twMerge("", className)}>
      <MotionDiv
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 },
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div
          className={twMerge(
            "h-80 overflow-hidden rounded-l-[5rem] rounded-tr-[5rem]",
            className
          )}
        >
          <NextImage src={work.image[0]} alt="image" />
        </div>
        <p className="text-primary">{work.createdAt.toLocaleDateString()}</p>
        <h3 className="text-2xl text-end font-semibold">{work.title}</h3>
      </MotionDiv>
    </Link>
  );
};

export default Work;
