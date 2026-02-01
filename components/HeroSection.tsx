import Image from "next/image";
import Link from "next/link";
import React from "react";
import Socials from "./ui/socials";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="container px-4 sm:px-0 w-full min-h-screen flex flex-col justify-center"
    >
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center relative">
        <div className="w-[calc(100%-160px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-160px)] aspect-square mx-auto mt-16 border-8 border-primary flex rounded-full transition duration-300 ease-in-out transform hover:scale-105  overflow-hidden">
          <Image
            src="/images/Brapurple.jpg"
            alt="Brapurple"
            width="1080"
            height="1350"
            className="object-cover"
          />
        </div>
        <div className="CTA py-6 md:py-0 h-full flex flex-col justify-evenly">
          <div className="">
            <div className="heading flex flex-col text-3xl ">
              <span>
                Meet <span className="text-primary">Brapurple</span>,
              </span>
              <span>The Dynamic Voice from Takoradi</span>
            </div>
            <div className="sub-heading mt-6">
              <span>
                Blending soulful melodies and eclectic raps, Brapurple is
                redefining Ghanaian music. With a passion for creativity and a
                mission to put Takoradi on the global music map, he invites you
                to explore his world of sound and storytelling.
              </span>
            </div>
          </div>
          <Socials />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
