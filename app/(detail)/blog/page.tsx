import BlogPresentation from "@/app/_features/blog/components/BlogPresentation";
import { Blog } from "@/app/_types/blog";
import { Skill } from "@/app/_types/skill";
import { blogDatabaseId, skillDatabaseId } from "@/app/page";
import { n2blog, n2skill } from "@/lib/notion/nameConvert";
import { getDatabase } from "@/lib/notion/notion";
import React from "react";

const BlogPage = async () => {
  const blogDatabase = (await getDatabase(blogDatabaseId)) as any;
  const blogs: Blog[] = await Promise.all(
    blogDatabase.map(async (blog: any) => await n2blog(blog))
  );
  const skillDatabase = (await getDatabase(skillDatabaseId)) as any;
  const skills: Skill[] = await Promise.all(
    skillDatabase.map(async (skill: any) => await n2skill(skill))
  );

  return <BlogPresentation blogs={blogs} skills={skills} />;
};

export default BlogPage;
