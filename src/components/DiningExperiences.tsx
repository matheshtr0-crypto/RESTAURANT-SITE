import React from 'react';
import { DINING_ROOMS } from '../data/restaurantData';
import { Users, Calendar, Crown } from 'lucide-react';

interface DiningExperiencesProps {
  onOpenReservation: () => void;
}

export default function DiningExperiences({ onOpenReservation }: DiningExperiencesProps) {
  return (
    <section id="dining-rooms" className="py-24 bg-[#0a0907] relative border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.3em] uppercase text-[#d4af37]">
            <Crown className="w-3.5 h-3.5" />
            <span>The Imperial Enclaves</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel text-[#f5f0e6] font-normal mt-3 tracking-wide [text-wrap:balance]">
            Royal Dining Sanctuaries
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#a8a192] font-body leading-relaxed">
            Whether seated on hand-hewn granite benches in the open courtyard under star-filled Thanjavur skies or in the gilded Durbar Hall, every setting reflects royal splendor.
          </p>
        </div>

        {/* 3 Enclaves Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DINING_ROOMS.map((room) => (
            <div
              key={room.id}
              className="group bg-[#12100d] rounded-2xl border border-[#2b271f] hover:border-[#d4af37]/40 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="relative h-64 overflow-hidden bg-[#1a1712]">
                <img
                  src={room.image}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-transparent to-transparent opacity-85" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded bg-[#0d0c0a]/90 backdrop-blur-sm border border-[#2b271f] text-xs font-cinzel text-[#d4af37] flex items-center gap-1.5">
                  <Users className="w-3 h-3" />
                  <span>{room.capacity}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-editorial italic text-[#c59b27] mb-1">
                    {room.tamilName}
                  </div>
                  <h3 className="text-xl font-cinzel font-semibold text-[#f5f0e6]">
                    {room.name}
                  </h3>
                  <div className="text-xs uppercase tracking-wider text-[#8f887b] font-cinzel mt-1">
                    {room.setting}
                  </div>
                  <p className="mt-3 text-xs md:text-sm text-[#a39e93] font-body leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#23201a]">
                  <button
                    onClick={onOpenReservation}
                    className="w-full py-2.5 px-4 text-xs font-cinzel font-semibold tracking-wider text-[#f5f0e6] bg-[#1a1712] hover:bg-[#d4af37] hover:text-[#0d0c0a] border border-[#d4af37]/30 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37] group-hover:text-[#0d0c0a]" />
                    <span>Reserve in this Enclave</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Celebrations Callout Strip */}
        <div className="mt-16 p-8 md:p-10 rounded-2xl bg-[#14120e] border border-[#d4af37]/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-cinzel">
              Grand Banquets & Family Celebrations
            </span>
            <h3 className="text-2xl md:text-3xl font-cinzel text-[#f5f0e6] font-medium mt-1">
              Host Imperial Feasts in Thanjavur
            </h3>
            <p className="text-xs md:text-sm text-[#a39e93] font-body mt-2 leading-relaxed">
              Curated royal banquets for intimate weddings, Seemantham celebrations, milestone anniversaries, and corporate hospitality. Customized banana-leaf menus and classical live Carnatic music recitals available upon inquiry.
            </p>
          </div>
          <button
            onClick={onOpenReservation}
            className="px-8 py-3.5 text-xs font-cinzel font-semibold tracking-wider text-[#0c0b09] bg-gradient-to-r from-[#e6c76c] via-[#d4af37] to-[#b38822] rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Inquire for Group Dining
          </button>
        </div>
      </div>
    </section>
  );
}
