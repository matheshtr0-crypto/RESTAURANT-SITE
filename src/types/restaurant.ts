export type FoodCategory =
  | 'all'
  | 'virundhu'
  | 'chettinad'
  | 'tiffin'
  | 'seafood'
  | 'desserts';

export type DietType = 'all' | 'veg' | 'non-veg';

export type SpiceLevel = 'Mild' | 'Medium' | 'Chettinad Fiery' | 'Royal Spiced';

export interface MenuItem {
  id: string;
  name: string;
  tamilName: string;
  category: 'virundhu' | 'chettinad' | 'tiffin' | 'seafood' | 'desserts';
  isVeg: boolean;
  price: number;
  description: string;
  spiceLevel: SpiceLevel;
  highlight: string;
  image: string;
  ingredients: string[];
  signature?: boolean;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingArea: 'Durbar Hall' | 'Cauvery Courtyard' | 'Royal Enclave' | 'Traditional Pandal';
  occasion: 'Casual Dining' | 'Family Feast' | 'Anniversary' | 'Royal Celebration' | 'Business Hospitality';
  specialRequests?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  spiceNote?: string;
}

export interface HeritageMilestone {
  year: string;
  title: string;
  tamilTitle: string;
  description: string;
  highlight: string;
}
