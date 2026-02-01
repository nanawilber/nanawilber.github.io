import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import React from "react";

interface MusicComponentProps {
  title: string;
  artwork: string;
  listenUrl: string;
  watchUrl: string;
}

const MusicComponent = ({
  title,
  artwork,
  listenUrl,
  watchUrl,
}: MusicComponentProps) => {
  return (
    <div className="w-full h-full xl:max-w-[500px] flex flex-col sm:flex-row place-items-center my-6 gap-6">
      <div className="aspect-square !w-[200px] !h-[200px] relative">
        <Image
          src={artwork}
          alt={title}
          fill
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="text uppercase flex flex-col gap-4 justify-evenly md:items-start w-full">
        <h3 className="text-lg md:text-xl md:text-start text-center font-semibold tracking-tight text-balance">
          {title}
        </h3>
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
