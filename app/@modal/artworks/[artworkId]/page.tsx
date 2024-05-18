import { NextImage } from "@/app/_components/ui-elements/iamge/NextImage";
import { Artwork } from "@/app/_types/artworks";
import { artworkDatabaseId } from "@/app/page";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { getDatabase, getPage } from "@/lib/notion/notion";
import React from "react";

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
  const artwork: Artwork = {
    id: artworkData.id,
    title: artworkData.properties.Title.title[0]?.plain_text,
    description:
      artworkData.properties.Description.rich_text[0]?.plain_text ?? "null",
    image: artworkData.properties.Image.files.map((file: any) => file.file.url),
    createdAt: new Date(artworkData.properties.CreatedAt.date.start),
  };

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
            <p className="">{artwork.createdAt.toLocaleDateString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;
