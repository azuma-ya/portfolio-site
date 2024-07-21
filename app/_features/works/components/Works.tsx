import { Work as WorkType } from "@/app/_types/work";
import SectionLayout from "@/components/layouts/section/SectionLayout";
import { MotionUl } from "@/components/ui-elements/Motion/MotionComponents";

import Work from "./Work";

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
