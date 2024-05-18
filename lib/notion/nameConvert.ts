import { Artwork } from "@/app/_types/artworks";
import { Blog } from "@/app/_types/blog";
import { Skill } from "@/app/_types/skill";
import { Work } from "@/app/_types/work";

export const n2blog = (blog: any): Blog => ({
  id: blog.id,
  title: blog.properties.Blog.title[0].plain_text,
  description: blog.properties.Description.rich_text[0]?.plain_text ?? "null",
  image: blog.properties.Image.files.map((file: any) => file.file.url),
  createdAt: new Date(blog.properties.CreatedAt?.date.start ?? undefined),
  skills: blog.properties.Skills.relation,
});

export const n2work = (work: any): Work => ({
  id: work.id,
  title: work.properties.Title.title[0]?.plain_text,
  description: work.properties.Description.rich_text[0]?.plain_text ?? "null",
  image: work.properties.Image.files.map((file: any) => file.file.url),
  createdAt: new Date(work.properties.CreatedAt?.date.start ?? undefined),
  appLink: work.properties.AppLink.url,
  githubLink: work.properties.GithubLink.url,
  skills: work.properties.Skills.relation,
});

export const n2skill = (work: any): Skill => ({
  id: work.id,
  title: work.properties.Title.title[0]?.plain_text,
  description: work.properties.Description.rich_text[0]?.plain_text ?? "null",
  image: work.properties.Image.files.map((file: any) => file.file.url),
  homepageLink: work.properties.HomepageLink.url,
  type: work.properties.Type.select.name,
});

export const n2artwork = (artwork: any): Artwork => ({
  id: artwork.id,
  title: artwork.properties.Title.title[0]?.plain_text,
  description:
    artwork.properties.Description.rich_text[0]?.plain_text ?? "null",
  image: artwork.properties.Image.files.map((file: any) => file.file.url),
  createdAt: new Date(artwork.properties.CreatedAt?.date.start ?? undefined),
});
