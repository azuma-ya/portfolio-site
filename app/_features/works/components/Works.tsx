import React from "react";

import { MotionUl } from "@/app/_components/ui-elements/Motion/MotionComponents";
import { Work as WorkType } from "@/app/_types/work";

import Work from "./Work";
import SectionLayout from "../../../_components/layouts/section/SectionLayout";



export interface WorksProps {
  works: WorkType[];
}

const Works = async ({ works }: WorksProps) => {
  return (
    <SectionLayout id="works" title="WORKS">
      <MotionUl
        className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
          hidden: { opacity: 0 },
        }}
        viewport={{ once: true }}
      >
        {works.map((work, index) => (
          <Work work={work} key={index} />
        ))}
      </MotionUl>
    </SectionLayout>
  );
};

export default Works;
