import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import AboutSection from "../../components/AboutSection";
import MusicSection from "../../components/MusicSection";
import ContactSection from "../../components/ContactSection";

const EpkPage = () => (
  <main className="">
    <Navbar />
    <div className="container min-h-[calc(100vh-65px)] mx-auto flex flex-col mb-12">
      <HeroSection variant="epk" />
      <AboutSection />
      <MusicSection />
      <ContactSection />
    </div>
  </main>
);

export default EpkPage;
