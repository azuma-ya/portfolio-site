import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import { Artwork } from "@/app/_types/artworks";
import { artworkDatabaseId } from "@/app/page";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { n2artwork } from "@/lib/notion/nameConvert";
import { getDatabase, getPage } from "@/lib/notion/notion";
import React from "react";

export const revalidate = 60;

export async function generateStaticParams() {
  const artworkDatabase = await getDatabase(artworkDatabaseId);
  return artworkDatabase.map((artwork) => ({
    artworkId: artwork.id,
  }));
}

export interface ArtworkModalProps {
  params: {
    artworkId: string;
  };
}

const ArtworkModal = async ({ params }: ArtworkModalProps) => {
  const artworkData = (await getPage(params.artworkId)) as any;
  const artwork: Artwork = n2artwork(artworkData);

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-4xl h-2/3 flex flex-col">
        <DialogHeader className="text-2xl font-semibold ms-8 my-4">
          {artwork.title}
        </DialogHeader>
        <div className="grow flex flex-col">
          <div className="grow">
            <NextImage src={artwork.image[0]} alt={artwork.title} />
          </div>
          <div className="px-8 py-2 flex justify-between">
            <p className="">{artwork.description}</p>
            <p className="">{artwork.createdAt.toLocaleDateString("ja-JP")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;
