import { Header } from "@/components/Header";
import { FloatingContact } from "@/components/FloatingContact";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Products } from "@/components/sections/Products";
import { GlobalReach } from "@/components/sections/GlobalReach";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Products />
        <GlobalReach />
      </main>
      <FloatingContact />
    </>
  );
}
