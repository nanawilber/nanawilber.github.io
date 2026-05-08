import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Tour & Events",
  description: "Check out upcoming tour dates and live performances by Brapurple. See him live in Takoradi, Accra, and across Ghana.",
  keywords: ["Brapurple Tour", "Brapurple Live", "Takoradi Events", "Ghana Music Events", "Brapurple Concerts"],
};

export default function TourLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavSection />
      {children}
      <Footer />
    </>
  );
}
