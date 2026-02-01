import NavSection from "../../components/NavSection";
import Footer from "../../components/Footer";
import { ReactNode } from "react";

interface ExclusiveLayoutProps {
  children: ReactNode;
}

export default function ExclusiveLayout({ children }: ExclusiveLayoutProps) {
  return (
    <>
      <NavSection />
      {children}
      <Footer />
    </>
  );
}
