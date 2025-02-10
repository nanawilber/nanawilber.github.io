import React from "react";
import MusicComponent from "../../components/ui/music";

const musicDetails = [
  {
    title: "Thanksgiving PT2 (Feat. Hitz Magik)",
    artwork: "/images/ARTWORK-THANKSGIVING.jpg",
    listenUrl: "https://open.spotify.com",
    watchUrl: "https://youtube.com/@brapurple",
  },
  {
    title: "Thanksgiving PT2 (Feat. Hitz Magik)",
    artwork: "/images/ARTWORK-THANKSGIVING.jpg",
    listenUrl: "https://open.spotify.com",
    watchUrl: "https://youtube.com/@brapurple",
  },
  {
    title: "Thanksgiving PT2 (Feat. Hitz Magik)",
    artwork: "/images/ARTWORK-THANKSGIVING.jpg",
    listenUrl: "https://open.spotify.com",
    watchUrl: "https://youtube.com/@brapurple",
  },
  {
    title: "Thanksgiving PT2 (Feat. Hitz Magik)",
    artwork: "/images/ARTWORK-THANKSGIVING.jpg",
    listenUrl: "https://open.spotify.com",
    watchUrl: "https://youtube.com/@brapurple",
  },
];

const MusicPage = () => {
  return (
    <main className="flex flex-col w-full min-h-screen items-center justify-center border ">
      <div className="container mx-auto px-4 mt-16">
        <div className="grid xl:grid-cols-2 my-12 gap-4 md:gap-8 items-center relative">
          {musicDetails.map((music, index) => (
            <MusicComponent
              key={index}
              title={music.title}
              artwork={music.artwork}
              listenUrl={music.listenUrl}
              watchUrl={music.watchUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MusicPage;
