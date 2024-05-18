import { getDatabase } from "@/lib/notion/notion";
import BlogTopic from "./_features/blog-topic/components/BlogTopic";
import { Blog } from "./_types/blog";
import Works from "./_features/works/components/Works";
import { Work } from "./_types/work";
import Header from "./_components/layouts/header/Header";
import Skills from "./_features/skills/components/Skills";
import { Skill } from "./_types/skill";
import Artworks from "./_features/artworks/components/Artworks";
import { Artwork } from "./_types/artworks";
import BlogPicUp from "./_features/blog-pic-up/components/BlogPicUp";
import ScrollLayout from "./_components/layouts/ScrollLayout";
import Contact from "./_features/contact/components/Contact";
import { MotionDiv } from "./_components/ui-elements/Motion/MotionComponents";
import HeroParticles from "./_components/layouts/Particles";

export const workDatabaseId = process.env.WORK_DATABASE_ID as string;
export const skillDatabaseId = process.env.SKILL_DATABASE_ID as string;
export const artworkDatabaseId = process.env.ARTWORK_DATABASE_ID as string;
export const blogDatabaseId = process.env.BLOG_DATABASE_ID as string;

export default async function Home() {
  const workDatabase = (await getDatabase(workDatabaseId)) as any;
  const skillDatabase = (await getDatabase(skillDatabaseId)) as any;
  const artworkDatabase = (await getDatabase(artworkDatabaseId)) as any;
  const blogDatabase = (await getDatabase(blogDatabaseId)) as any;
  const blogs = blogDatabase.map(
    (blog: any): Blog => ({
      id: blog.id,
      title: blog.properties.Blog.title[0].plain_text,
      description:
        blog.properties.Description.rich_text[0]?.plain_text ?? "null",
      image: blog.properties.Image.files.map((file: any) => file.file.url),
      createdAt: new Date(blog.properties.CreatedAt?.date.start ?? undefined),
    })
  );
  const works = workDatabase.map(
    (work: any): Work => ({
      id: work.id,
      title: work.properties.Title.title[0]?.plain_text,
      description:
        work.properties.Description.rich_text[0]?.plain_text ?? "null",
      image: work.properties.Image.files.map((file: any) => file.file.url),
      createdAt: new Date(work.properties.CreatedAt?.date.start ?? undefined),
      appLink: work.properties.AppLink.url,
      githubLink: work.properties.GithubLink.url,
      skills: work.properties.Skills.relation,
    })
  );
  const skills = skillDatabase.map(
    (work: any): Skill => ({
      id: work.id,
      title: work.properties.Title.title[0]?.plain_text,
      description:
        work.properties.Description.rich_text[0]?.plain_text ?? "null",
      image: work.properties.Image.files.map((file: any) => file.file.url),
      homepageLink: work.properties.HomepageLink.url,
      type: work.properties.Type.select.name,
    })
  );
  const artworks = artworkDatabase.map(
    (artwork: any): Artwork => ({
      id: artwork.id,
      title: artwork.properties.Title.title[0]?.plain_text,
      description:
        artwork.properties.Description.rich_text[0]?.plain_text ?? "null",
      image: artwork.properties.Image.files.map((file: any) => file.file.url),
      createdAt: new Date(
        artwork.properties.CreatedAt?.date.start ?? undefined
      ),
    })
  );
  return (
    <ScrollLayout>
      <div className="bg-hero-pattern sm:bg-cover bg-contain bg-repeat-y ">
        <Header />
        <main className="container flex flex-col items-center md:gap-80 gap-40 py-8 md:py-28">
          <HeroParticles />
          <BlogTopic blogs={blogs} />
          <section className="flex items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="hidden sm:block">
                <MotionDiv
                  className="h-32 w-32 cursor-pointer bg-icon rounded-full bg-cover group"
                  drag
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  whileHover={{ scale: 1.1 }}
                />
                <p className="text-center font-semibold text-accent-foreground italic group-hover:text-primary hover:text-primary duration-300 cursor-pointer">
                  Welcom!
                </p>
              </div>
              <div className="max-w-lg space-y-4">
                <div className="flex items-center justify-around">
                  <div className="sm:hidden block">
                    <MotionDiv
                      className="h-16 w-16 cursor-pointer bg-icon rounded-full bg-cover group"
                      drag
                      dragTransition={{
                        bounceStiffness: 600,
                        bounceDamping: 20,
                      }}
                      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <p className="text-center text-sm font-semibold text-accent-foreground italic group-hover:text-primary hover:text-primary duration-300 cursor-pointer">
                      Welcom!
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-semibold">青山 和樹</h2>
                    <p>Aoyama Kazuki</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p>
                    埼玉県出身、情報学部に進学し、これを機にプログラミングを独学で学び始めました。もともとモノづくりが好きだったこともあり、IT技術を使って、人に喜んでもらえる、生活を便利にさせるアプリ開発を目指して、日々個人プロジェクトの開発を行っています。
                  </p>
                  <ul>
                    <li>Blog : </li>
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
          <div className="space-y-32 w-full">
            <Skills skills={skills} type="language" />
            <Skills skills={skills} type="library" />
            <Skills skills={skills} type="framework" />
          </div>
          <Artworks artworks={artworks} />
          <BlogPicUp blogs={blogs} />
          <Contact />
        </main>
      </div>
    </ScrollLayout>
  );
}
