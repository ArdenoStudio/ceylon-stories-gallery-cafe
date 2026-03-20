import { Branch } from '../../types';
import { WHATSAPP_CMB3, WHATSAPP_CMB7 } from '../utils/whatsapp';

export const BRANCHES: Branch[] = [
  {
    id: 'cmb3',
    name: 'Colombo 03',
    address: '24, Marine Drive, Colombo 03',
    phone: '+94 11 234 5678',
    whatsapp: WHATSAPP_CMB3,
    hours: '11:00 AM - 11:00 PM',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Marine+Drive+Colombo+03',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80', // Modern restaurant interior
  },
  {
    id: 'cmb7',
    name: 'Colombo 07',
    address: '15, Ward Place, Colombo 07',
    phone: '+94 11 234 5679',
    whatsapp: WHATSAPP_CMB7,
    hours: '10:00 AM - 10:00 PM',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Ward+Place+Colombo+07',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', // Cozy cafe vibes
  },
];