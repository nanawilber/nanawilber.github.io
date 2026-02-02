"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavLinks } from "@/lib/data";

const NavSection = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("home");
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(pathname.split("/")[1]);
    console.log(activeTab);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="dark:bg-black/50 backdrop-blur-sm w-full fixed top-0 z-50 lowercase">
      <div className="h-16 container mx-auto px-4 flex justify-between items-center relative">
        <Link
          href="/"
          className="max-h-14 hover:cursor-pointer hover:scale-105 dark:invert dark:filter dark:brightness-0 dark:contrast-100"
        >
          <Image
            src="/images/logo.png"
            alt="brapurple logo"
            width="41"
            height="40"
            className="object-fit"
          />
        </Link>
        <div className="hidden md:flex space-x-4 md:space-x-8 lg:space-x-12">
          {NavLinks.map((item, idx) => {
            return (
              <Link
                key={idx}
                href={item.path}
                className={`${
                  item.path === pathname ? "text-primary" : ""
                } hover:scale-105`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-20 right-8 bg-white dark:bg-black shadow rounded backdrop-blur-sm flex flex-col gap-2 p-6"
          >
            {NavLinks.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  href={item.path}
                  className={`${
                    item.path === pathname ? "text-primary" : ""
                  } hover:scale-105`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
        {/* Right Side: Exclusive Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button
            asChild
            className="hover:scale-105 bg-primary text-primary-foreground transform scale-90 md:scale-100"
          >
            <Link href="/exclusive">Get Exclusive</Link>
          </Button>

          <div
            onClick={toggleMenu}
            className="md:hidden text-primary cursor-pointer"
          >
            {menuOpen ? <X /> : <AlignJustify />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSection;
