/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeritageStory from './components/HeritageStory';
import CholaSanctum3D from './components/CholaSanctum3D';
import MenuSection from './components/MenuSection';
import DiningExperiences from './components/DiningExperiences';
import Testimonials from './components/Testimonials';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import OrderDrawer from './components/OrderDrawer';
import { CartItem, MenuItem } from './types/restaurant';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartItemIds = cartItems.map((ci) => ci.item.id);

  return (
    <div className="min-h-screen bg-[#0c0b09] text-[#e8e4dc] font-body selection:bg-[#d4af37] selection:text-[#0c0b09]">
      {/* Top Navigation */}
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
      />

      <main>
        {/* Cinematic Hero */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onExploreMenu={handleExploreMenu}
        />

        {/* Chola Dynasty & Brihadeeswarar Heritage Storytelling */}
        <HeritageStory />

        {/* Interactive 3D Artifact Sanctum (Three.js) */}
        <CholaSanctum3D onExploreMenu={handleExploreMenu} />

        {/* Comprehensive South Indian Veg & Non-Veg Menu */}
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
        />

        {/* Dining Enclaves & Private Banquets */}
        <DiningExperiences onOpenReservation={() => setIsReservationOpen(true)} />

        {/* Critical Accolades & Testimonials */}
        <Testimonials />

        {/* Location, Temple Map & Concierge Contact */}
        <LocationContact />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Tasting Basket & Takeaway Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
