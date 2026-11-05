import React from 'react';
import { TESTIMONIALS } from '../data/restaurantData';
import { Quote, Award, Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0d0c0a] relative border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.3em] uppercase text-[#d4af37]">
            <Award className="w-3.5 h-3.5" />
            <span>Royal Accolades & Critics</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel text-[#f5f0e6] font-normal mt-3 tracking-wide [text-wrap:balance]">
            Reflections of Gastronomy
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#a8a192] font-body leading-relaxed">
            Historians, world culinary critics, and devoted food lovers share their experiences within our granite halls.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-[#14120e] border border-[#2b271f] hover:border-[#d4af37]/40 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                <Quote className="w-8 h-8 text-[#d4af37]/40 mb-4" />
                <p className="text-sm md:text-base font-editorial italic text-[#d4cfc4] leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#23201a]">
                <div className="text-sm font-cinzel font-semibold text-[#f5f0e6]">
                  {t.author}
                </div>
                <div className="text-xs text-[#d4af37] font-body mt-0.5">
                  {t.role}
                </div>
                <div className="text-[11px] text-[#7a7467] font-body">
                  {t.city}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#12100d] border border-[#2b271f] text-center">
          <div>
            <div className="text-2xl font-cinzel font-bold text-[#d4af37]">24+</div>
            <div className="text-xs font-cinzel uppercase tracking-wider text-[#a39e93] mt-1">Courses in Grand Virundhu</div>
          </div>
          <div>
            <div className="text-2xl font-cinzel font-bold text-[#d4af37]">100%</div>
            <div className="text-xs font-cinzel uppercase tracking-wider text-[#a39e93] mt-1">Stone-Ground Spices</div>
          </div>
          <div>
            <div className="text-2xl font-cinzel font-bold text-[#d4af37]">1,000 Yrs</div>
            <div className="text-xs font-cinzel uppercase tracking-wider text-[#a39e93] mt-1">Living Chola Heritage</div>
          </div>
          <div>
            <div className="text-2xl font-cinzel font-bold text-[#d4af37]">A2 Ghee</div>
            <div className="text-xs font-cinzel uppercase tracking-wider text-[#a39e93] mt-1">Artisanal Desi Cow Clarified Butter</div>
          </div>
        </div>
      </div>
    </section>
  );
}
