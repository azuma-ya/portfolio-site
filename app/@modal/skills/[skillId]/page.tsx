import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import Work from "@/app/_features/works/components/Work";
import { Skill } from "@/app/_types/skill";
import { Work as WorkType } from "@/app/_types/work";
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
import { Separator } from "@/components/ui/separator";
import { getDatabase, getPage } from "@/lib/notion/notion";
import React from "react";

export async function generateStaticParams() {
  const skillDatabase = await getDatabase(skillDatabaseId);
  return skillDatabase.map((skill) => ({
    skillId: skill.id,
  }));
}

export interface SkillsModalProps {
  params: {
    skillId: string;
  };
}

const SkillsModal = async ({ params }: SkillsModalProps) => {
  const skillData = (await getPage(params.skillId)) as any;
  const skill: Skill = {
    id: skillData.id,
    title: skillData.properties.Title.title[0]?.plain_text,
    description:
      skillData.properties.Description.rich_text[0]?.plain_text ?? "null",
    image: skillData.properties.Image.files.map((file: any) => file.file.url),
    homepageLink: skillData.properties.HomepageLink.url,
    type: skillData.properties.Type.select.name,
  };
  const workDatabase = (await getDatabase(workDatabaseId)) as any;
  const works: WorkType[] = workDatabase.map(
    (work: any): WorkType => ({
      id: work.id,
      title: work.properties.Title.title[0]?.plain_text,
      description:
        work.properties.Description.rich_text[0]?.plain_text ?? "null",
      image: work.properties.Image.files.map((file: any) => file.file.url),
      createdAt: new Date(work.properties.CreatedAt.start),
      appLink: work.properties.AppLink.url,
      githubLink: work.properties.GithubLink.url,
      skills: work.properties.Skills.relation,
    })
  );
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="text-2xl font-semibold ms-8 my-4">
          {skill.title}
        </DialogHeader>
        <div className="mx-8 mb-2">
          <p className="">{skill.description}</p>
          <p className="">
            HomepageLink :{" "}
            <a href={skill.homepageLink} className="text-primary">
              {skill.homepageLink}
            </a>
          </p>
        </div>
        <Separator />
        <h4 className="mx-8 font-semibold pt-2">WORKS</h4>
        <Carousel className="">
          <CarouselContent className="m-4">
            {works
              .filter((work) =>
                work.skills.map((skill: any) => skill.id).includes(skill.id)
              )
              .map((work, index) => (
                <CarouselItem className="sm:basis-1/3" key={index}>
                  <Work
                    work={work}
                    key={index}
                    className="w-full sm:h-32 h-48"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsModal;
