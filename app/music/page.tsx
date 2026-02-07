import React from "react";
import MusicComponent from "../../components/ui/music";
import { musicDetails } from "../../lib/data";

const MusicPage = () => {
  return (
    <main className="flex flex-col w-full min-h-screen items-center justify-center border ">
      <div className="container mx-auto px-4 mt-16">
        <div className="grid lg:grid-cols-2 my-12 gap-8 relative">
          {musicDetails.map((music, index) => (
            <MusicComponent
              key={index}
              title={music.title}
              artwork={music.artwork}
              listenUrl={music.listenUrl}
              watchUrl={music.watchUrl}
              slug={music.slug}
              type={music.type}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MusicPage;
