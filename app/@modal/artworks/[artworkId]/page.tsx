import { Artwork } from "@/app/_types/artworks";
import { artworkDatabaseId } from "@/app/page";
import { NextImage } from "@/components/ui-elements/iamge/NextImage";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { n2artwork } from "@/lib/notion/nameConvert";
import { getDatabase, getPage } from "@/lib/notion/notion";

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
  const artwork: Artwork = await n2artwork(artworkData);

  return (
    <Dialog defaultOpen>
      <DialogContent className="flex h-2/3 flex-col sm:max-w-4xl">
        <DialogHeader className="my-4 ms-8 text-2xl font-semibold">
          {artwork.title}
        </DialogHeader>
        <div className="flex grow flex-col">
          <div className="grow">
            <NextImage src={artwork.image[0]} alt={artwork.title} />
          </div>
          <div className="flex justify-between px-8 py-2">
            <p className="">{artwork.description}</p>
            <p className="">{artwork.createdAt.toLocaleDateString("ja-JP")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkModal;
