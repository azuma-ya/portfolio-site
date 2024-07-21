import { skillDatabaseId, workDatabaseId } from "@/app/page";
import { NextImage } from "@/components/ui-elements/iamge/NextImage";
import AutoCarousel from "@/components/ui-parts/AutoCarousel";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { n2skill, n2work } from "@/lib/notion/nameConvert";
import { getDatabase, getPage } from "@/lib/notion/notion";
import type { Skill } from "@/types/skill";
import type { Work } from "@/types/work";

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
  const workData = await getPage(params.workId);
  const work: Work = await n2work(workData);
  const skillDatabase = await getDatabase(skillDatabaseId);
  const skills: Skill[] = await Promise.all(
    // eslint-disable-next-line
    skillDatabase.map(async (skill: any) => await n2skill(skill)),
  );

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:hidden-scrollbar h-2/3 overflow-auto sm:max-h-[80%] sm:max-w-4xl">
        <DialogHeader className="my-4 ms-8">
          <h2 className="text-2xl font-semibold">
            <span className="text-primary">{work.title.substring(0, 1)}</span>
            {work.title.substring(1)}
          </h2>
        </DialogHeader>
        <AutoCarousel delay={5000}>
          <CarouselContent className="">
            {work.image.map((imageUrl, index) => (
              <CarouselItem className="" key={index}>
                <div className="h-64 w-full overflow-hidden rounded-l-[6rem] rounded-tr-[6rem] border-2 sm:h-96">
                  <NextImage src={imageUrl} alt="image" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </AutoCarousel>
        <div className="mx-8 my-4 space-y-2">
          <p className="text-base">{work.description}</p>
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
            <ul className="mb-2 flex gap-4 text-nowrap py-2">
              {skills
                .filter((skill: Skill) =>
                  // eslint-disable-next-line
                  work.skills.map((skill: any) => skill.id).includes(skill.id),
                )
                .map((skill: Skill, index: number) => (
                  <li
                    key={index}
                    className="rounded-full border border-primary p-2 text-xs text-primary sm:text-base"
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
