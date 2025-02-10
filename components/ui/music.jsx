import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import React from "react";

const MusicComponent = ({ title, artwork, listenUrl, watchUrl }) => {
  return (
    <div className="w-full h-full xl:max-w-[500px] flex gap-6 items-center my-8">
      <div className="aspect-square !w-[200px] !h-[200px] relative">
        <Image
          src={artwork}
          alt={title}
          fill="responsive"
          //   width={200}
          //   height={200}
          className="object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="text uppercase flex flex-col gap-4 justify-evenly">
        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-balance">
          {title}
        </h3>
        <div className="flex flex-col gap-4">
          <Link href={listenUrl}>
            <Button className="px-12" variant={"secondary"}>
              Listen
            </Button>
          </Link>
          <Link href={watchUrl}>
            <Button className="px-12">Watch</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MusicComponent;
