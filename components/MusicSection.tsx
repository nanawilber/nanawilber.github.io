import Link from "next/link";
import React from "react";
import { getSocialLinks } from "@/lib/supabase";

const MusicSection = async () => {
  let socialLinks: any[] | null = [];

  try {
    socialLinks = await getSocialLinks();
  } catch (error) {
    console.error("Error fetching social links:", error);
  }

  // Use fetched links or empty array if error
  const allLinks = socialLinks || [];
  // Filter out links that don't have an icon_url (these are likely social profile links like FB/Twitter which belong in the Socials component)
  const links = allLinks.filter((link) => link.icon_url);

  return (
    <section id="music" className="container p-4 md:px-8">
      <div className="content mt-16">
        <h2 className="tracking-widest uppercase font-bold text-2xl mb-6">
          My <span className="text-primary">Music</span>
        </h2>
        <p>Checkout my music on all streaming platforms</p>
        <div className="flex flex-wrap gap-4 md:gap-6 pt-4">
          {links.map((platform) => (
            <Link
              href={platform.platform_url}
              key={platform.id}
              className="w-12 h-12"
              target="_blank"
            >
              <img
                src={platform.icon_url}
                alt={platform.platform_name}
                className={`w-full h-full object-contain ${
                  platform.platform_name.toLowerCase().includes("tidal") ||
                  platform.platform_name.toLowerCase().includes("amazon")
                    ? "bg-white rounded-md p-1"
                    : ""
                }`}
              />
            </Link>
          ))}
          {links.length === 0 && (
            <p className="text-muted-foreground italic">Links coming soon...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
