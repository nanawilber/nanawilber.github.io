import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import React from "react";

interface MusicComponentProps {
  title: string;
  artwork: string;
  listenUrl: string;
  watchUrl: string;
  slug?: string;
  type?: string;
}

const MusicComponent = ({
  title,
  artwork,
  listenUrl,
  watchUrl,
  slug,
  type = "track",
}: MusicComponentProps) => {
  const detailUrl = slug ? `/${type}/${slug}` : null;

  return (
    <div className="w-full h-full xl:max-w-[500px] flex flex-col sm:flex-row place-items-center my-6 gap-6">
      <div className="aspect-square !w-[200px] !h-[200px] relative shrink-0 group">
        {detailUrl ? (
          <Link href={detailUrl} className="block w-full h-full">
            <Image
              src={artwork}
              alt={title}
              fill
              className="object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        ) : (
          <Image
            src={artwork}
            alt={title}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        )}
      </div>
      <div className="text uppercase flex flex-col gap-4 justify-evenly md:items-start w-full items-center">
        {detailUrl ? (
          <Link
            href={detailUrl}
            className="hover:text-primary transition-colors"
          >
            <h3 className="text-lg md:text-xl md:text-start text-center font-semibold tracking-tight text-balance">
              {title}
            </h3>
          </Link>
        ) : (
          <h3 className="text-lg md:text-xl md:text-start text-center font-semibold tracking-tight text-balance">
            {title}
          </h3>
        )}

        <div className="flex flex-col md:items-start items-center gap-4 text-lowercase">
          <Link href={listenUrl} target="_blank">
            <Button className="px-12" variant={"secondary"}>
              Listen
            </Button>
          </Link>
          <Link href={watchUrl} target="_blank">
            <Button className="px-12">Watch</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MusicComponent;
