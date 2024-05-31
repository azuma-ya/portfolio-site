import { MotionButton } from "@/app/_components/ui-elements/Motion/MotionComponents";
import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import { Blog } from "@/app/_types/blog";
import { blogDatabaseId } from "@/app/page";
import { getDatabase, getPage, getPageContent } from "@/lib/notion/notion";
import { FaHeart } from "react-icons/fa";
import ReactMarkdown, { ExtraProps } from "react-markdown";
import { Button } from "@/components/ui/button";
import { n2blog } from "@/lib/notion/nameConvert";
import { saveImageIfNeed } from "@/lib/aws/aws";
import { Separator } from "@/components/ui/separator";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  okaidia,
  tomorrow,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
import React, { ClassAttributes, HTMLAttributes } from "react";

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
  const blogContent: any = await getPageContent(params.blogId);

  const images = blogContent.parent
    .match(/!\[[^\]]*\]\(([^)]+)\)/g)
    ?.map((imageUrl: string) =>
      imageUrl.match(/https?:\/\/[\w!?/+\-_~;.,*&@#$%()='[\]]+(?<!\))/)
    )
    .map((image: any) => ({
      name: decodeURI(image[0].match(/[^\/]*?(\.jpeg|\.jpg|\.png|\.gif)/)[0]),
      file: { url: decodeURI(image[0]) },
    }));

  if (!!images) {
    const savedImages = await Promise.all(
      images.map(async (image: any) => await saveImageIfNeed(image))
    );

    savedImages.forEach((image: string, index: number) => {
      const replace = blogContent.parent.match(/!\[[^\]]*\]\(([^)]+)\)/g)[
        index
      ];
      blogContent.parent = blogContent.parent.replace(
        replace,
        `![${image}](${image})`
      );
    });
  }

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
        <div className="bg-white rounded-l-2xl rounded-tr-2xl p-4 grow w-full">
          <div className="h-64 mb-8 w-full">
            <NextImage src={blog.image[0]} alt={blog.title} className="" />
          </div>
          <Separator />
          <div className="py-10 lg:py-10 w-full">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              className="markdown break-words w-full"
              components={{
                h1: ({ node, ...props }) => (
                  <h2 {...props} id={node?.position?.start.line.toString()} />
                ),
                h2: ({ node, ...props }) => (
                  <h3 {...props} id={node?.position?.start.line.toString()} />
                ),
                h3: ({ node, ...props }) => (
                  <h4 {...props} id={node?.position?.start.line.toString()} />
                ),
                pre: Pre,
              }}
              children={blogContent.parent}
            />
          </div>
        </div>
        <div className="w-1/4 flex-none bg-white min-h-64 h-full rounded-l-2xl rounded-tr-2xl p-4 hidden sm:block">
          <p className="font-semibold py-2">目次</p>
          <ul>
            {
              <ReactMarkdown
                allowedElements={["h1", "h2"]}
                components={{
                  h1: h1AnkerLink,
                  h2: h2AnkerLink,
                }}
              >
                {blogContent.parent}
              </ReactMarkdown>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;

const h1AnkerLink = ({ node, ...props }: any) => {
  return (
    <li>
      <Button asChild variant="link" className="my-0 text-wrap" size="sm">
        <Link href={"#" + node.position?.start.line.toString()}>
          ・{props.children}
        </Link>
      </Button>
    </li>
  );
};

const h2AnkerLink = ({ node, ...props }: any) => {
  return (
    <li>
      <Link
        href={"#" + node.position?.start.line.toString()}
        className="ms-8 text-sm font-semibold hover:border-b-2"
      >
        -{props.children}
      </Link>
    </li>
  );
};

const Pre = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps) => {
  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } = childProps;
  const language = className?.replace("language-", "");

  return (
    <SyntaxHighlighter
      style={tomorrow}
      language={language}
      children={String(code).replace(/\n$/, "")}
    />
  );
};

const CodeBlock = (props: any) => {
  const { inline, children, className } = props;
  console.dir(props, { depth: null });
  if (inline) {
    return <code>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  return (
    <SyntaxHighlighter
      style={okaidia}
      language={lang}
      children={String(children).replace(/\n$/, "")}
    />
  );
};
