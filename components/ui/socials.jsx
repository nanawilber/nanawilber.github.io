import Link from "next/link";

import Facebook from "./../icons/Facebook";
import Instagram from "./../icons/Instagram";
import Snapchat from "./../icons/Snapchat";
import Tiktok from "./../icons/Tiktok";
import X from "./../icons/X";
import Youtube from "./../icons/Youtube";

const iconStyles =
  "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px] stroke-primary hover:stroke-white";
const iconStyles2 =
  "w-[18px] h-[18px] lg:w-[24px] lg:h-[24px] fill-primary hover:fill-white";

const socialLinks = [
  {
    name: "x-fka-twitter",
    link: "https://x.com/bra_purple",
    icon: <X className={iconStyles2} />,
  },
  {
    name: "instagram",
    link: "https://instagram.com/brapurple",
    icon: <Instagram className={iconStyles} />,
  },
  {
    name: "facebook",
    link: "https://facebook.com/brapurple",
    icon: <Facebook className={iconStyles} />,
  },
  {
    name: "snapchat",
    link: "https://www.snapchat.com/add/brapurple?share_id=YuZhqOsbXP8&locale=en-US-u-mu-celsius",
    icon: <Snapchat className={iconStyles2} />,
  },
  {
    name: "tiktok",
    link: "https://tiktok.com/@bra_purple",
    icon: <Tiktok className={iconStyles2} />,
  },
  {
    name: "youtube",
    link: "https://youtube.com/@Brapurple",
    icon: <Youtube className={iconStyles} />,
  },
];

const Socials = () => {
  return (
    <div className="flex gap-4 lg:gap-6">
      {socialLinks.map((item, index) => (
        <Link key={index} href={item.link} target="_blank">
          <div className="h-[28px] w-[28px] lg:w-[40px] lg:h-[40px] flex items-center justify-center border rounded-full border-primary hover:bg-primary/50 !hover:fill-white transition duration-300 ease-in-out">
            {item.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
