import { CaseStudySection } from "@/src/components/CaseSetudySection";
import { CtaSection } from "@/src/components/CTASection";
import FeatureSection from "@/src/components/FeatureSection";
import FeatureSectionTwo from "@/src/components/FeatureSectionTwo";
import { Footer } from "@/src/components/Footer";
import HeroSection from "@/src/components/HeroSection";
import { ProjectSection } from "@/src/components/ProjectSection";
import { SocialSection } from "@/src/components/SocialSection";
import { Navbar5 } from "../components/Navbar";
// import Image from "next/image";

export default function Home() {
  return (
    
    //bg-[#14281D]
    <main className="min-h-screen w-full flex flex-col text-white bg-gradient-to-b from-[#0b0f14] via-[#0a0e13] to-black">
      <Navbar5 />
      <HeroSection />
      <FeatureSection />
      <FeatureSectionTwo />
      <ProjectSection />
      <CaseStudySection />
      <SocialSection />
      <CtaSection />
      <Footer />
    </main>
  );
}