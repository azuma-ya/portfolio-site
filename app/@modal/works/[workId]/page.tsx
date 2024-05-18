import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import AutoCarousel from "@/app/_components/ui-parts/AutoCarousel";
import { Skill } from "@/app/_types/skill";
import { Work } from "@/app/_types/work";
import { skillDatabaseId, workDatabaseId } from "@/app/page";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { n2skill, n2work } from "@/lib/notion/nameConvert";
import { getDatabase, getPage } from "@/lib/notion/notion";
import React from "react";

export const revalidate = 60;

export async function generateStaticParams() {
  const workDatabase = await getDatabase(workDatabaseId);
  return workDatabase.map((work) => ({
    workId: work.id,
  }));
}

export interface WorksModalProps {
  params: {
    workId: string;
  };
}

const WorksModal = async ({ params }: WorksModalProps) => {
  const workData = (await getPage(params.workId)) as any;
  const work: Work = n2work(workData);
  const skillDatabase = (await getDatabase(skillDatabaseId)) as any;
  const skills: Skill[] = skillDatabase.map(
    (skill: any): Skill => n2skill(skill)
  );

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="ms-8 my-4">
          <h2 className="text-2xl font-semibold">
            <span className="text-primary">{work.title.substring(0, 1)}</span>
            {work.title.substring(1)}
          </h2>
        </DialogHeader>
        <AutoCarousel delay={5000}>
          <CarouselContent className="">
            {work.image.map((imageUrl, index) => (
              <CarouselItem className="" key={index}>
                <div className="w-full sm:h-96 h-64 rounded-l-[6rem] rounded-tr-[6rem] overflow-hidden">
                  <NextImage src={imageUrl} alt="image" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </AutoCarousel>
        <div className="my-4 mx-8 space-y-2">
          <p className="text-md">{work.description}</p>
          <Separator />
          <p>
            AppLink :{" "}
            <a href={work.appLink} className="text-primary">
              {work.appLink}
            </a>
          </p>
          <p>
            Github :{" "}
            <a href={work.githubLink} className="text-primary">
              {work.githubLink}
            </a>
          </p>
          <Separator />
          <ScrollArea className="w-full">
            <ul className="flex py-2 gap-4">
              {skills
                .filter((skill: Skill) =>
                  work.skills.map((skill: any) => skill.id).includes(skill.id)
                )
                .map((skill: Skill, index: number) => (
                  <li
                    key={index}
                    className="p-2 border-primary border text-primary rounded-full"
                  >
                    {skill.title}
                  </li>
                ))}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorksModal;
