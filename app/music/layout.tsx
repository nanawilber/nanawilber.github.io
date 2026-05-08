import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Music",
  description: "Explore the discography of Brapurple, featuring Afrobeats, Highlife, and Soulful Raps from Takoradi, Ghana. Stream latest singles and covers.",
  keywords: ["Brapurple Music", "Takoradi Music", "Ghanaian Afrobeats", "Highlife Ghana", "Brapurple Songs"],
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
