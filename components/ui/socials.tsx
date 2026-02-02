import Link from "next/link";
import { ReactElement } from "react";
import { getSocialLinks } from "@/lib/supabase";

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

const getIconForPlatform = (platformName: string): ReactElement | null => {
  const name = platformName.toLowerCase();
  if (name.includes("facebook")) return <Facebook className={iconStyles} />;
  if (name.includes("instagram")) return <Instagram className={iconStyles} />;
  if (name.includes("snapchat")) return <Snapchat className={iconStyles2} />;
  if (name.includes("tiktok")) return <Tiktok className={iconStyles2} />;
  if (name.includes("twitter") || name.includes("x"))
    return <X className={iconStyles2} />;
  if (name.includes("youtube")) return <Youtube className={iconStyles} />;
  return null;
};

const Socials = async () => {
  let socialLinks = [];

  try {
    socialLinks = await getSocialLinks();
  } catch (error) {
    console.error("Error fetching social links:", error);
  }

  // If no links in DB, returns empty or null
  if (!socialLinks || socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4 lg:gap-6">
      {socialLinks.map((item) => {
        const icon = getIconForPlatform(item.platform_name);
        if (!icon) return null;

        return (
          <Link key={item.id} href={item.platform_url} target="_blank">
            <div className="h-[28px] w-[28px] lg:w-[40px] lg:h-[40px] flex items-center justify-center border rounded-full border-primary hover:bg-primary/50 !hover:fill-white transition duration-300 ease-in-out">
              {icon}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
