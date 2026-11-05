import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/restaurantData';
import { FoodCategory, DietType, MenuItem } from '../types/restaurant';
import { formatINR } from '../utils/booking';
import { Flame, Plus, Check, Search, UtensilsCrossed } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: string[];
}

export default function MenuSection({ onAddToCart, cartItemIds }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('all');
  const [selectedDiet, setSelectedDiet] = useState<DietType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (selectedDiet === 'veg' && !item.isVeg) return false;
      if (selectedDiet === 'non-veg' && item.isVeg) return false;
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTamil = item.tamilName.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        return matchesName || matchesTamil || matchesDesc || matchesIngredients;
      }
      return true;
    });
  }, [selectedCategory, selectedDiet, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-[#0d0c0a] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#d4af37]">
            Royal Gastronomy of the Delta
          </span>
          <h2 className="text-3xl md:text-5xl font-cinzel text-[#f5f0e6] font-normal mt-3 tracking-wide [text-wrap:balance]">
            The Imperial Dining Menu
          </h2>
          <p className="mt-4 text-sm md:text-base text-[#a8a192] font-body leading-relaxed">
            Every dish is prepared using heirloom cold-pressed oils, hand-pounded Seeraga Samba rice, and freshly roasted spices ground on traditional stone grinders.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 bg-[#14120e] p-4 md:p-6 rounded-2xl border border-[#d4af37]/30 shadow-lg">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#090807] rounded-xl border border-[#2b271f] overflow-x-auto no-scrollbar max-w-full w-full lg:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 text-xs font-cinzel font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#d4af37] text-[#0d0c0a] font-bold shadow-sm'
                  : 'text-[#8f887b] hover:text-[#f5f0e6]'
              }`}
            >
              All Specialties
            </button>
            <button
              onClick={() => setSelectedCategory('virundhu')}
              className={`px-3.5 py-2 text-xs font-cinzel font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'virundhu'
                  ? 'bg-[#d4af37] text-[#0d0c0a] font-bold shadow-sm'
                  : 'text-[#8f887b] hover:text-[#f5f0e6]'
              }`}
            >
              Royal Virundhu (Leaf Meals)
            </button>
            <button
              onClick={() => setSelectedCategory('chettinad')}
              className={`px-3.5 py-2 text-xs font-cinzel font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'chettinad'
                  ? 'bg-[#d4af37] text-[#0d0c0a] font-bold shadow-sm'
                  : 'text-[#8f887b] hover:text-[#f5f0e6]'
              }`}
            >
              Chettinad & Biryani
            </button>
            <button
              onClick={() => setSelectedCategory('tiffin')}
              className={`px-3.5 py-2 text-xs font-cinzel font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'tiffin'
                  ? 'bg-[#d4af37] text-[#0d0c0a] font-bold shadow-sm'
                  : 'text-[#8f887b] hover:text-[#f5f0e6]'
              }`}
            >
              Tiffin & Dosa Craft
            </button>
            <button
              onClick={() => setSelectedCategory('seafood')}
              className={`px-3.5 py-2 text-xs font-cinzel font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'seafood'
                  ? 'bg-[#d4af37] text-[#0d0c0a] font-bold shadow-sm'
                  : 'text-[#8f887b] hover:text-[#f5f0e6]'
              }`}
            >
              Cauvery River & Sea Catch
            </button>
            <button
              onClick={() => setSelectedCategory('desserts')}
              className={`px-3.5 py-2 text-xs font-cinzel font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'desserts'
                  ? 'bg-[#d4af37] text-[#0d0c0a] font-bold shadow-sm'
                  : 'text-[#8f887b] hover:text-[#f5f0e6]'
              }`}
            >
              Desserts & Degree Coffee
            </button>
          </div>

          {/* Diet Toggle & Search Bar */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-end">
            {/* Diet Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-[#090807] rounded-xl border border-[#2b271f]">
              <button
                onClick={() => setSelectedDiet('all')}
                className={`px-3 py-1.5 text-xs font-cinzel rounded-lg transition-colors cursor-pointer ${
                  selectedDiet === 'all'
                    ? 'bg-[#2b271f] text-[#f5f0e6] font-semibold'
                    : 'text-[#8f887b] hover:text-[#f5f0e6]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedDiet('veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-cinzel rounded-lg transition-colors cursor-pointer ${
                  selectedDiet === 'veg'
                    ? 'bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 font-semibold'
                    : 'text-[#8f887b] hover:text-emerald-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Pure Veg
              </button>
              <button
                onClick={() => setSelectedDiet('non-veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-cinzel rounded-lg transition-colors cursor-pointer ${
                  selectedDiet === 'non-veg'
                    ? 'bg-red-950/80 border border-red-600/50 text-red-300 font-semibold'
                    : 'text-[#8f887b] hover:text-red-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Non-Veg
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8f887b]" />
              <input
                type="text"
                placeholder="Search dish, spice, rice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#090807] border border-[#2b271f] rounded-xl text-[#f5f0e6] placeholder-[#696357] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-16 text-center rounded-2xl bg-[#14120e] border border-[#2b271f]">
            <UtensilsCrossed className="w-8 h-8 text-[#d4af37] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-cinzel text-[#f5f0e6]">No Royal Delicacies Found</h3>
            <p className="text-xs text-[#8f887b] font-body mt-1">
              Try adjusting your search query or selecting a different culinary category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const isAdded = cartItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="group bg-[#14120e] rounded-2xl border border-[#2b271f] hover:border-[#d4af37]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  {/* Image Container with Fallback */}
                  <div className="relative h-56 overflow-hidden bg-[#1f1c16]">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14120e] via-transparent to-transparent opacity-80" />

                    {/* Veg / Non-Veg Indicator Stamp */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0d0c0a]/90 backdrop-blur-sm border border-[#2b271f]">
                      <span
                        className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`}
                      />
                      <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#d5cfc2]">
                        {item.isVeg ? 'Vegetarian' : 'Non-Veg'}
                      </span>
                    </div>

                    {/* Spice Level Indicator */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-[#0d0c0a]/90 backdrop-blur-sm border border-[#2b271f]">
                      <Flame
                        className={`w-3 h-3 ${
                          item.spiceLevel === 'Chettinad Fiery'
                            ? 'text-red-500'
                            : item.spiceLevel === 'Royal Spiced'
                            ? 'text-amber-500'
                            : 'text-[#d4af37]'
                        }`}
                      />
                      <span className="text-[10px] font-cinzel uppercase text-[#d5cfc2]">
                        {item.spiceLevel}
                      </span>
                    </div>

                    {/* Price Tag in INR */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#0d0c0a]/95 border border-[#d4af37]/40">
                      <span className="text-sm font-cinzel font-bold text-[#d4af37] font-mono tabular-nums">
                        {formatINR(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tamil Name Inscription */}
                      <div className="text-xs font-editorial italic text-[#c59b27] mb-1">
                        {item.tamilName}
                      </div>

                      {/* English Dish Name */}
                      <h3 className="text-lg font-cinzel font-semibold text-[#f5f0e6] group-hover:text-[#d4af37] transition-colors leading-snug">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs md:text-sm text-[#a39e93] font-body leading-relaxed line-clamp-3">
                        {item.description}
                      </p>

                      {/* Ingredients & Highlight */}
                      <div className="mt-4 pt-3 border-t border-[#23201a] text-[11px] text-[#7a7467] font-body flex items-center gap-1.5">
                        <span className="text-[#d4af37]">Craft:</span>
                        <span className="text-[#b5ae9f] truncate">{item.highlight}</span>
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <div className="mt-6 pt-3">
                      <button
                        onClick={() => onAddToCart(item)}
                        className={`w-full py-2.5 px-4 text-xs font-cinzel font-semibold tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                            : 'bg-[#1f1c16] hover:bg-[#d4af37] text-[#f5f0e6] hover:text-[#0d0c0a] border border-[#d4af37]/30'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Tasting Order</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Tasting Basket</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
