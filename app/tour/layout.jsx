import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Brapurple Tour and Events",
  description: "Brapurple Upcoming Tours",
};

export default function TourLayout({ children }) {
  return (
    <>
      <NavSection />
      {children}
      <Footer />
    </>
  );
}
