"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { musicDetails } from "@/lib/data";

const MoreMusic = ({ currentSlug }: { currentSlug: string }) => {
  // Get 3 random tracks that are not the current one
  const otherMusic = musicDetails
    .filter((m) => m.slug !== currentSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="mt-24 border-t border-border pt-12">
      <div className="flex justify-between items-baseline mb-8 px-2">
        <h2 className="text-2xl font-bold">More Music</h2>
        <Link
          href="/music"
          className="text-primary hover:underline text-sm font-medium uppercase tracking-wider"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {otherMusic.map((item) => (
          <Link
            key={item.slug}
            href={`/track/${item.slug}`}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
              <Image
                src={item.artwork}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm">Single</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreMusic;
