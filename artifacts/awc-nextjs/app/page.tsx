import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import ComfortExperience from "@/components/sections/ComfortExperience";
import EmergencyRepair from "@/components/sections/EmergencyRepair";
import MaintenancePlans from "@/components/sections/MaintenancePlans";
import Financing from "@/components/sections/Financing";
import Reviews from "@/components/sections/Reviews";
import ServiceAreas from "@/components/sections/ServiceAreas";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/sections/QuoteForm";
import FinalCTA from "@/components/sections/FinalCTA";
import StickyCallButton from "@/components/ui/StickyCallButton";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Gallery />
        <ComfortExperience />
        <EmergencyRepair />
        <MaintenancePlans />
        <Financing />
        <Reviews />
        <ServiceAreas />
        <FAQ />
        <QuoteForm />
        <FinalCTA />
      </main>
      <Footer />
      {/* Persistent emergency call control, appears after the hero */}
      <StickyCallButton />
    </>
  );
}
