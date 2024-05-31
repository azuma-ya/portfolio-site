import React from "react";

import Link from "next/link";

import {
  MotionDiv,
  MotionUl,
} from "@/app/_components/ui-elements/Motion/MotionComponents";
import { Skill, SkillType } from "@/app/_types/skill";

import SectionLayout from "../../../_components/layouts/section/SectionLayout";
import { NextImage } from "../../../_components/ui-elements/iamge/NextImage";

export interface SkillsProps {
  skills: Skill[];
  type: SkillType;
}

const Skills = async ({ skills, type }: SkillsProps) => {
  return (
    <SectionLayout id="skills" title="SKILLS" subtitle={type}>
      <MotionUl
        className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 lg:grid-cols-2"
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
        {skills
          .filter((skill) => skill.type === type)
          .map((skill, index) => (
            <li key={index}>
              <Link href={`/skills/${skill.id}`}>
                <MotionDiv
                  className="group flex w-full items-center gap-12"
                  variants={{
                    visible: { opacity: 1, scale: 1 },
                    hidden: { opacity: 0, scale: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  viewport={{ once: true }}
                >
                  <div className="size-24 flex-none rounded-2xl border-2 bg-white p-6">
                    <NextImage src={skill.image[0]} alt={skill.title} />
                  </div>
                  <div className="grow space-y-4 rounded-l-2xl rounded-tr-2xl border-2 p-2 backdrop-blur-2xl hover:bg-foreground/20 md:p-6">
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                    <p>{skill.description}</p>
                  </div>
                </MotionDiv>
              </Link>
            </li>
          ))}
      </MotionUl>
    </SectionLayout>
  );
};

export default Skills;
