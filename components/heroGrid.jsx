// "use client";

import Image from "next/image";
import Link from "next/link";

import Facebook from "./icons/Facebook";
import Instagram from "./icons/Instagram";
import Snapchat from "./icons/Snapchat";
import Tiktok from "./icons/Tiktok";
import X from "./icons/X";
import Youtube from "./icons/Youtube";

const NavLinks = [
  { name: "Music", link: "/music", slug: "music" },
  { name: "Tour", link: "/tour", slug: "tour" },
  { name: "About", link: "/epk", slug: "epk" },
  { name: "Exclusive", link: "/exclusive", slug: "exclusive" },
];

const iconStyles = "w-[24px] h-[24px] stroke-primary hover:stroke-white";
const iconStyles2 = "w-[24px] h-[24px] fill-primary hover:fill-white";

const socialLinks = [
  {
    name: "facebook",
    link: "https://facebook.com/brapurple",
    icon: <X className={iconStyles2} />,
  },
  {
    name: "facebook",
    link: "https://facebook.com/brapurple",
    icon: <Instagram className={iconStyles} />,
  },
  {
    name: "facebook",
    link: "https://facebook.com/brapurple",
    icon: <Facebook className={iconStyles} />,
  },
  {
    name: "facebook",
    link: "https://facebook.com/brapurple",
    icon: <Snapchat className={iconStyles2} />,
  },
  {
    name: "facebook",
    link: "https://facebook.com/brapurple",
    icon: <Tiktok className={iconStyles2} />,
  },
  {
    name: "facebook",
    link: "https://facebook.com/brapurple",
    icon: <Youtube className={iconStyles} />,
  },
];

const HeroGrid = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center relative">
        <div className="w-[calc(100%-160px)] md:w-[calc(100%-80px)] lg:w-[calc(100%-160px)] aspect-square mx-auto border-8 border-primary flex rounded-full transition duration-300 ease-in-out transform hover:scale-105  overflow-hidden">
          <Image
            src="/images/Brapurple.jpg"
            alt="Brapurple"
            width="1080"
            height="1350"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col h-full w-full items-center justify-evenly gap-8 py-6 md:py-0">
          <div className="flex flex-col gap-6 lowercase font-medium">
            {NavLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-center hover:text-primary`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-6">
            {socialLinks.map((item, index) => (
              <Link key={index} href={item.link}>
                <div className="h-[40px] w-[40px] flex items-center justify-center border rounded-full border-primary hover:bg-primary/50 !hover:fill-white transition duration-300 ease-in-out">
                  {item.icon}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
