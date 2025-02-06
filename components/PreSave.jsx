"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const PreSave = () => {
  const handleClick = () => {
    window.open("https://share.amuse.io/track/brapurple-thanksgiving-pt2");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/images/ARTWORK-THANKSGIVING.jpg"
        width={300}
        height={300}
        alt="presave"
        className="object-contain hover:scale-105 rounded-lg shadow-lg"
      />
      <Button onClick={handleClick}>Pre-Save</Button>
    </div>
  );
};

export default PreSave;
