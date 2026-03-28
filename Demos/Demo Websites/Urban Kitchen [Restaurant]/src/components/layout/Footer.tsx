import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import ArdenoProductionCredit from '../ArdenoProductionCredit';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* ... existing columns ... */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-brand-gold">URBAN KITCHEN’S</h3>
            <p className="text-gray-400 text-sm">
              Shawarma, Reimagined. Experience the authentic taste of Middle Eastern street food with a modern twist.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/menu" className="hover:text-brand-gold">Our Menu</Link></li>
              <li><Link to="/locations" className="hover:text-brand-gold">Locations</Link></li>
              <li><Link to="/reviews" className="hover:text-brand-gold">Reviews</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-brand-gold">Contact Us</Link></li>
              <li><span className="text-gray-600">Privacy Policy</span></li>
              <li><span className="text-gray-600">Terms of Service</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-600">
              © {new Date().getFullYear()} Urban Kitchen Demo. All rights reserved.
            </p>
          </div>
        </div>
        
        <ArdenoProductionCredit color="#D4AF37" />
      </div>
    </footer>
  );
};

export default Footer;