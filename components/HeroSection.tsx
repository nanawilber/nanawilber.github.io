import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "./ui/socials";
import { getHeroContent } from "@/lib/supabase";
import { NavLinks } from "../lib/data";

const HeroSection = async () => {
  let heroContent;

  try {
    heroContent = await getHeroContent();
  } catch (error) {
    console.error("Error fetching hero content:", error);
  }

  const heroImage = heroContent?.hero_image_url || "/images/Brapurple.jpg";

  return (
    <section
      id="home"
      className="container px-4 sm:px-0 w-full min-h-screen flex flex-col justify-center"
    >
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center relative">
        <div className="w-[calc(100%-160px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-160px)] aspect-square mx-auto mt-16 border-8 border-primary flex rounded-full transition duration-300 ease-in-out transform hover:scale-105  overflow-hidden">
          <Image
            src={heroImage}
            alt="Brapurple"
            width={1080}
            height={1350}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="flex flex-col h-full w-full items-center justify-evenly gap-8 py-6 md:py-0">
          <div className="flex flex-col gap-6 lowercase font-medium text-lg">
            {NavLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-center hover:text-primary transition-colors ${
                  item.name.toLowerCase() === "home"
                    ? "text-primary"
                    : "hover:scale-110 transform duration-200"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Socials />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
