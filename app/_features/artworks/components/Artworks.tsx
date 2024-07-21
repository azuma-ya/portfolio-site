import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Artwork } from "@/app/_types/artworks";
import SectionLayout from "@/components/layouts/section/SectionLayout";
import {
  MotionButton,
  MotionDiv,
} from "@/components/ui-elements/Motion/MotionComponents";
import { NextImage } from "@/components/ui-elements/iamge/NextImage";
import AutoCarousel from "@/components/ui-parts/AutoCarousel";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
          className="size-14 border-primary"
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
        viewport={{ once: true }}
      >
        <AutoCarousel delay={5000}>
          <CarouselContent className="p-8">
            {artworks.map((artwork, index) => (
              <CarouselItem className="sm:basis-1/3" key={index}>
                <Link href={`/artworks/${artwork.id}`} className="group">
                  <MotionDiv
                    className="relative h-48 w-full overflow-hidden rounded-l-[4rem] rounded-tr-[4rem] sm:h-80 md:rounded-l-[5rem] md:rounded-tr-[5rem] lg:h-96 lg:rounded-l-[6rem] lg:rounded-tr-[6rem]"
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    whileTap={{ scale: 0.9 }}
                    variants={{
                      visible: { opacity: 1, scale: 1 },
                      hidden: { opacity: 0, scale: 0 },
                    }}
                    viewport={{ once: true }}
                  >
                    <p className="absolute bottom-4 right-4 z-50 rounded-l-[6rem] rounded-tr-[6rem] bg-white px-8 py-4 text-xl opacity-0 duration-300 group-hover:opacity-100">
                      {artwork.title}
                    </p>
                    <div className="size-full">
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
