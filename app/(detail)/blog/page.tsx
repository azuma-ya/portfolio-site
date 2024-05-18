import BlogPresentation from "@/app/_features/blog/components/BlogPresentation";
import { Blog } from "@/app/_types/blog";
import { Skill } from "@/app/_types/skill";
import { blogDatabaseId, skillDatabaseId } from "@/app/page";
import { n2blog, n2skill } from "@/lib/notion/nameConvert";
import { getDatabase } from "@/lib/notion/notion";
import React from "react";

export const revalidate = 60;

const BlogPage = async () => {
  const blogDatabase = (await getDatabase(blogDatabaseId)) as any;
  const blogs: Blog[] = blogDatabase.map((blog: any): Blog => n2blog(blog));
  const skillDatabase = (await getDatabase(skillDatabaseId)) as any;
  const skills = skillDatabase.map((skill: any): Skill => n2skill(skill));

  return <BlogPresentation blogs={blogs} skills={skills} />;
};

export default BlogPage;
