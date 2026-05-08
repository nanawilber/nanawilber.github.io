import React from "react";
import MusicComponent from "../../components/ui/music";
import { getReleases, Release } from "@/lib/supabase";

const MusicPage = async () => {
  let releases: Release[] = [];

  try {
    releases = await getReleases();
  } catch (error) {
    console.error("Error fetching releases:", error);
  }

  return (
    <main className="flex flex-col w-full min-h-screen items-center justify-center border ">
      <div className="container mx-auto px-4 mt-16">
        <div className="grid lg:grid-cols-2 my-12 gap-8 relative">
          {releases.map((music, index) => (
            <MusicComponent
              key={music.id || index}
              title={music.title}
              artwork={music.artwork_url}
              listenUrl={music.listen_url}
              watchUrl={music.watch_url}
              slug={music.id} // Or use a slug if available, but Release doesn't have it in the interface
              type="track"
            />
          ))}
          {(!releases || releases.length === 0) && (
            <div className="col-span-2 text-center text-muted-foreground">
              No music releases found. Add some in the admin dashboard!
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MusicPage;
