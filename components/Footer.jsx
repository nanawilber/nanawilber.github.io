// "use client";

const Footer = () => {
  return (
    <div className="h-16 bg-secondary flex justify-between items-center">
      <footer className="container mx-auto px-4 ">
        <span>All rights reserved. &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default Footer;
