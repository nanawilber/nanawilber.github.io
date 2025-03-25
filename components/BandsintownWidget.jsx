"use client";

import { useEffect } from "react";

export default function BandsintownWidget({ artistName }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.bandsintown.com/main.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="bit-widget-initializer"
      data-artist-name={artistName}
      data-font="Poppins"
      data-auto-style="false"
      data-text-color="#333333"
      data-link-color="#8C3FE6"
      data-background-color="rgba(0,0,0,0)"
      data-display-local-dates="false"
      data-display-past-dates="true"
      data-display-limit="15"
      data-display-start-time="false"
      data-link-text-color="#FFFFFF"
      data-display-lineup="false"
      data-display-play-my-city="true"
    />
  );
}
