import Image from "next/image";
import Link from "next/link";
import Socials from "../components/ui/socials";
import { NavLinks } from "../lib/data";

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
                href={item.path}
                className={`text-center hover:text-primary ${
                  item.name === "home" ? "text-primary" : "hover:scale-110"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
