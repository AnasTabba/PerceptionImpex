import { Header } from "@/components/Header";
import { FloatingContact } from "@/components/FloatingContact";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
      </main>
      <FloatingContact />
    </>
  );
}
