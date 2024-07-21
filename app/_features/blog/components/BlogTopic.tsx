import Link from "next/link";

import {
  MotionButton,
  MotionDiv,
} from "@/components/ui-elements/Motion/MotionComponents";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { Blog } from "@/types/blog";

import { NextImage } from "../../../../components/ui-elements/iamge/NextImage";
import AutoCarousel from "../../../../components/ui-parts/AutoCarousel";

export interface BlogTopicPros {
  blogs: Blog[];
}

const BlogTopic = ({ blogs }: BlogTopicPros) => {
  return (
    <section className="w-screen sm:w-full">
      <AutoCarousel delay={5000}>
        <CarouselContent className="">
          {blogs.map((blog, index) => (
            <CarouselItem className="" key={index}>
              <div className="h-[28rem] flex-row-reverse justify-between gap-8 sm:flex sm:h-[32rem] sm:p-16">
                <MotionDiv
                  className="h-2/3 sm:h-full sm:w-1/2 "
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 11 }}
                >
                  <Link href={`/blog/${blog.id}`}>
                    <NextImage
                      src={blog.image[0]}
                      alt="image"
                      className="border-2 duration-200 hover:brightness-90 sm:rounded-l-[8rem] sm:rounded-tr-[8rem]"
                    />
                  </Link>
                </MotionDiv>
                <div className="flex flex-col items-center gap-2 self-center sm:w-1/2 sm:gap-4">
                  <h2 className="text-2xl font-semibold sm:text-4xl">
                    {blog.title}
                  </h2>
                  <MotionButton
                    asChild
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ rotate: 0, scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.2 }}
                    className="mx-2 self-end sm:mx-0 sm:self-auto"
                  >
                    <Link href={`/blog/${blog.id}`}>ブログを見る</Link>
                  </MotionButton>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </AutoCarousel>
    </section>
  );
};

export default BlogTopic;
