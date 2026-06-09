import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import ComfortExperience from "@/components/sections/ComfortExperience";
import EmergencyRepair from "@/components/sections/EmergencyRepair";
import MaintenancePlans from "@/components/sections/MaintenancePlans";
import Financing from "@/components/sections/Financing";
import Reviews from "@/components/sections/Reviews";
import ServiceAreas from "@/components/sections/ServiceAreas";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans selection:bg-[#00AEEF] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <ComfortExperience />
        <EmergencyRepair />
        <MaintenancePlans />
        <Financing />
        <Reviews />
        <ServiceAreas />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}