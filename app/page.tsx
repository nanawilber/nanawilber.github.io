import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import MusicSection from "@/components/MusicSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center ">
      <HeroSection />
      <AboutSection />
      <MusicSection />
      <ContactSection />
    </div>
  );
}
