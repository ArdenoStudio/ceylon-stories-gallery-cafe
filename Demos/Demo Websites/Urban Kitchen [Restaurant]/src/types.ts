export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isSpicy?: boolean;
  isHalal?: boolean;
  isVegetarian?: boolean;
  bestseller?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'Google' | 'Direct';
}

export interface Branch {
  id: 'cmb3' | 'cmb7';
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  mapLink: string;
  image: string;
}

export type Category = 'All' | 'Shawarmas' | 'Platters' | 'Burgers' | 'Sides' | 'Drinks' | 'Softies';