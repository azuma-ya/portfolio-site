import SectionLayout from "@/app/_components/layouts/section/SectionLayout";
import {
  MotionButton,
  MotionDiv,
} from "@/app/_components/ui-elements/Motion/MotionComponents";
import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import AutoCarousel from "@/app/_components/ui-parts/AutoCarousel";
import { Artwork } from "@/app/_types/artworks";
import { Button } from "@/components/ui/button";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface ArtworkProps {
  artworks: Artwork[];
}

const Artworks = ({ artworks }: ArtworkProps) => {
  return (
    <SectionLayout
      id="artworks"
      title="ART WORKS"
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
          <Link href="/artworks">
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
      >
        <AutoCarousel delay={5000}>
          <CarouselContent className="p-8">
            {artworks.map((artwork, index) => (
              <CarouselItem className="sm:basis-1/3" key={index}>
                <Link href={`/artworks/${artwork.id}`} className="group">
                  <MotionDiv
                    className="relative w-full lg:h-96 sm:h-80 h-48 overflow-hidden lg:rounded-l-[6rem] lg:rounded-tr-[6rem] md:rounded-l-[5rem] md:rounded-tr-[5rem] rounded-l-[4rem] rounded-tr-[4rem]"
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    whileTap={{ scale: 0.9 }}
                    variants={{
                      visible: { opacity: 1, scale: 1 },
                      hidden: { opacity: 0, scale: 0 },
                    }}
                  >
                    <p className="absolute z-50 bg-white rounded-l-[6rem] rounded-tr-[6rem] px-8 py-4 bottom-4 right-4 text-xl opacity-0 group-hover:opacity-100 duration-300">
                      {artwork.title}
                    </p>
                    <div className="w-full h-full">
                      <NextImage src={artwork.image[0]} alt="image" />
                    </div>
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

export default Artworks;
