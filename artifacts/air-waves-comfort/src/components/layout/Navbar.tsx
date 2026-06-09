import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/vectorized_019ea960-898f-7b41-93b4-d117bb8b21fc_(1)_1780966319118.svg";

const NAV_LINKS = ["Services", "Gallery", "Maintenance", "Reviews", "FAQ"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A2A6E]/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center z-50">
          <img src={logoImg} alt="Air Waves Comfort" className="h-9 md:h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
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
          <a href="tel:7863623648">
            <Button
              className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold rounded-full px-6"
              data-testid="nav-schedule-btn"
            >
              Schedule Service
            </Button>
          </a>
        </div>

        {/* Mobile: small phone + hamburger */}
        <div className="lg:hidden flex items-center gap-3 z-50">
          <a
            href="tel:7863623648"
            className="flex items-center gap-1.5 text-white font-bold text-sm bg-[#00AEEF] px-3 py-2 rounded-full"
            aria-label="Call now"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden sm:inline">Call</span>
          </a>
          <button
            className="text-white p-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="nav-mobile-toggle"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0A2A6E] pt-20 px-6 z-40 flex flex-col gap-6 lg:hidden overflow-y-auto">
          <nav className="flex flex-col gap-5 text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/10 pb-4 hover:text-[#00AEEF] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="tel:7863623648"
              className="flex items-center justify-center gap-2 text-white font-bold text-lg bg-[#00AEEF] py-4 rounded-xl"
            >
              <PhoneCall className="w-5 h-5" />
              <span>(786) 362-3648</span>
            </a>
            <a
              href="tel:7864242925"
              className="flex items-center justify-center gap-2 text-white/80 font-bold text-base bg-white/10 py-3 rounded-xl"
            >
              <PhoneCall className="w-4 h-4" />
              <span>(786) 424-2925</span>
            </a>
          </div>
          <p className="text-white/40 text-xs text-center mt-2">9802 NW 80 Ave Bay G48, Hialeah Gardens, FL 33016</p>
        </div>
      )}
    </header>
  );
}
