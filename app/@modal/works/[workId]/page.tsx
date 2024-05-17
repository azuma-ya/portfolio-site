import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import AutoCarousel from "@/app/_components/ui-parts/AutoCarousel";
import { Work } from "@/app/_types/work";
import { workDatabaseId } from "@/app/page";
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
  const work: Work = {
    id: workData.id,
    title: workData.properties.Title.title[0]?.plain_text,
    description:
      workData.properties.Description.rich_text[0]?.plain_text ?? "null",
    image: workData.properties.Image.files.map((file: any) => file.file.url),
    createdAt: new Date(workData.properties.CreatedAt.start),
    appLink: workData.properties.AppLink.url,
    githubLink: workData.properties.GithubLink.url,
    skills: workData.properties.Skills.relation,
  };
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
                <div className="w-full h-96 rounded-l-[6rem] rounded-tr-[6rem] overflow-hidden">
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
          <ul className="flex">
            {work.skills.map((skill: { id: string }, index: number) => (
              <li key={index}>{skill.id}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorksModal;
