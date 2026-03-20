import { MenuItem } from '../../types';

export const MENU_CATEGORIES = ['All', 'Shawarmas', 'Platters', 'Burgers', 'Sides', 'Drinks', 'Softies'];

export const MENU_ITEMS: MenuItem[] = [
  // --- Shawarmas ---
  {
    id: 's1',
    name: 'Classic Chicken Shawarma',
    description: 'The OG. Slow-roasted chicken, authentic garlic toum, pickles, and crispy fries in fresh kubboos.',
    price: 850,
    category: 'Shawarmas',
    image: 'https://images.unsplash.com/photo-1561651823-34febf224560?auto=format&fit=crop&w=800&q=80', // Darker closeup
    isHalal: true,
    bestseller: true,
  },
  {
    id: 's2',
    name: 'Mexican Spicy Shawarma',
    description: 'Fire it up. Chicken shawarma with spicy jalapeno salsa, chili mayo, and melted cheddar.',
    price: 1050,
    category: 'Shawarmas',
    image: 'https://images.unsplash.com/photo-1633321769407-5360b73010b9?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    isHalal: true,
    bestseller: true,
  },
  {
    id: 's3',
    name: 'Double Cheese Shawarma',
    description: 'For cheese lovers. Loaded with mozzarella and cheddar cheese sauce.',
    price: 1200,
    category: 'Shawarmas',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    isHalal: true,
  },
  {
    id: 's4',
    name: 'Beef Tahini Shawarma',
    description: 'Premium marinated beef strips, fresh parsley salad, onions, tomato, and rich tahini.',
    price: 1350,
    category: 'Shawarmas',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80', // Dark beef shot
    isHalal: true,
  },
  {
    id: 's5',
    name: 'Falafel Wrap',
    description: 'Crispy chickpeas falafel, hummus, tahini, pickles, and fresh salad.',
    price: 750,
    category: 'Shawarmas',
    image: 'https://images.unsplash.com/photo-1547055768-466d71333fb7?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    isHalal: true,
  },

  // --- Platters ---
  {
    id: 'p1',
    name: "Urban Kitchen Mixed Platter",
    description: 'The ultimate feast. Chicken & Beef shawarma, hummus, fattoush salad, spicy fries, garlic paste, and 2 breads.',
    price: 2800,
    category: 'Platters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', // Big platter dark
    isHalal: true,
    bestseller: true,
  },
  {
    id: 'p2',
    name: 'Chicken Shawarma Platter',
    description: 'Deconstructed shawarma plate with extra meat, fries, salad, and dips.',
    price: 1950,
    category: 'Platters',
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=800&q=80',
    isHalal: true,
  },
  {
    id: 'p3',
    name: 'Hummus with Meat',
    description: 'Creamy hummus topped with spiced minced lamb/beef and pine nuts. Served with bread.',
    price: 1800,
    category: 'Platters',
    image: 'https://images.unsplash.com/photo-1542528180-a1208c5169a5?auto=format&fit=crop&w=800&q=80',
    isHalal: true,
  },

  // --- Burgers ---
  {
    id: 'b1',
    name: 'Crispy Zinger Burger',
    description: 'Massive fried chicken thigh, spicy mayo, lettuce, and cheese in a brioche bun.',
    price: 1100,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', // Dark burger
    isHalal: true,
    isSpicy: true,
  },
  {
    id: 'b2',
    name: 'Smash Beef Burger',
    description: 'Two smashed patties, caramelized onions, secret sauce, and double cheese.',
    price: 1500,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    isHalal: true,
  },

  // --- Sides ---
  {
    id: 'sd1',
    name: 'Peri Peri Fries',
    description: 'Crispy french fries dusted with our signature spicy mix.',
    price: 650,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1630384060421-a4323ce56d37?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    isVegetarian: true,
  },
  {
    id: 'sd2',
    name: 'Loaded Cheesy Fries',
    description: 'Fries drowned in cheddar cheese sauce, jalapenos, and grilled chicken bits.',
    price: 1100,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1585109649139-36680186c9d7?auto=format&fit=crop&w=800&q=80',
    isHalal: true,
  },
  {
    id: 'sd3',
    name: 'Garlic Toum (Dip)',
    description: 'Our famous fluffy garlic sauce. 4oz cup.',
    price: 300,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
  },

  // --- Drinks ---
  {
    id: 'd1',
    name: 'Classic Mojito',
    description: 'Lime, mint, soda, and crushed ice. Refreshing.',
    price: 650,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'd2',
    name: 'Passion Fruit Mojito',
    description: 'Sparkling passion fruit refresher with mint.',
    price: 700,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536935338788-843bb63d36a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'd3',
    name: 'Soft Drinks (300ml)',
    description: 'Coke, Sprite, or Fanta.',
    price: 250,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  },

  // --- Softies ---
  {
    id: 'ice1',
    name: 'Vanilla Soft Serve',
    description: 'Creamy vanilla ice cream in a crispy cone.',
    price: 350,
    category: 'Softies',
    image: 'https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ice2',
    name: 'Choco Dip Cone',
    description: 'Vanilla soft serve dipped in hardened chocolate shell.',
    price: 500,
    category: 'Softies',
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=800&q=80',
  }
];