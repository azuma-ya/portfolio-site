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

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const blogData = (await getPage(params.blogId)) as any;
  const blog: Blog = await n2blog(blogData);
  const blogContents: any = await getPageContent(params.blogId);

  return (
    <div className="max-w-6xl mx-auto mb-32">
      <h1 className="text-4xl font-semibold my-32 text-center mx-4">
        {blog.title}
      </h1>
      <div className="flex gap-4">
        <MotionButton
          size="icon"
          variant="ghost"
          className="flex-none bg-white sm:flex hidden"
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaHeart className="text-red-400" />
        </MotionButton>
        <div className="bg-white rounded-l-2xl rounded-tr-2xl p-4 grow">
          <div className="h-64 mb-8 w-full">
            <NextImage src={blog.image[0]} alt={blog.description} />
          </div>
          <div className="py-10 lg:py-10">
            {blogContents.map((content: any, index: any) => {
              const formattedMarkdown = content.parent.replace(/\n/g, "  \n");
              return (
                <div className="pt-3" key={index}>
                  <ReactMarkdown
                    className="prose lg:prose-xl"
                    components={{
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal list-inside pb-2"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => <li {...props} />,
                      h1: ({ node, ...props }) => (
                        <h1 {...props} id={content.blockId} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 {...props} id={content.blockId} />
                      ),
                    }}
                  >
                    {formattedMarkdown}
                  </ReactMarkdown>
                </div>
              );
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
                  <Button asChild variant="link" className="my-0">
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
