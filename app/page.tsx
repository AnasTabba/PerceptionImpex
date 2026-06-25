import { Header } from "@/components/Header";
import { FloatingContact } from "@/components/FloatingContact";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Products } from "@/components/sections/Products";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { Strengths } from "@/components/sections/Strengths";
import { Partners } from "@/components/sections/Partners";
import { About } from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Products />
        <GlobalReach />
        <Strengths />
        <Partners />
        <About />
      </main>
      <FloatingContact />
    </>
  );
}
