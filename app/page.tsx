import { Header } from "@/components/Header";
import { FloatingContact } from "@/components/FloatingContact";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LogoMarquee } from "@/components/LogoMarquee";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Products } from "@/components/sections/Products";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { Strengths } from "@/components/sections/Strengths";
import { Partners } from "@/components/sections/Partners";
import { About } from "@/components/sections/About";
import { Founder } from "@/components/sections/Founder";
import { Quote } from "@/components/sections/Quote";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <LogoMarquee />
        <Products />
        <GlobalReach />
        <Strengths />
        <Partners />
        <About />
        <Founder />
        <Quote />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
