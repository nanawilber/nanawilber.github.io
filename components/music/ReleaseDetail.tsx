"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { streamPlatforms } from "@/lib/data";
import { Play } from "lucide-react";
// import MoreMusic from "./MoreMusic";
import MoreMusic from "@/components/music/MoreMusic";

interface ReleaseDetailProps {
  release: {
    title: string;
    slug: string;
    type: string;
    artwork: string;
    listenUrl: string;
    watchUrl: string;
    releaseDate?: string;
    description?: string;
    tiktokUrl?: string;
    spotifyUrl?: string;
    youtubeMusicUrl?: string;
    tidalUrl?: string;
    lyricsUrl?: string;
  };
}

const ReleaseDetail = ({ release }: ReleaseDetailProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          {/* Artwork */}
          <div className="w-full max-w-[500px] aspect-square relative shadow-2xl rounded-xl overflow-hidden shrink-0">
            <Image
              src={release.artwork}
              alt={release.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 text-center lg:text-left w-full">
            <div className="inline-block mx-auto lg:mx-0 px-3 py-1 text-sm font-medium tracking-wider uppercase border border-primary text-primary rounded-full w-fit">
              {release.type || "Single"}
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-balance">
              {release.title}
            </h1>

            <p className="text-xl text-muted-foreground font-medium">
              By Brapurple
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {/* Specific Promo Links */}
                {release.spotifyUrl && (
                  <Button
                    size="lg"
                    className="rounded-full px-8 gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white border-none"
                    asChild
                  >
                    <Link href={release.spotifyUrl} target="_blank">
                      Spotify
                    </Link>
                  </Button>
                )}
                {release.tidalUrl && (
                  <Button
                    size="lg"
                    className="rounded-full px-8 gap-2 bg-black hover:bg-black/90 text-white border-none"
                    asChild
                  >
                    <Link href={release.tidalUrl} target="_blank">
                      Tidal
                    </Link>
                  </Button>
                )}
                {release.youtubeMusicUrl && (
                  <Button
                    size="lg"
                    className="rounded-full px-8 gap-2 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white border-none"
                    asChild
                  >
                    <Link href={release.youtubeMusicUrl} target="_blank">
                      YouTube Music
                    </Link>
                  </Button>
                )}
                {release.tiktokUrl && (
                  <Button
                    size="lg"
                    className="rounded-full px-8 gap-2 bg-black hover:bg-black/90 text-white border-none"
                    asChild
                  >
                    <Link href={release.tiktokUrl} target="_blank">
                      TikTok
                    </Link>
                  </Button>
                )}

                {/* Default Listen Button (fallback/additional) */}
                <Button size="lg" className="rounded-full px-8 gap-2" asChild>
                  <Link href={release.listenUrl} target="_blank">
                    {/* <Play className="w-4 h-4 fill-current" /> */}
                    Audiomack
                  </Link>
                </Button>

                {release.lyricsUrl && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8"
                    asChild
                  >
                    <Link href={release.lyricsUrl} target="_blank">
                      Lyrics
                    </Link>
                  </Button>
                )}

                {release.watchUrl && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8"
                    asChild
                  >
                    <Link href={release.watchUrl} target="_blank">
                      Watch Video
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Streaming Links Row */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
                Also Available on
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 opacity-70 hover:opacity-100 transition-opacity duration-300">
                {streamPlatforms.map((platform) => (
                  <Link
                    key={platform.name}
                    href={platform.link}
                    target="_blank"
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <div className="relative w-8 h-8 dark:invert">
                      <Image
                        src={platform.imageSrc}
                        alt={platform.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Embed Section (Commented Out for Promo) */}
        {/* {release.watchUrl && (
          <div className="mt-24 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Music Video</h2>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeID(release.watchUrl)}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )} */}

        <MoreMusic currentSlug={release.slug} />
      </div>
    </div>
  );
};

// Helper to extract ID from standard YT urls
function getYouTubeID(url: string) {
  if (url.includes("youtu.be")) {
    return url.split("/").pop();
  } else if (url.includes("youtube.com/watch")) {
    const urlParams = new URL(url).searchParams;
    return urlParams.get("v");
  } else if (url.includes("song.link")) {
    // fallback or handle song.link if it redirects to YT,
    // but for now we assume watchUrl is YT or we might need to change it on data level
    // Actually many watchUrls in data.js are just the channel link or song.link
    // We might need to be careful here.
    return ""; // Placeholder
  }
  return "";
}

export default ReleaseDetail;
