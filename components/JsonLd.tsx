import React from "react";

export default function JsonLd() {
  const musicGroupSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Brapurple",
    "url": "https://brapurple.com",
    "description": "Brapurple is a dynamic musical artist from Takoradi, Ghana, blending soulful melodies and eclectic raps.",
    "genre": ["Afrobeats", "Highlife", "Soulful Rap"],
    "location": {
      "@type": "Place",
      "name": "Takoradi, Ghana",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Takoradi",
        "addressRegion": "Western Region",
        "addressCountry": "GH"
      }
    },
    "sameAs": [
      "https://open.spotify.com/artist/3DAO5GWjPhL6J9HhtjQnw4",
      "https://music.apple.com/gh/artist/brapurple/1161651000",
      "https://audiomack.com/brapurple",
      "https://www.youtube.com/@Brapurple"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupSchema) }}
    />
  );
}
