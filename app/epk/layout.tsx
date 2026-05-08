import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Electronic Press Kit (EPK)",
  description: "Official Electronic Press Kit for Brapurple. Biography, music, and contact information for bookings and media inquiries.",
  keywords: ["Brapurple EPK", "Brapurple Biography", "Brapurple Bookings", "Takoradi Artist Press Kit"],
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
