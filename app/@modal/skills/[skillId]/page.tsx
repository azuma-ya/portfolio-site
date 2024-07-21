import Work from "@/app/_features/works/components/Work";
import { Skill } from "@/app/_types/skill";
import { Work as WorkType } from "@/app/_types/work";
import { skillDatabaseId, workDatabaseId } from "@/app/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { n2skill, n2work } from "@/lib/notion/nameConvert";
import { getDatabase, getPage } from "@/lib/notion/notion";

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
  const skill: Skill = await n2skill(skillData);
  const workDatabase = (await getDatabase(workDatabaseId)) as any;
  const works: WorkType[] = await Promise.all(
    workDatabase.map(async (work: any) => await n2work(work)),
  );

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="my-4 ms-8 text-2xl font-semibold">
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
        <h4 className="mx-8 pt-2 font-semibold">WORKS</h4>
        <Carousel className="">
          <CarouselContent className="m-4">
            {works
              .filter((work) =>
                work.skills.map((skill: any) => skill.id).includes(skill.id),
              )
              .map((work, index) => (
                <CarouselItem className="sm:basis-1/3" key={index}>
                  <Work
                    work={work}
                    key={index}
                    className="h-48 w-full sm:h-32"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsModal;
