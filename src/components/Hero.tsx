import React from 'react';
import { ArrowRight, Utensils, Calendar } from 'lucide-react';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export default function Hero({ onOpenReservation, onExploreMenu }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden">
      {/* Background Cinematic Visual with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_cholas_royal_dining_1793889499623.jpg"
          alt="CHOLAS Royal Dining Atmosphere in Thanjavur"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09] via-[#0c0b09]/75 to-[#0c0b09]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0c0b09_90%)]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full my-auto text-center">
        {/* Editorial Subtitle / Kicker */}
        <div className="inline-flex items-center gap-2 text-xs md:text-sm font-cinzel tracking-[0.3em] uppercase text-[#d4af37] mb-4">
          <span>Imperial Thanjavur</span>
          <span aria-hidden="true">·</span>
          <span>Cauvery Delta Gastronomy</span>
          <span aria-hidden="true">·</span>
          <span>Est. 1010 CE Heritage</span>
        </div>

        {/* Tamil Inscription Calligraphy */}
        <p className="text-sm md:text-base text-[#e6c76c]/80 font-editorial italic tracking-wider mb-2">
          "சோழர் பேரரசு சமையல் கலை — விருந்தோம்பல் மரபின் உச்சம்"
        </p>

        {/* Master Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-cinzel font-normal text-[#fbf9f5] tracking-tight leading-[1.1] max-w-4xl mx-auto [text-wrap:balance]">
          Where Kings Feasted, <br />
          <span className="italic font-editorial gold-gradient-text">Flavor Lives Forever</span>
        </h1>

        {/* Body Description */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#d4cfc4] font-body max-w-2xl mx-auto leading-relaxed">
          Experience 1,000 years of South Indian royal culinary majesty. Stone-ground Chettinad masalas, fragrant Seeraga Samba wood-fired biryanis, and the sacred 24-course banana leaf banquet beneath carved granite colonnades.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreMenu}
            className="px-8 py-3.5 text-xs sm:text-sm font-cinzel font-semibold tracking-wider text-[#0c0b09] bg-gradient-to-r from-[#e6c76c] via-[#d4af37] to-[#b38822] rounded-lg shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Royal Menu</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onOpenReservation}
            className="px-8 py-3.5 text-xs sm:text-sm font-cinzel font-semibold tracking-wider text-[#f5f0e6] bg-[#14120e]/80 hover:bg-[#1f1c16] border border-[#d4af37]/50 rounded-lg backdrop-blur-sm hover:border-[#d4af37] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Reserve Table</span>
          </button>
        </div>
      </div>

      {/* Operational Utility Ribbon (Full width row below hero fold) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#14120e]/85 backdrop-blur-md border border-[#d4af37]/30 text-center">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#8f887b] font-cinzel">Location</div>
            <div className="text-xs md:text-sm font-cinzel text-[#f5f0e6] font-medium mt-1">
              Adjacent to Big Temple, Thanjavur
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#8f887b] font-cinzel">Hours of Hospitality</div>
            <div className="text-xs md:text-sm font-cinzel text-[#f5f0e6] font-medium mt-1">
              11:30 AM – 11:00 PM Daily
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#8f887b] font-cinzel">Dining Format</div>
            <div className="text-xs md:text-sm font-cinzel text-[#f5f0e6] font-medium mt-1">
              Virundhu Banquets & À la Carte
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#8f887b] font-cinzel">Hospitality Accolade</div>
            <div className="text-xs md:text-sm font-cinzel text-[#d4af37] font-semibold mt-1">
              Heritage Culinary Award 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
