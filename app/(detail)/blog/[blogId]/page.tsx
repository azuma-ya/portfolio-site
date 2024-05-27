import { MotionButton } from "@/app/_components/ui-elements/Motion/MotionComponents";
import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import { Blog } from "@/app/_types/blog";
import { blogDatabaseId } from "@/app/page";
import { getDatabase, getPage, getPageContent } from "@/lib/notion/notion";
import { FaHeart } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { n2blog } from "@/lib/notion/nameConvert";

export async function generateStaticParams() {
  const blogDatabase = await getDatabase(blogDatabaseId);
  return blogDatabase.map((blog) => ({
    blogId: blog.id,
  }));
}

export interface BlogDetailPageProps {
  params: {
    blogId: string;
  };
}

const NotionMarkdown = (content: any, index: number, tab: string = "") => {
  const formattedMarkdown = tab + content.parent.replace(/\n/g, "  \n");
  return (
    <div className="" key={index}>
      <ReactMarkdown
        className="prose lg:prose-xl"
        components={{
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside pb-2" {...props} />
          ),
          li: ({ node, ...props }) => <li {...props} />,
          h1: ({ node, ...props }) => (
            <h1
              {...props}
              id={content.blockId}
              className="pt-6 text-2xl lg:text-4xl"
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} id={content.blockId} className="pt-3" />
          ),
        }}
      >
        {formattedMarkdown}
      </ReactMarkdown>
      {content.children.map((child: any, index2: number) =>
        NotionMarkdown(child, index * index2, "  ")
      )}
    </div>
  );
};

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const blogData = (await getPage(params.blogId)) as any;
  const blog: Blog = await n2blog(blogData);
  const blogContents: any = await getPageContent(params.blogId);

  console.dir(blogContents, { depth: null });

  return (
    <div className="max-w-7xl mx-auto mb-32">
      <h1 className="text-4xl font-semibold my-32 text-center mx-4">
        {blog.title}
      </h1>
      <div className="flex gap-4 w-full">
        <MotionButton
          size="icon"
          variant="ghost"
          className="flex-none bg-white sm:flex hidden"
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaHeart className="text-red-400" />
        </MotionButton>
        <div className="bg-white rounded-l-2xl rounded-tr-2xl p-4 grow w-ful">
          <div className="h-64 mb-8 w-full">
            <NextImage src={blog.image[0]} alt={blog.title} className="" />
          </div>
          <div className="py-10 lg:py-10">
            {blogContents.map((content: any, index: number) => {
              if (content.type === "image") return;
              // if (!!content.children)
              return NotionMarkdown(content, index);
            })}
          </div>
        </div>
        <div className="w-1/4 flex-none bg-white h-64 rounded-l-2xl rounded-tr-2xl p-4 hidden sm:block">
          <p className="font-semibold py-2">目次</p>
          <ul>
            {blogContents
              .filter(
                (content: any) =>
                  content.type === "heading_1" || content.type === "heading_2"
              )
              .map((content: any, index: any) => (
                <li key={index} className="">
                  <Button asChild variant="link" className="my-0 text-wrap">
                    <Link href={`#${content.blockId}`}>
                      {content.parent
                        .replace(/\n/g, "  \n")
                        .replaceAll("#", "")}
                    </Link>
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
