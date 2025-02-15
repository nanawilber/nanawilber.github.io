import Link from "next/link";

import Facebook from "./../icons/Facebook";
import Instagram from "./../icons/Instagram";
import Snapchat from "./../icons/Snapchat";
import Tiktok from "./../icons/Tiktok";
import X from "./../icons/X";
import Youtube from "./../icons/Youtube";

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

const Socials = () => {
  return (
    <div className="flex gap-6">
      {socialLinks.map((item, index) => (
        <Link key={index} href={item.link}>
          <div className="h-[40px] w-[40px] flex items-center justify-center border rounded-full border-primary hover:bg-primary/50 !hover:fill-white transition duration-300 ease-in-out">
            {item.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
