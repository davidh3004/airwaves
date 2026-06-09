import { Facebook, Instagram, Twitter } from "lucide-react";
import logoImg from "@assets/vectorized_019ea960-898f-7b41-93b4-d117bb8b21fc_(1)_1780966319118.svg";
import { useSiteContent } from "@/context/SiteContentContext";
import { Link } from "wouter";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  const { contact } = useSiteContent();

  return (
    <footer className="bg-[#040E26] text-white/70 py-12 md:py-16 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <img src={logoImg} alt="Air Waves Comfort Logo" className="h-9 w-auto" />
            </div>
            <p className="mb-5 text-sm leading-relaxed">
              Miami's premier HVAC service provider. Expert, reliable, and unmistakably premium. Serving Miami-Dade and Broward County.
            </p>
            <div className="flex gap-4 mb-4">
              <a href="#" aria-label="Facebook" className="hover:text-[#00AEEF] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-[#00AEEF] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter / X" className="hover:text-[#00AEEF] transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="hover:text-[#00AEEF] transition-colors">Services</a></li>
              <li><a href="#gallery" className="hover:text-[#00AEEF] transition-colors">Gallery</a></li>
              <li><a href="#maintenance" className="hover:text-[#00AEEF] transition-colors">Maintenance Plans</a></li>
              <li><a href="#reviews" className="hover:text-[#00AEEF] transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-[#00AEEF] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="hover:text-[#00AEEF] transition-colors">AC Repair</a></li>
              <li><a href="#services" className="hover:text-[#00AEEF] transition-colors">AC Installation</a></li>
              <li><a href="#services" className="hover:text-[#00AEEF] transition-colors">Preventative Maintenance</a></li>
              <li><a href="#services" className="hover:text-[#00AEEF] transition-colors">Commercial HVAC</a></li>
              <li><a href="#services" className="hover:text-[#00AEEF] transition-colors">Indoor Air Quality</a></li>
              <li><a href="#services" className="hover:text-[#00AEEF] transition-colors">Emergency Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-white/40 text-xs mb-1">24/7 Emergency Line</p>
                <a href={`tel:${contact.phone1.replace(/\D/g, '')}`} className="flex items-center gap-2 text-white hover:text-[#00AEEF] font-bold text-base transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />{contact.phone1}
                </a>
              </li>
              <li>
                <p className="text-white/40 text-xs mb-1">Office</p>
                <a href={`tel:${contact.phone2.replace(/\D/g, '')}`} className="flex items-center gap-2 text-white hover:text-[#00AEEF] font-bold text-base transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />{contact.phone2}
                </a>
              </li>
              <li>
                <p className="text-white/40 text-xs mb-1">Address</p>
                <a
                  href="https://maps.google.com/?q=9802+NW+80+Ave+Hialeah+Gardens+FL+33016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-[#00AEEF] transition-colors"
                >
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </a>
              </li>
              <li>
                <p className="text-white/40 text-xs mb-1">License</p>
                <p>{contact.license}</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Air Waves Comfort, LLC. All rights reserved. | Licensed & Insured | {contact.license}</p>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <Link href="/admin" className="hover:text-white transition-colors opacity-20 hover:opacity-60">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
