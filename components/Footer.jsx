// "use client";

import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-16 bg-secondary flex justify-between items-center">
      <footer className="container mx-auto px-4 flex justify-between items-center">
        <span>All rights reserved. &copy; {new Date().getFullYear()}</span>
        <Link href="https://uniiktheo.tech" target="_blank">
          Powered by UniikTheo
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
