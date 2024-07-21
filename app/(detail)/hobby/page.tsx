import Skills from "@/app/_features/skills/components/Skills";
import { skillDatabaseId } from "@/app/page";
import { n2skill } from "@/lib/notion/nameConvert";
import { getDatabase } from "@/lib/notion/notion";
import type { Skill } from "@/types/skill";

const HobbyPage = async () => {
  const skillDatabase = await getDatabase(skillDatabaseId);
  const skills: Skill[] = await Promise.all(
    // eslint-disable-next-line
    skillDatabase.map(async (skill: any) => await n2skill(skill)),
  );
  return (
    <main className="container flex flex-col items-center gap-40 py-8 md:gap-80 md:py-28">
      <div className="w-full space-y-16 sm:space-y-32">
        <Skills skills={skills} type="hobby" />
      </div>
    </main>
  );
};

export default HobbyPage;
