export type MenuCategory =
  | 'Soup'
  | 'Salad'
  | 'Starters'
  | 'Rice'
  | 'Kothu'
  | 'Chun Paan'
  | 'Toasty Panini'
  | 'Western'
  | 'Desserts'
  | 'Kopi Base'
  | 'Mocktails'
  | 'Milkshakes'
  | 'Fresh Juice'
  | 'Energy Drinks'
  | 'Water'
  | 'Dilmah Hot Teas'
  | 'Dilmah Iced Teas'
  | 'Dilmah Smoothies';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  tag: string;
  imageUrl: string;
  isVegetarian: boolean;
  price: number;
  originalPrice: number | null;
  quantity: string;
  prepTimeInMinutes: number;
  isAvailable: boolean;
  displayOrder: number;
}

export type MenuItemRow = {
  id: string;
  category: string;
  name: string;
  description: string;
  tag: string;
  image_url: string;
  is_vegetarian: boolean;
  price: number;
  original_price: number | null;
  quantity: string;
  prep_time_minutes: number;
  is_available: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export function toMenuItem(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    category: row.category as MenuCategory,
    name: row.name,
    description: row.description,
    tag: row.tag,
    imageUrl: row.image_url,
    isVegetarian: row.is_vegetarian,
    price: row.price,
    originalPrice: row.original_price,
    quantity: row.quantity,
    prepTimeInMinutes: row.prep_time_minutes,
    isAvailable: row.is_available,
    displayOrder: row.display_order,
  };
}
