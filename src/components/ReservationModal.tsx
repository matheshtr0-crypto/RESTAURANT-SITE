import React, { useState } from 'react';
import { ReservationData } from '../types/restaurant';
import { validateReservation, generateReservationCode, createWhatsAppBookingUrl } from '../utils/booking';
import { X, CheckCircle, Calendar, Users, Clock, Shield, Share2 } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    email: '',
    date: '2026-11-15',
    timeSlot: '12:30 PM - Royal Lunch Virundhu',
    guests: 4,
    seatingArea: 'Durbar Hall',
    occasion: 'Family Feast',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<{
    data: ReservationData;
    code: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateReservation(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const code = generateReservationCode(formData.date, formData.guests);
    setConfirmedBooking({
      data: formData,
      code,
    });
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#12100d] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2b271f] bg-[#171511]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
            <h3 className="text-lg font-cinzel font-semibold text-[#f5f0e6]">
              {confirmedBooking ? 'Royal Reservation Confirmed' : 'Reserve Your Royal Table'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-[#8f887b] hover:text-white rounded-lg hover:bg-[#23201a] transition-colors cursor-pointer"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {confirmedBooking ? (
            /* Confirmation Pass View */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-cinzel uppercase tracking-[0.2em] text-[#d4af37]">
                  Imperial Hospitality Reserved
                </span>
                <h4 className="text-2xl font-cinzel font-bold text-[#f5f0e6] mt-1">
                  We Await Your Presence in Thanjavur
                </h4>
                <p className="text-xs text-[#a39e93] font-body mt-2">
                  Your table reservation has been logged into the royal ledger. A confirmation SMS & WhatsApp message has been initiated.
                </p>
              </div>

              {/* Pass Ticket */}
              <div className="p-6 rounded-xl bg-[#090807] border border-[#d4af37]/30 text-left space-y-4">
                <div className="flex justify-between items-center border-b border-[#23201a] pb-3">
                  <div>
                    <div className="text-[10px] uppercase font-cinzel text-[#8f887b]">Reservation Pass</div>
                    <div className="text-sm font-mono font-bold text-[#d4af37]">{confirmedBooking.code}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-cinzel text-[#8f887b]">Enclave</div>
                    <div className="text-xs font-cinzel text-[#f5f0e6]">{confirmedBooking.data.seatingArea}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[#7a7467] block">Guest Name</span>
                    <span className="text-[#f5f0e6] font-medium font-body">{confirmedBooking.data.name}</span>
                  </div>
                  <div>
                    <span className="text-[#7a7467] block">Party Size</span>
                    <span className="text-[#f5f0e6] font-medium font-body">{confirmedBooking.data.guests} Guests</span>
                  </div>
                  <div>
                    <span className="text-[#7a7467] block">Date</span>
                    <span className="text-[#f5f0e6] font-medium font-body">{confirmedBooking.data.date}</span>
                  </div>
                  <div>
                    <span className="text-[#7a7467] block">Slot</span>
                    <span className="text-[#f5f0e6] font-medium font-body">{confirmedBooking.data.timeSlot}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Action */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={createWhatsAppBookingUrl(confirmedBooking.data, confirmedBooking.code)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 text-xs font-cinzel font-semibold tracking-wider text-[#0c0b09] bg-gradient-to-r from-[#e6c76c] via-[#d4af37] to-[#b38822] rounded-lg shadow-md hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Receive Pass via WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-cinzel text-[#d4cfc4] hover:text-white border border-[#2b271f] rounded-lg hover:bg-[#1a1712] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sundaram Chidambaram"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98401 23456"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none"
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sundaram@heritage.in"
                  className="w-full px-3.5 py-2.5 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none"
                />
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none"
                  />
                  {errors.date && <p className="text-[11px] text-red-400 mt-1">{errors.date}</p>}
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                    Dining Slot *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none"
                  >
                    <option value="12:00 PM - Royal Virundhu (Early Lunch)">12:00 PM - Royal Virundhu</option>
                    <option value="12:30 PM - Royal Lunch Virundhu">12:30 PM - Royal Lunch</option>
                    <option value="01:30 PM - Prime Afternoon Virundhu">01:30 PM - Afternoon Feast</option>
                    <option value="07:00 PM - Starlit Courtyard Dinner">07:00 PM - Early Dinner</option>
                    <option value="08:30 PM - Imperial Durbar Dinner">08:30 PM - Imperial Dinner</option>
                    <option value="09:30 PM - Late Delta Supper">09:30 PM - Late Supper</option>
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none"
                  />
                  {errors.guests && <p className="text-[11px] text-red-400 mt-1">{errors.guests}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Seating Area */}
                <div>
                  <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                    Preferred Dining Enclave
                  </label>
                  <select
                    value={formData.seatingArea}
                    onChange={(e) => setFormData({ ...formData, seatingArea: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none"
                  >
                    <option value="Durbar Hall">The Grand Durbar Hall</option>
                    <option value="Cauvery Courtyard">Cauvery River Courtyard (Open Air)</option>
                    <option value="Traditional Pandal">Traditional Virundhu Pandal</option>
                    <option value="Royal Enclave">Private Royal Enclave (Intimate)</option>
                  </select>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                    Dining Occasion
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none"
                  >
                    <option value="Family Feast">Family Feast & Virundhu</option>
                    <option value="Royal Celebration">Royal Celebration / Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business Hospitality">Diplomatic / Business Hospitality</option>
                    <option value="Casual Dining">Casual Heritage Dining</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-cinzel text-[#d5cfc2] mb-1">
                  Special Dietary or Seating Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Jain preparation required for 2 guests, high chair needed, anniversary cake preference"
                  className="w-full px-3.5 py-2 text-xs bg-[#090807] border border-[#2b271f] focus:border-[#d4af37] rounded-xl text-[#f5f0e6] outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 text-xs font-cinzel font-semibold tracking-wider text-[#0c0b09] bg-gradient-to-r from-[#e6c76c] via-[#d4af37] to-[#b38822] rounded-xl shadow-xl hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                >
                  Confirm Royal Table Reservation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
