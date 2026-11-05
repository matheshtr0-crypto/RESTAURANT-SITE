import { CartItem, ReservationData } from '../types/restaurant';

export interface BookingValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface BillBreakdown {
  subtotal: number;
  gst: number;
  packaging: number;
  total: number;
  totalItemsCount: number;
}

/**
 * Validates table reservation data
 */
export function validateReservation(data: Partial<ReservationData>): BookingValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your full name.';
  }

  if (!data.phone || !/^\+?[0-9\s-]{10,14}$/.test(data.phone.trim())) {
    errors.phone = 'Please provide a valid 10-digit mobile number.';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.date) {
    errors.date = 'Please select a reservation date.';
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Please select a dining time slot.';
  }

  if (!data.guests || data.guests < 1 || data.guests > 30) {
    errors.guests = 'Guests must be between 1 and 30.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates an authentic royal reservation reference code
 */
export function generateReservationCode(dateStr: string, guestCount: number): string {
  const sanitizedDate = dateStr.replace(/[^0-9]/g, '').slice(-4) || '1010';
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `CHOLA-TNJ-${sanitizedDate}-${guestCount}P-${randomSuffix}`;
}

/**
 * Computes billing breakdown for tasting/takeaway cart items
 */
export function calculateBill(items: CartItem[]): BillBreakdown {
  const subtotal = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  // GST 5% on restaurant dining/food in India
  const gst = Math.round(subtotal * 0.05);
  // Complimentary packaging for orders above ₹1000, else ₹50
  const packaging = items.length > 0 && subtotal < 1000 ? 50 : 0;
  const total = subtotal + gst + packaging;

  return {
    subtotal,
    gst,
    packaging,
    total,
    totalItemsCount,
  };
}

/**
 * Formats a number to Indian Rupees format (e.g. ₹1,250)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Creates a prefilled WhatsApp link for instant reservation confirmation
 */
export function createWhatsAppBookingUrl(booking: ReservationData, bookingCode: string): string {
  const message = `Namaskaram! I would like to confirm my royal reservation at CHOLAS, Thanjavur:
• Booking Code: ${bookingCode}
• Guest: ${booking.name}
• Date & Time: ${booking.date} at ${booking.timeSlot}
• Guests: ${booking.guests} Guests
• Dining Area: ${booking.seatingArea}
• Occasion: ${booking.occasion}
${booking.specialRequests ? `• Special Requests: ${booking.specialRequests}` : ''}

Looking forward to the royal dining experience!`;

  return `https://wa.me/919443101010?text=${encodeURIComponent(message)}`;
}
