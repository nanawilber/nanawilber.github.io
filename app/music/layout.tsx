import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Brapurple's Music",
  description: "Brapurple Music",
};

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavSection />
      {children}
      <Footer />
    </>
  );
}
