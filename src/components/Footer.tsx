import React, { useState } from 'react';
import { ArrowUp, Instagram, Facebook, MessageCircle, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080706] text-[#c4bdae] border-t border-[#d4af37]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-2xl font-cinzel font-bold tracking-[0.25em] gold-gradient-text block"
            >
              CHOLAS
            </a>
            <p className="text-xs font-editorial italic text-[#c59b27]">
              சோழர் பேரரசு சமையல் கலை — தஞ்சாவூர்
            </p>
            <p className="text-xs text-[#8f887b] font-body leading-relaxed max-w-sm">
              Celebrating 1,000 years of Chola dynasty hospitality, temple architecture, and sacred South Indian culinary heritage in Thanjavur District, Tamil Nadu.
            </p>
            <div className="text-[11px] text-[#706a5e] font-mono">
              FSSAI Lic. No: 124230100001010
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37]">Sanctuary</h4>
            <ul className="space-y-2 text-xs font-body text-[#a8a192]">
              <li><a href="#heritage" className="hover:text-white transition-colors">Temple Chronicle</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Royal Banana Leaf Virundhu</a></li>
              <li><a href="#sanctum-3d" className="hover:text-white transition-colors">3D Artifact Sanctum</a></li>
              <li><a href="#dining-rooms" className="hover:text-white transition-colors">Grand Durbar Hall</a></li>
              <li><a href="#dining-rooms" className="hover:text-white transition-colors">Cauvery Courtyard</a></li>
            </ul>
          </div>

          {/* Specialities */}
          <div className="space-y-3">
            <h4 className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37]">Delta Cuisine</h4>
            <ul className="space-y-2 text-xs font-body text-[#a8a192]">
              <li><a href="#menu" className="hover:text-white transition-colors">Chettinad Kal Mutton Chukka</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Seeraga Samba Handi Biryani</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Thanjavur Ghee Cone Roast</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Cauvery River Pollichathu</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Kumbakonam Degree Coffee</a></li>
            </ul>
          </div>

          {/* Royal Gazette Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37]">The Royal Gazette</h4>
            <p className="text-xs text-[#8f887b] font-body leading-relaxed">
              Receive invitations to seasonal delta harvest banquets and Pongal virundhu announcements.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs">
                <Check className="w-4 h-4" />
                <span>Enrolled in the Royal Gazette</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#12100d] border border-[#2b271f] rounded-lg text-white outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-cinzel font-semibold tracking-wider text-[#0c0b09] bg-[#d4af37] hover:brightness-110 rounded-lg transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1c1914] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#706a5e]">
          <div>
            © {new Date().getFullYear()} CHOLAS Heritage Dining. All rights reserved. Thanjavur, Tamil Nadu.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a8a192] hover:text-[#d4af37] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a8a192] hover:text-[#d4af37] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919443101010"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a8a192] hover:text-[#d4af37] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#14120e] border border-[#2b271f] hover:border-[#d4af37] text-[#d4af37] hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
