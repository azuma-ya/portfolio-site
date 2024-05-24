import SectionLayout from "@/app/_components/layouts/section/SectionLayout";
import {
  MotionButton,
  MotionDiv,
} from "@/app/_components/ui-elements/Motion/MotionComponents";
import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import AutoCarousel from "@/app/_components/ui-parts/AutoCarousel";
import { Blog } from "@/app/_types/blog";
import { Button } from "@/components/ui/button";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface BlogPicUpProps {
  blogs: Blog[];
}

const BlogPicUp = ({ blogs }: BlogPicUpProps) => {
  return (
    <SectionLayout
      id="blog"
      title="BlOG PIC UP"
      sectionButton={
        <MotionButton
          asChild
          variant="outline"
          className="h-14 w-14 border-primary"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ rotate: 0, scale: 1 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.3 }}
        >
          <Link href="/blog">
            <ArrowRight className="text-primary" size={48} strokeWidth={3} />
          </Link>
        </MotionButton>
      }
    >
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
          hidden: { opacity: 0 },
        }}
        viewport={{ once: true }}
      >
        <AutoCarousel delay={5000}>
          <CarouselContent className="p-8">
            {blogs.map((blog, index) => (
              <CarouselItem className="sm:basis-1/3" key={index}>
                <Link href={`/blog/${blog.id}`} className="group">
                  <MotionDiv
                    className="space-y-2"
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    whileTap={{ scale: 0.9 }}
                    variants={{
                      visible: { opacity: 1, scale: 1 },
                      hidden: { opacity: 0, scale: 0 },
                    }}
                    viewport={{ once: true }}
                  >
                    <div className=" lg:h-96 sm:h-80 h-48 overflow-hidden lg:rounded-l-[6rem] lg:rounded-tr-[6rem] md:rounded-l-[5rem] md:rounded-tr-[5rem] rounded-l-[4rem] rounded-tr-[4rem] border-2">
                      <NextImage src={blog.image[0]} alt={blog.title} />
                    </div>
                    <p className="">
                      {blog.createdAt?.toLocaleDateString("ja-JP")}
                    </p>
                    <h3 className="sm:text-2xl text-xl font-semibold">
                      {blog.title}
                    </h3>
                  </MotionDiv>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </AutoCarousel>
      </MotionDiv>
    </SectionLayout>
  );
};

export default BlogPicUp;
