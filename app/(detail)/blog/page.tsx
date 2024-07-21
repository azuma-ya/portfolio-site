import BlogPresentation from "@/app/_features/blog/components/BlogPresentation";
import { blogDatabaseId, skillDatabaseId } from "@/app/page";
import { n2blog, n2skill } from "@/lib/notion/nameConvert";
import { getDatabase } from "@/lib/notion/notion";
import type { Blog } from "@/types/blog";
import type { Skill } from "@/types/skill";

const BlogPage = async () => {
  const blogDatabase = await getDatabase(blogDatabaseId);
  const blogs: Blog[] = await Promise.all(
    // eslint-disable-next-line
    blogDatabase.map(async (blog: any) => await n2blog(blog)),
  );
  const skillDatabase = await getDatabase(skillDatabaseId);
  const skills: Skill[] = await Promise.all(
    // eslint-disable-next-line
    skillDatabase.map(async (skill: any) => await n2skill(skill)),
  );

  return <BlogPresentation blogs={blogs} skills={skills} />;
};

export default BlogPage;
