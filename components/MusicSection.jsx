import Link from "next/link";
import React from "react";
import { streamPlatforms } from "../lib/data";

const MusicSection = () => {
  return (
    <section id="music" className="container p-4 md:px-8">
      <div className="content mt-16">
        <h2 className="tracking-widest uppercase font-bold text-2xl mb-6">
          My <span className="text-primary">Music</span>
        </h2>
        <p>Checkout my music on all streaming platforms</p>
        <div className="flex flex-wrap gap-3 pt-4">
          {streamPlatforms.map((platform, index) => (
            <Link
              href={platform.link}
              key={index}
              className="w-12 h-12"
              target="_blank"
            >
              <img
                src={platform.imageSrc}
                alt={platform.name}
                className={`w-12 h-12 ${
                  platform.name === "tidal" || platform.name === "amazon"
                    ? "bg-white"
                    : ""
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
