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
        <div className="grid lg:grid-cols-2 my-12 gap-8 relative">
          {musicDetails.map((music, index) => (
            // <div
            //   key={index}
            //   className="w-full border border-red-500 mb-8"
            // >
            <MusicComponent
              title={music.title}
              artwork={music.artwork}
              listenUrl={music.listenUrl}
              watchUrl={music.watchUrl}
            />
            // </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MusicPage;
