import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "./ui/socials";
import { getHeroContent } from "@/lib/supabase";
import { NavLinks } from "../lib/data";

const HeroSection = async ({
  variant = "home",
}: {
  variant?: "home" | "epk";
}) => {
  let heroContent;

  try {
    heroContent = await getHeroContent();
  } catch (error) {
    console.error("Error fetching hero content:", error);
  }

  // Default fallback content if db is empty or error occurs
  const content = heroContent || {
    heading_line1: "Meet",
    heading_line2: "The Dynamic Voice from Takoradi",
    subheading:
      "Blending soulful melodies and eclectic raps, Brapurple is redefining Ghanaian music. With a passion for creativity and a mission to put Takoradi on the global music map, he invites you to explore his world of sound and storytelling.",
    hero_image_url: null,
  };

  const heroImage = content.hero_image_url || "/images/Brapurple.jpg";

  return (
    <section
      id="home"
      className={`container px-4 sm:px-0 w-full ${variant === "home" ? "min-h-screen" : "my-8"} flex flex-col justify-center`}
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

        {variant === "home" ? (
          // Home Variant: Nav Links
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
        ) : (
          // EPK Variant: Text Content
          <div className="CTA py-6 md:py-0 h-full flex flex-col justify-center gap-8 text-center md:text-left">
            <div className="">
              <div className="heading flex flex-col text-3xl font-bold">
                <span>
                  {content.heading_line1}{" "}
                  <span className="text-primary">Brapurple</span>,
                </span>
                <span>{content.heading_line2}</span>
              </div>
              <div className="sub-heading mt-6 text-muted-foreground whitespace-pre-wrap">
                <span>{content.subheading}</span>
              </div>
            </div>
            <div className="flex justify-center md:justify-start">
              <Socials />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
