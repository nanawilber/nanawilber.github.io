import Link from "next/link";
import React from "react";

const MusicSection = () => {
  return (
    <section id="music" className="container p-4 md:px-8">
      <div className="content mt-16">
        <h2 className="tracking-widest uppercase font-bold text-2xl mb-6">
          My <span className="text-primary">Music</span>
        </h2>
        <p>Checkout my music on all streaming platforms</p>
        <div className="flex gap-3 pt-4">
          <Link
            href="https://music.apple.com/gh/artist/brapurple/1161651000"
            className="socials text-primary"
            target="_blank"
          >
            <img
              src="/images/apple-music.svg"
              alt="Apple Music"
              className="w-12 h-12"
            />
          </Link>
          <Link
            href="https://open.spotify.com/artist/3DAO5GWjPhL6J9HhtjQnw4"
            className="socials text-primary"
            target="_blank"
          >
            <img
              src="/images/spotify-green.png"
              alt="Spotify Music"
              className="w-12 h-12"
            />
          </Link>
          <Link
            href="https://www.boomplay.com/artists/7051155"
            className="socials text-primary"
            target="_blank"
          >
            <img
              src="/images/boomplay.svg"
              alt="Spotify Music"
              className="w-12 h-12"
            />
          </Link>
          <Link
            href="https://tidal.com/"
            className="socials text-primary"
            target="_blank"
          >
            <img
              src="/images/tidal.svg"
              alt="Spotify Music"
              className="w-12 h-12 bg-white"
            />
          </Link>
          <Link
            href="https://www.deezer.com/"
            className="socials text-primary"
            target="_blank"
          >
            <img
              src="/images/deezer.svg"
              alt="Spotify Music"
              className="w-12 h-12"
            />
          </Link>
          <Link
            href="https://music.amazon.com/artists/B01LWRQJL3/brapurple"
            className="socials text-primary"
            target="_blank"
          >
            <img
              src="/images/amazon-music.svg"
              alt="Spotify Music"
              className="w-12 h-12 bg-white"
            />
          </Link>
          <Link
            href="https://audiomack.com/brapurple"
            className="socials text-primary"
            target="_blank"
          >
            <img
              src="/images/audiomack.svg"
              alt="Spotify Music"
              className="w-12 h-12"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
