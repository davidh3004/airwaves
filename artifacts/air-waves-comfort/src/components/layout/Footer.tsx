import { Facebook, Instagram, Twitter } from "lucide-react";
import logoImg from "@assets/hf_20260609_003428_ae28fd3a-1fd8-4702-a45d-ffe99aa95cfc_1780965584003.png";

export default function Footer() {
  return (
    <footer className="bg-[#040E26] text-white/70 py-16 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                <img src={logoImg} alt="Air Waves Comfort Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-white font-serif font-bold text-xl tracking-tight">Air Waves</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed">
              Miami's premier HVAC service provider. Expert, warm, direct, reliable, and unmistakably premium.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#00AEEF] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#00AEEF] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#00AEEF] transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="hover:text-[#00AEEF] transition-colors">Services</a></li>
              <li><a href="#maintenance" className="hover:text-[#00AEEF] transition-colors">Maintenance Plans</a></li>
              <li><a href="#financing" className="hover:text-[#00AEEF] transition-colors">Financing</a></li>
              <li><a href="#reviews" className="hover:text-[#00AEEF] transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-[#00AEEF] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#00AEEF] transition-colors">AC Repair</a></li>
              <li><a href="#" className="hover:text-[#00AEEF] transition-colors">AC Installation</a></li>
              <li><a href="#" className="hover:text-[#00AEEF] transition-colors">Preventative Maintenance</a></li>
              <li><a href="#" className="hover:text-[#00AEEF] transition-colors">Commercial HVAC</a></li>
              <li><a href="#" className="hover:text-[#00AEEF] transition-colors">Indoor Air Quality</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="text-white/50 text-xs mb-1">Phone (24/7)</p>
                <a href="tel:7863623648" className="text-white hover:text-[#00AEEF] font-bold text-lg">(786) 362-3648</a>
              </li>
              <li>
                <p className="text-white/50 text-xs mb-1">Location</p>
                <p>Miami, FL 33173</p>
              </li>
              <li>
                <p className="text-white/50 text-xs mb-1">License Number</p>
                <p>#CAC1820880</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Air Waves Comfort, LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}