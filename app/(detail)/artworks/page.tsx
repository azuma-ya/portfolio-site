import Image from "next/image";
import Link from "next/link";

import { Artwork } from "@/app/_types/artworks";
import { artworkDatabaseId } from "@/app/page";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { n2artwork } from "@/lib/notion/nameConvert";
import { getDatabase } from "@/lib/notion/notion";

const ArtWorksPage = async () => {
  const artworkDatabase = (await getDatabase(artworkDatabaseId)) as any;
  const artworks: Artwork[] = await Promise.all(
    artworkDatabase.map(async (artwork: any) => await n2artwork(artwork)),
  );

  return (
    <div className="container mx-auto my-32 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
