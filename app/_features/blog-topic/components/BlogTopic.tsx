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
    <section className="w-full">
      <AutoCarousel delay={5000}>
        <CarouselContent className="">
          {blogs.map((blog, index) => (
            <CarouselItem className="" key={index}>
              <div className="flex justify-between h-[32rem] gap-8 p-16">
                <div className="flex flex-col items-center gap-4 self-center w-1/2">
                  <h2 className="text-4xl font-semibold">{blog.title}</h2>
                  <MotionButton
                    asChild
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ rotate: 0, scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Link href={`/blog/${blog.id}`}>ブログを見る</Link>
                  </MotionButton>
                </div>
                <MotionDiv
                  className="w-1/2 h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 11 }}
                >
                  <NextImage
                    src={blog.image[0]}
                    alt="image"
                    className="rounded-l-[8rem] rounded-tr-[8rem]"
                  />
                </MotionDiv>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </AutoCarousel>
    </section>
  );
};

export default BlogTopic;
