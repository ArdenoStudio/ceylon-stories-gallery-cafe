import React, { useState } from 'react';
import { Home, UtensilsCrossed, MapPin, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import Modal from '../ui/Modal';
import { BRANCHES } from '../../data/locations';
import { getWhatsAppLink } from '../../utils/whatsapp';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-black border-t border-white/10 pb-safe z-40">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className={cn("flex flex-col items-center justify-center w-full h-full space-y-1", isActive('/') ? "text-brand-gold" : "text-gray-400")}
          >
            <Home size={20} />
            <span className="text-[10px]">Home</span>
          </Link>
          
          <Link
            to="/menu"
            className={cn("flex flex-col items-center justify-center w-full h-full space-y-1", isActive('/menu') ? "text-brand-gold" : "text-gray-400")}
          >
            <UtensilsCrossed size={20} />
            <span className="text-[10px]">Menu</span>
          </Link>

          <Link
            to="/locations"
            className={cn("flex flex-col items-center justify-center w-full h-full space-y-1", isActive('/locations') ? "text-brand-gold" : "text-gray-400")}
          >
            <MapPin size={20} />
            <span className="text-[10px]">Locate</span>
          </Link>

          <button
            onClick={() => setIsCallModalOpen(true)}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400"
          >
            <Phone size={20} />
            <span className="text-[10px]">Call</span>
          </button>
        </div>
      </div>

      <Modal isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} title="Call a Branch">
        <div className="space-y-3">
          {BRANCHES.map(branch => (
            <a 
              key={branch.id} 
              href={`tel:${branch.phone}`}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 active:scale-95 transition-all"
            >
              <div>
                <p className="font-semibold text-white">{branch.name}</p>
                <p className="text-sm text-gray-400">{branch.phone}</p>
              </div>
              <Phone size={18} className="text-brand-gold" />
            </a>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default BottomNav;