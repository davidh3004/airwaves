import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import ComfortExperience from "@/components/sections/ComfortExperience";
import EmergencyRepair from "@/components/sections/EmergencyRepair";
import MaintenancePlans from "@/components/sections/MaintenancePlans";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import ServiceAreas from "@/components/sections/ServiceAreas";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/sections/QuoteForm";
import FinalCTA from "@/components/sections/FinalCTA";
import MobileCallBar from "@/components/MobileCallBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans selection:bg-[#00AEEF] selection:text-white">
      <Navbar />
      <main className="pb-[68px] md:pb-0">
        <Hero />
        <TrustBar />
        <Services />
        <Gallery />
        <ComfortExperience />
        <EmergencyRepair />
        <MaintenancePlans />
        <Reviews />
        <ServiceAreas />
        <FAQ />
        <QuoteForm />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
