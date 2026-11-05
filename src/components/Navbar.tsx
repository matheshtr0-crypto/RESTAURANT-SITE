import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenReservation, onOpenCart, cartCount }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0c0a]/95 backdrop-blur-md border-b border-[#d4af37]/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-[#0c0b09]/90 via-[#0c0b09]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark (Zero brand subtitle clutter) */}
        <a
          href="#"
          className="text-2xl md:text-3xl font-cinzel font-bold tracking-[0.25em] gold-gradient-text whitespace-nowrap shrink-0 hover:opacity-95 transition-opacity"
          aria-label="CHOLAS Royal South Indian Heritage Dining"
        >
          CHOLAS
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-cinzel font-medium text-[#c4bdae]">
          <a
            href="#heritage"
            className="hover:text-[#f5f0e6] hover:underline underline-offset-8 decoration-[#d4af37] transition-all whitespace-nowrap shrink-0"
          >
            Heritage
          </a>
          <a
            href="#menu"
            className="hover:text-[#f5f0e6] hover:underline underline-offset-8 decoration-[#d4af37] transition-all whitespace-nowrap shrink-0"
          >
            Royal Menu
          </a>
          <a
            href="#sanctum-3d"
            className="hover:text-[#f5f0e6] hover:underline underline-offset-8 decoration-[#d4af37] transition-all whitespace-nowrap shrink-0"
          >
            3D Sanctum
          </a>
          <a
            href="#dining-rooms"
            className="hover:text-[#f5f0e6] hover:underline underline-offset-8 decoration-[#d4af37] transition-all whitespace-nowrap shrink-0"
          >
            Dining Rooms
          </a>
          <a
            href="#contact"
            className="hover:text-[#f5f0e6] hover:underline underline-offset-8 decoration-[#d4af37] transition-all whitespace-nowrap shrink-0"
          >
            Location & Valet
          </a>
        </nav>

        {/* Zone 3: 1 primary action + Cart affordance */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full border border-[#d4af37]/30 text-[#e8e4dc] hover:text-[#d4af37] hover:border-[#d4af37] transition-colors cursor-pointer"
            aria-label={`View Tasting Basket with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4af37] text-[#0d0c0a] font-bold text-[10px] rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex px-5 py-2.5 text-xs font-cinzel font-semibold tracking-wider text-[#0d0c0a] bg-gradient-to-r from-[#e6c76c] via-[#d4af37] to-[#b38822] rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reserve a Table
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#d4af37] hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0c0a] border-b border-[#d4af37]/30 px-6 py-6 space-y-4">
          <a
            href="#heritage"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-cinzel text-[#d5cfc2] hover:text-[#d4af37]"
          >
            Heritage of Thanjavur
          </a>
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-cinzel text-[#d5cfc2] hover:text-[#d4af37]"
          >
            Royal Menu
          </a>
          <a
            href="#sanctum-3d"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-cinzel text-[#d5cfc2] hover:text-[#d4af37]"
          >
            3D Artifact Sanctum
          </a>
          <a
            href="#dining-rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-cinzel text-[#d5cfc2] hover:text-[#d4af37]"
          >
            Dining Rooms
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-cinzel text-[#d5cfc2] hover:text-[#d4af37]"
          >
            Location & Valet
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 text-xs font-cinzel font-semibold tracking-wider text-[#0d0c0a] bg-gradient-to-r from-[#e6c76c] via-[#d4af37] to-[#b38822] rounded-lg"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
