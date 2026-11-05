import React, { useState } from 'react';
import { HERITAGE_TIMELINE } from '../data/restaurantData';
import { Landmark, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function HeritageStory() {
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0);
  const activeMilestone = HERITAGE_TIMELINE[activeMilestoneIdx];

  return (
    <section id="heritage" className="py-24 bg-[#0a0907] relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Kicker & Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.3em] uppercase text-[#d4af37]">
            <Landmark className="w-3.5 h-3.5" />
            <span>Thanjavur Royal Chronicles</span>
            <span aria-hidden="true">·</span>
            <span>Est. 1010 CE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel text-[#f5f0e6] font-normal mt-3 tracking-wide [text-wrap:balance]">
            The Great Living Chola Legacy
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#a8a192] font-body leading-relaxed">
            Thanjavur was the beating heart of one of the greatest maritime empires in Asian history. Here, monumental granite architecture and celestial culinary sciences were born side-by-side.
          </p>
        </div>

        {/* 2-Column Architectural Feature Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Image with Temple Majesty */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
              <img
                src="/src/assets/images/heritage_brihadeeswarar_temple_1793889502496.jpg"
                alt="Brihadeeswarar Big Temple in Thanjavur at Dusk"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907] via-transparent to-transparent opacity-80" />
              {/* Figure Caption strictly adhering to Museum editorial guideline */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0d0c0a]/85 backdrop-blur-md border border-[#d4af37]/20">
                <div className="text-xs uppercase tracking-wider text-[#d4af37] font-cinzel">
                  Peruvudaiyar Kovil (The Big Temple) · Consecrated 1010 CE
                </div>
                <div className="text-xs text-[#c7c1b4] font-body mt-1">
                  Built by Emperor Rajaraja Chola I entirely with 130,000 tons of granite without binding mortar. Its kitchen inscriptions recorded exact rations of cumin, black pepper, cardamoms, and cow ghee for royal feasts.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Heritage Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-[#2b271f] pb-4">
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-cinzel">The Cauvery Granary</span>
              <h3 className="text-2xl md:text-3xl font-cinzel text-[#f5f0e6] mt-1">
                The Delta of Gold & Spice
              </h3>
              <p className="text-sm text-[#b5ae9f] font-body mt-3 leading-relaxed">
                Nourished by the sacred Cauvery river, the delta soil yielded aromatic Seeraga Samba short-grain rice, tender green drumsticks, and the richest coconuts in the subcontinent. Rajendra Chola's naval fleets further enriched these kitchens with nutmeg and cloves from Southeast Asia.
              </p>
            </div>

            <div className="border-b border-[#2b271f] pb-4">
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-cinzel">The Art of Virundhombal</span>
              <h3 className="text-2xl md:text-3xl font-cinzel text-[#f5f0e6] mt-1">
                Hospitality as a Sacred Duty
              </h3>
              <p className="text-sm text-[#b5ae9f] font-body mt-3 leading-relaxed">
                In classical Tamil literature, banquet service on tender banana leaves is revered as *Virundhombal*. Every guest at CHOLAS is received with the imperial honor once reserved for traveling scholars and royal envoys.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#14120e] border border-[#d4af37]/30 flex items-start gap-4">
              <Compass className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-cinzel uppercase text-[#d4af37] font-semibold">Living Authenticity</div>
                <div className="text-xs text-[#a39e93] font-body mt-1">
                  We use stone mortar *ammikal* and *aattukal* for our spice pastes and cold-pressed gingelly oil extracted in traditional wooden *chekku* presses.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Dynasty Timeline */}
        <div className="p-8 md:p-10 rounded-2xl bg-[#12100d] border border-[#d4af37]/30 shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel">Milestones of Eternity</span>
            <h3 className="text-2xl md:text-4xl font-cinzel text-[#f5f0e6] mt-1 font-medium">
              Chola Dynasty Interactive Timeline
            </h3>
          </div>

          {/* Timeline Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#090807] rounded-xl border border-[#2b271f] mb-8 max-w-3xl mx-auto">
            {HERITAGE_TIMELINE.map((milestone, idx) => (
              <button
                key={milestone.year}
                onClick={() => setActiveMilestoneIdx(idx)}
                className={`px-4 py-2 text-xs font-cinzel font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeMilestoneIdx === idx
                    ? 'bg-[#d4af37] text-[#0d0c0a] font-bold shadow-md'
                    : 'text-[#8f887b] hover:text-[#f5f0e6]'
                }`}
              >
                {milestone.year}
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#171511] p-6 md:p-8 rounded-xl border border-[#d4af37]/20">
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#2b271f] pb-4 md:pb-0 md:pr-6">
              <span className="text-4xl md:text-5xl font-cinzel text-[#d4af37] font-bold">
                {activeMilestone.year}
              </span>
              <div className="text-sm font-editorial italic text-[#e6c76c] mt-2">
                {activeMilestone.tamilTitle}
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#a8a192] font-cinzel">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{activeMilestone.highlight}</span>
              </div>
            </div>

            <div className="md:col-span-8">
              <h4 className="text-xl md:text-2xl font-cinzel text-[#f5f0e6] font-semibold">
                {activeMilestone.title}
              </h4>
              <p className="mt-3 text-sm md:text-base text-[#c7c1b4] font-body leading-relaxed">
                {activeMilestone.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
