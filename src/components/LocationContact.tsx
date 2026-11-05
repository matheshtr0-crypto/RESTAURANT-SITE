import React from 'react';
import { MapPin, Phone, Clock, Car, MessageCircle, Navigation, Mail } from 'lucide-react';

export default function LocationContact() {
  const whatsappUrl = 'https://wa.me/919443101010?text=Namaskaram!%20I%20would%20like%20to%20inquire%20about%20dining%20at%20CHOLAS,%20Thanjavur.';

  return (
    <section id="contact" className="py-24 bg-[#0a0907] relative border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.3em] uppercase text-[#d4af37]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Thanjavur Royal Sanctuary</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel text-[#f5f0e6] font-normal mt-3 tracking-wide [text-wrap:balance]">
            Visit Us in the Heart of Tamil Heritage
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#a8a192] font-body leading-relaxed">
            Conveniently situated adjacent to the UNESCO World Heritage Brihadeeswarar Temple complex, offering complimentary valet service and traditional welcoming rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Contact & Hours Info Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="p-6 rounded-2xl bg-[#12100d] border border-[#2b271f] space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-cinzel font-semibold text-[#f5f0e6]">Address & Sanctuary</h4>
                  <p className="text-xs text-[#a39e93] font-body mt-1 leading-relaxed">
                    CHOLAS Royal Heritage Dining<br />
                    1010 Rajaraja Chola Imperial Avenue,<br />
                    Near South Gate of Big Temple, Thanjavur – 613001, Tamil Nadu, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-[#23201a] pt-4">
                <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-cinzel font-semibold text-[#f5f0e6]">Dining Hours</h4>
                  <div className="text-xs text-[#a39e93] font-body mt-1 space-y-1">
                    <p><strong className="text-[#f5f0e6]">Lunch Virundhu:</strong> 11:30 AM – 03:45 PM</p>
                    <p><strong className="text-[#f5f0e6]">Evening Tiffin & High Tea:</strong> 04:30 PM – 06:30 PM</p>
                    <p><strong className="text-[#f5f0e6]">Imperial Starlit Dinner:</strong> 07:00 PM – 11:00 PM</p>
                    <p className="text-[11px] text-[#7a7467]">Open 7 Days a Week, Including All Festival Holidays</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-[#23201a] pt-4">
                <Car className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-cinzel font-semibold text-[#f5f0e6]">Valet & Accessibility</h4>
                  <p className="text-xs text-[#a39e93] font-body mt-1">
                    Complimentary royal valet parking for 80+ vehicles. Dedicated wheelchair ramps, elevator access to Durbar Hall, and elder-friendly seating.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-cinzel font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>

              <a
                href="tel:+919443101010"
                className="flex-1 py-3 px-4 rounded-xl bg-[#171511] hover:bg-[#23201a] border border-[#d4af37]/40 text-[#f5f0e6] text-xs font-cinzel font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>+91 94431 01010</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Representation */}
          <div className="lg:col-span-7 rounded-2xl bg-[#12100d] border border-[#d4af37]/30 overflow-hidden relative min-h-[380px] flex flex-col justify-between p-6 shadow-xl">
            {/* Map Background Styling */}
            <div className="absolute inset-0 bg-[#0d0c0a] opacity-90">
              <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Simulated River Cauvery delta path and Temple landmarks */}
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37]">
                  Thanjavur Heritage Corridor Map
                </span>
                <span className="text-[11px] font-mono text-[#8f887b]">10.7828° N, 79.1318° E</span>
              </div>
            </div>

            <div className="relative z-10 text-center my-auto py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1c1914] border-2 border-[#d4af37] text-[#d4af37] shadow-xl mb-3 animate-bounce">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-cinzel font-bold text-[#f5f0e6]">
                CHOLAS Sanctuary, Thanjavur
              </h4>
              <p className="text-xs text-[#a39e93] font-body mt-1 max-w-sm mx-auto">
                300 meters from Brihadeeswarar Temple Main Gopuram. Directly connected via Old Bus Stand & Trichy Road.
              </p>

              <div className="mt-6 flex justify-center">
                <a
                  href="https://maps.google.com/?q=Brihadeeswara+Temple+Thanjavur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-xs font-cinzel font-semibold tracking-wider text-[#0c0b09] bg-gradient-to-r from-[#e6c76c] via-[#d4af37] to-[#b38822] rounded-lg shadow-md hover:brightness-110 flex items-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Directions in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="relative z-10 border-t border-[#23201a] pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8f887b]">
              <span>Tiruchirappalli Airport (TRZ): 52 km (45 mins)</span>
              <span>Thanjavur Junction Railway: 2.2 km (8 mins)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
