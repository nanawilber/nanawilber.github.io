import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Brapurple Tour and Events",
  description: "Brapurple Upcoming Tours",
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
