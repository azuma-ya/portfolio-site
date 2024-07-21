import { ArrowRight } from "lucide-react";
import Link from "next/link";

import SectionLayout from "@/components/layouts/section/SectionLayout";
import {
  MotionButton,
  MotionDiv,
} from "@/components/ui-elements/Motion/MotionComponents";
import { NextImage } from "@/components/ui-elements/iamge/NextImage";
import AutoCarousel from "@/components/ui-parts/AutoCarousel";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { Blog } from "@/types/blog";

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
          className="size-14 border-primary"
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
                    <div className=" h-48 overflow-hidden rounded-l-[4rem] rounded-tr-[4rem] border-2 sm:h-80 md:rounded-l-[5rem] md:rounded-tr-[5rem] lg:h-96 lg:rounded-l-[6rem] lg:rounded-tr-[6rem]">
                      <NextImage src={blog.image[0]} alt={blog.title} />
                    </div>
                    <p className="">
                      {blog.createdAt?.toLocaleDateString("ja-JP")}
                    </p>
                    <h3 className="text-xl font-semibold sm:text-2xl">
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
