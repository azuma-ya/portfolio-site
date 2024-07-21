import Link from "next/link";

import BackGround from "@/components/layouts/BackGround";
import HeroParticles from "@/components/layouts/Particles";
import ScrollLayout from "@/components/layouts/ScrollLayout";
import Header from "@/components/layouts/header/Header";
import FollowPointer from "@/components/ui-elements/Motion/FollowPointer";
import { MotionDiv } from "@/components/ui-elements/Motion/MotionComponents";
import { Button } from "@/components/ui/button";
import { n2artwork, n2blog, n2skill, n2work } from "@/lib/notion/nameConvert";
import { getDatabase } from "@/lib/notion/notion";

import type { Artwork } from "../types/artworks";
import type { Blog } from "../types/blog";
import type { Skill } from "../types/skill";
import type { Work } from "../types/work";
import Artworks from "./_features/artworks/components/Artworks";
import BlogPicUp from "./_features/blog/components/BlogPicUp";
import BlogTopic from "./_features/blog/components/BlogTopic";
import Contact from "./_features/contact/components/Contact";
import Skills from "./_features/skills/components/Skills";
import Works from "./_features/works/components/Works";

export const workDatabaseId = process.env.WORK_DATABASE_ID as string;
export const skillDatabaseId = process.env.SKILL_DATABASE_ID as string;
export const artworkDatabaseId = process.env.ARTWORK_DATABASE_ID as string;
export const blogDatabaseId = process.env.BLOG_DATABASE_ID as string;

export default async function Home() {
  const workDatabase = await getDatabase(workDatabaseId);
  const skillDatabase = await getDatabase(skillDatabaseId);
  const artworkDatabase = await getDatabase(artworkDatabaseId);
  const blogDatabase = await getDatabase(blogDatabaseId);
  const blogs: Blog[] = await Promise.all(
    // eslint-disable-next-line
    blogDatabase.map(async (blog: any) => await n2blog(blog)),
  );
  const works: Work[] = await Promise.all(
    // eslint-disable-next-line
    workDatabase.map(async (work: any) => await n2work(work)),
  );
  const skills: Skill[] = await Promise.all(
    // eslint-disable-next-line
    skillDatabase.map(async (skill: any) => await n2skill(skill)),
  );
  const artworks: Artwork[] = await Promise.all(
    // eslint-disable-next-line
    artworkDatabase.map(async (artwork: any) => await n2artwork(artwork)),
  );

  return (
    <ScrollLayout>
      <div className="z-40">
        <Header />
        <FollowPointer />
        <main className="container flex flex-col items-center gap-40 py-8 md:gap-80 md:py-28">
          <HeroParticles />
          <BlogTopic blogs={blogs} />
          <section className="flex items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="hidden sm:block">
                <MotionDiv
                  className="group size-32 cursor-pointer rounded-full bg-icon bg-cover"
                  drag
                  dragTransition={{
                    bounceStiffness: 600,
                    bounceDamping: 20,
                  }}
                  dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  whileHover={{ scale: 1.1 }}
                />
                <p className="cursor-pointer select-none text-center font-semibold italic text-accent-foreground duration-300 group-hover:text-primary hover:text-primary">
                  Welcom!
                </p>
              </div>
              <div className="max-w-lg space-y-4">
                <div className="flex items-center justify-around">
                  <div className="block sm:hidden">
                    <MotionDiv
                      className="group size-16 cursor-pointer rounded-full bg-icon bg-cover"
                      drag
                      dragTransition={{
                        bounceStiffness: 600,
                        bounceDamping: 20,
                      }}
                      dragConstraints={{
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                      }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <p className="cursor-pointer text-center text-sm font-semibold italic text-accent-foreground duration-300 group-hover:text-primary hover:text-primary">
                      Welcom!
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-semibold">青山 和樹</h2>
                    <p>Aoyama Kazuki</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="">
                    埼玉県出身、情報学部に進学し、これを機にプログラミングを独学で学び始めました。もともとモノづくりが好きだったこともあり、IT技術を使って、人に喜んでもらえる、生活を便利にさせるアプリ開発を目指して、日々個人プロジェクトの開発を行っています。
                  </p>
                  <ul>
                    <li>
                      Blog :{" "}
                      <a
                        href="https://www.azuma-ya-lab.com/blog"
                        className="text-primary"
                      >
                        https://www.azuma-ya-lab.com/blog
                      </a>
                    </li>
                    <li>
                      Github :{" "}
                      <a
                        href="https://github.com/azuma-ya"
                        className="text-primary"
                      >
                        https://github.com/azuma-ya
                      </a>
                    </li>
                    <li>
                      Zenn :{" "}
                      <a
                        href="https://zenn.dev/cl___l"
                        className="text-primary"
                      >
                        https://zenn.dev/cl___l
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <Works works={works} />
          <div className="w-full space-y-16 sm:space-y-32">
            <Skills skills={skills} type="language" />
            <Skills skills={skills} type="library" />
            <Skills skills={skills} type="framework" />
            <div className="flex w-full items-center justify-center">
              <Button
                variant="link"
                className="text-xl font-light text-foreground decoration-primary"
                asChild
              >
                <Link href="/hobby">趣味言語へ...</Link>
              </Button>
            </div>
          </div>
          <Artworks artworks={artworks} />
          <BlogPicUp blogs={blogs} />
          <Contact />
        </main>
      </div>
      <BackGround />
    </ScrollLayout>
  );
}
