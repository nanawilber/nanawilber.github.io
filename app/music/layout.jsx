import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Brapurple's Music",
  description: "Brapurple Music",
};

export default function MusicLayout({ children }) {
  return (
    <>
      <NavSection />
      {children}
      <Footer />
    </>
  );
}
