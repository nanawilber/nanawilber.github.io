import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/lib/data";

const Navbar = () => {
  return (
    <nav className="w-full py-4 bg-transparent mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src="/images/logo.png"
              alt="Brapurple Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-sm hidden md:block tracking-widest">
            brapurple
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="flex gap-6 md:gap-8 items-center lowercase font-medium">
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:text-primary transition-colors ${link.name.toLowerCase() === "about" ? "text-primary" : ""}`} // Highlight current page? Or simple hover.
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
