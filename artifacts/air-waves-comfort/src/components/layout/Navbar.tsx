import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/hf_20260609_003428_ae28fd3a-1fd8-4702-a45d-ffe99aa95cfc_1780965584003.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A2A6E]/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
            <img src={logoImg} alt="Air Waves Comfort" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-serif font-bold text-xl tracking-tight">Air Waves</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {["Services", "Maintenance", "Financing", "Reviews", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/90 hover:text-[#00AEEF] font-medium transition-colors text-sm"
              data-testid={`nav-link-${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:7863623648"
            className="flex items-center gap-2 text-white font-bold hover:text-[#00AEEF] transition-colors"
            data-testid="nav-phone"
          >
            <PhoneCall className="w-5 h-5" />
            <span>(786) 362-3648</span>
          </a>
          <Button
            className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold rounded-full px-6"
            data-testid="nav-schedule-btn"
          >
            Schedule Service
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="nav-mobile-toggle"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0A2A6E] pt-24 px-6 z-40 flex flex-col gap-6 lg:hidden">
          <nav className="flex flex-col gap-4 text-2xl font-serif text-white">
            {["Services", "Maintenance", "Financing", "Reviews", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#00AEEF]"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <a
              href="tel:7863623648"
              className="flex items-center justify-center gap-2 text-white font-bold text-xl bg-white/10 py-4 rounded-xl"
            >
              <PhoneCall className="w-6 h-6" />
              <span>(786) 362-3648</span>
            </a>
            <Button className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold rounded-xl py-6 text-lg w-full">
              Schedule Service
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}