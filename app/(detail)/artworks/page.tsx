import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import { Artwork } from "@/app/_types/artworks";
import { artworkDatabaseId } from "@/app/page";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { n2artwork } from "@/lib/notion/nameConvert";
import { getDatabase } from "@/lib/notion/notion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArtWorksPage = async () => {
  const artworkDatabase = (await getDatabase(artworkDatabaseId)) as any;
  const artworks: Artwork[] = await Promise.all(
    artworkDatabase.map(async (artwork: any) => await n2artwork(artwork))
  );

  return (
    <div className="my-32 max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 container">
      {artworks.map((artwork, index) => (
        <Link href={`/artworks/${artwork.id}`} key={index}>
          <AspectRatio ratio={1 / 1}>
            <Image
              src={artwork.image[0]}
              alt={artwork.description}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </Link>
      ))}
    </div>
  );
};

export default ArtWorksPage;
