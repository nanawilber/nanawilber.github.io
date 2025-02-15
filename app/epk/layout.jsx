import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Brapurple EPK",
  description: "Brapurple's EPK",
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
