import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingContact } from "@/components/FloatingContact";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersApply } from "@/components/sections/careers/CareersApply";
import { Positions } from "@/components/sections/careers/Positions";
import { CareerBenefits } from "@/components/sections/careers/CareerBenefits";
import { CareersFaq } from "@/components/sections/careers/CareersFaq";
import { CareersJsonLd } from "@/components/sections/careers/CareersJsonLd";

export const metadata: Metadata = {
  title: "Careers & Internships in Pakistan",
  description:
    "Join Perception Impex. Apply to the Aspire Summer Internship for students or the Elevate Management Trainee Program for fresh graduates. Roles in finance, IT, HR, sales, supply chain, and import/export at a Pakistan-based yarn trading company.",
  keywords: [
    "textile internship Pakistan",
    "yarn industry internship",
    "management trainee program Pakistan",
    "Aspire Summer Internship",
    "Elevate Management Trainee Program",
    "fresh graduate jobs Pakistan",
    "internship Karachi",
    "Perception Impex careers",
  ],
  alternates: { canonical: "/careers/" },
  openGraph: {
    type: "website",
    url: "https://www.perceptionimpex.com/careers/",
    title: "Careers & Internships at Perception Impex",
    description:
      "Aspire Summer Internship for students and the Elevate Management Trainee Program for fresh graduates. Apply online.",
    siteName: "Perception Impex",
  },
};

export default function CareersPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <CareersJsonLd />
        <CareersHero />
        <CareersApply />
        <Positions />
        <CareerBenefits />
        <CareersFaq />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
