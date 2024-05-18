import { Blog } from "@/app/_types/blog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { NextImage } from "../../../_components/ui-elements/iamge/NextImage";
import Link from "next/link";
import AutoCarousel from "../../../_components/ui-parts/AutoCarousel";
import {
  MotionButton,
  MotionDiv,
} from "@/app/_components/ui-elements/Motion/MotionComponents";

export interface BlogTopicPros {
  blogs: Blog[];
}

const BlogTopic = ({ blogs }: BlogTopicPros) => {
  return (
    <section className="sm:w-full w-screen">
      <AutoCarousel delay={5000}>
        <CarouselContent className="">
          {blogs.map((blog, index) => (
            <CarouselItem className="" key={index}>
              <div className="sm:flex flex-row-reverse justify-between sm:h-[32rem] h-[28rem] gap-8 sm:p-16">
                <MotionDiv
                  className="sm:w-1/2 sm:h-full h-2/3 "
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 11 }}
                >
                  <NextImage
                    src={blog.image[0]}
                    alt="image"
                    className="sm:rounded-l-[8rem] shadow-xl sm:rounded-tr-[8rem] hover:brightness-90 duration-200"
                  />
                </MotionDiv>
                <div className="flex flex-col items-center sm:gap-4 gap-2 self-center sm:w-1/2">
                  <h2 className="sm:text-4xl text-2xl font-semibold">
                    {blog.title}
                  </h2>
                  <MotionButton
                    asChild
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ rotate: 0, scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.2 }}
                    className="self-end mx-2 sm:self-auto sm:mx-0"
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
