import type { Artwork } from "@/types/artworks";
import type { Blog } from "@/types/blog";
import type { Skill } from "@/types/skill";
import type { Work } from "@/types/work";

import { saveImageIfNeed } from "../aws/aws";

export const n2blog = async (blog: any): Promise<Blog> => ({
  id: blog.id,
  title: blog.properties.Blog.title[0].plain_text,
  description: blog.properties.Description.rich_text[0]?.plain_text ?? "null",
  image: await Promise.all(
    blog.properties.Image.files.map(
      async (file: any) => await saveImageIfNeed(file),
    ),
  ),
  createdAt: new Date(blog.properties.CreatedAt?.date.start ?? undefined),
  skills: blog.properties.Skills.relation,
});

export const n2work = async (work: any): Promise<Work> => ({
  id: work.id,
  title: work.properties.Title.title[0]?.plain_text,
  description: work.properties.Description.rich_text[0]?.plain_text ?? "null",
  image: await Promise.all(
    work.properties.Image.files.map(
      async (file: any) => await saveImageIfNeed(file),
    ),
  ),
  createdAt: new Date(work.properties.CreatedAt?.date.start ?? undefined),
  appLink: work.properties.AppLink.url,
  githubLink: work.properties.GithubLink.url,
  skills: work.properties.Skills.relation,
});

export const n2skill = async (skill: any): Promise<Skill> => ({
  id: skill.id,
  title: skill.properties.Title.title[0]?.plain_text,
  description: skill.properties.Description.rich_text[0]?.plain_text ?? "null",
  image: await Promise.all(
    skill.properties.Image.files.map(
      async (file: any) => await saveImageIfNeed(file),
    ),
  ),
  homepageLink: skill.properties.HomepageLink.url,
  type: skill.properties.Type.select.name,
});

export const n2artwork = async (artwork: any): Promise<Artwork> => ({
  id: artwork.id,
  title: artwork.properties.Title.title[0]?.plain_text,
  description:
    artwork.properties.Description.rich_text[0]?.plain_text ?? "null",
  image: await Promise.all(
    artwork.properties.Image.files.map(
      async (file: any) => await saveImageIfNeed(file),
    ),
  ),
  createdAt: new Date(artwork.properties.CreatedAt?.date.start ?? undefined),
});
