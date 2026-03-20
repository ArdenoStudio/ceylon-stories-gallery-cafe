import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Minus, Plus, ShoppingBag, X, Image as ImageIcon, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menu';
import { BRANCHES } from '../data/locations';
import { getWhatsAppLink, buildOrderMessage } from '../utils/whatsapp';
import { MenuItem, Category } from '../types';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { cn } from '../utils/cn';
import { containerVariants, itemVariants } from '../utils/animations';

const MENU_IMAGES = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1000&q=80"
];

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showMenuGallery, setShowMenuGallery] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return activeCategory === 'All' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Cart logic
  const addToCart = (item: MenuItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = MENU_ITEMS.find(i => i.id === id);
    return total + (item?.price || 0) * (qty as number);
  }, 0);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + (b as number), 0);

  const handleCheckout = () => {
    const items = Object.entries(cart).map(([id, qty]) => {
      const item = MENU_ITEMS.find(i => i.id === id);
      return { name: item?.name || 'Unknown', quantity: qty as number };
    });
    
    const message = buildOrderMessage(selectedBranch.name, items);
    const link = getWhatsAppLink(selectedBranch.whatsapp, message);
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-black pb-24 md:pb-0">
      <Helmet>
        <title>Menu | URBAN KITCHEN’S</title>
        <meta name="description" content="Explore our menu of authentic shawarmas, burgers, and platters." />
      </Helmet>

      {/* Header */}
      <div className="bg-brand-dark pt-8 pb-4 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-serif font-bold text-white mb-2">Our Menu</h1>
            <p className="text-gray-400 mb-4">Authentic flavors prepared fresh daily. 100% Halal.</p>
            
            <button 
              onClick={() => setShowMenuGallery(!showMenuGallery)}
              className="flex items-center text-brand-gold text-sm font-medium hover:text-white transition-colors"
            >
              <ImageIcon size={16} className="mr-2" />
              {showMenuGallery ? "Hide Featured Photos" : "View Featured Photos"}
              {showMenuGallery ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Menu Card Gallery (Collapsible) */}
      <AnimatePresence>
        {showMenuGallery && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="bg-black/50 border-b border-white/10 overflow-hidden"
          >
            <div className="py-6 overflow-x-auto">
              <div className="max-w-7xl mx-auto px-4 flex gap-4">
                {MENU_IMAGES.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Menu Highlight ${idx + 1}`} 
                    className="h-64 md:h-96 w-auto rounded-lg shadow-2xl border border-white/10 object-cover"
                  />
                ))}
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">Swipe to see more photos</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories (Sticky) */}
      <div className="sticky top-20 z-30 bg-brand-black/95 backdrop-blur border-b border-white/10 py-4 overflow-x-auto hide-scrollbar shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex space-x-2">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-brand-gold text-brand-black border-brand-gold shadow-md shadow-brand-gold/20"
                  : "bg-white/5 text-gray-400 border-transparent hover:text-white hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeCategory} // Force re-animation on category change
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
              className="flex flex-col bg-brand-charcoal rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-colors group"
            >
              <div 
                className="w-full aspect-[4/3] relative cursor-pointer overflow-hidden"
                onClick={() => setQuickViewItem(item)}
              >
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center text-xs uppercase tracking-widest border border-white/20">
                     <Eye size={14} className="mr-2" /> Quick View
                   </div>
                </div>
                {item.bestseller && (
                    <span className="absolute top-2 left-2 bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-1 rounded shadow-md">BESTSELLER</span>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif font-bold text-xl text-white leading-tight pr-2">{item.name}</h3>
                  <span className="text-brand-gold font-bold whitespace-nowrap">Rs. {item.price}</span>
                </div>
                
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{item.description}</p>
                
                <div className="flex items-end justify-between mt-auto">
                   <div className="flex gap-2">
                    {item.isSpicy && <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 border border-red-900/50 px-2 py-1 rounded">Spicy</span>}
                    {item.isHalal && <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 border border-green-900/50 px-2 py-1 rounded">Halal</span>}
                   </div>

                   {cart[item.id] ? (
                    <div className="flex items-center bg-brand-gold rounded px-1 py-1 shadow-lg shadow-brand-gold/20">
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-brand-black hover:bg-black/10 rounded"><Minus size={16} /></button>
                      <span className="mx-2 text-brand-black font-bold text-lg w-6 text-center">{cart[item.id]}</span>
                      <button onClick={() => addToCart(item)} className="p-2 text-brand-black hover:bg-black/10 rounded"><Plus size={16} /></button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => addToCart(item)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-brand-gold hover:text-black hover:border-brand-gold"
                    >
                      ADD TO ORDER
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Cart Floating Button */}
      <AnimatePresence>
        {!isCartOpen && cartItemCount > 0 && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-24 right-4 z-40 md:hidden"
          >
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="bg-brand-gold text-brand-black rounded-full p-4 shadow-xl shadow-brand-gold/20 flex items-center gap-2 border-2 border-white/20"
            >
              <ShoppingBag size={24} fill="currentColor" />
              <span className="font-bold text-lg">{cartItemCount}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <Modal 
        isOpen={!!quickViewItem} 
        onClose={() => setQuickViewItem(null)}
        title="Details"
      >
        {quickViewItem && (
          <div className="space-y-4">
             <div className="aspect-video w-full rounded-lg overflow-hidden relative">
                <img src={quickViewItem.image} alt={quickViewItem.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-brand-gold text-brand-black px-2 py-1 text-xs font-bold rounded">Rs. {quickViewItem.price}</div>
             </div>
             <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{quickViewItem.name}</h3>
                <p className="text-gray-300 leading-relaxed">{quickViewItem.description}</p>
             </div>
             <div className="flex gap-2 pt-2">
                {quickViewItem.isHalal && <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded border border-green-900/50">100% Halal</span>}
                {quickViewItem.isSpicy && <span className="px-2 py-1 bg-red-900/30 text-red-400 text-xs rounded border border-red-900/50">Spicy</span>}
                {quickViewItem.isVegetarian && <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded border border-green-900/50">Vegetarian</span>}
             </div>
             <div className="pt-4">
               <Button 
                 variant="gold" 
                 className="w-full" 
                 onClick={() => {
                   addToCart(quickViewItem);
                   setQuickViewItem(null);
                 }}
               >
                 Add to Order - Rs. {quickViewItem.price}
               </Button>
             </div>
          </div>
        )}
      </Modal>

      {/* Build Order Panel / Cart Sheet */}
      <div className={cn(
        "fixed inset-x-0 bottom-0 z-50 bg-brand-dark border-t border-brand-gold/20 shadow-2xl transition-transform duration-300 ease-out md:w-96 md:right-0 md:left-auto md:h-screen md:border-l md:border-t-0",
        isCartOpen ? "translate-y-0" : "translate-y-full md:translate-x-full md:translate-y-0"
      )}>
        {/* Toggle handle for mobile */}
        <div className="md:hidden flex justify-center p-2 cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
           <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
        </div>

        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-gold" /> Your Order
            </h2>
            <button onClick={() => setIsCartOpen(false)} className="md:block hidden text-gray-400 hover:text-white">
              <X />
            </button>
          </div>

          {cartItemCount === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>Your cart is empty</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 text-brand-gold text-sm hover:underline">Browse Menu</button>
            </div>
          ) : (
            <>
              {/* Branch Select */}
              <div className="mb-6 bg-black/20 p-3 rounded-lg border border-white/5">
                <label className="text-xs text-brand-gold uppercase tracking-wider mb-2 block font-semibold">Select Pickup Branch</label>
                <div className="flex bg-brand-black rounded-lg p-1 border border-white/10">
                  {BRANCHES.map(branch => (
                    <button
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch)}
                      className={cn(
                        "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                        selectedBranch.id === branch.id
                          ? "bg-brand-gold text-brand-black shadow-sm"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {branch.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto space-y-3 mb-4 pr-2">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = MENU_ITEMS.find(i => i.id === id);
                  const quantity = qty as number;
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium">{item.name}</h4>
                        <p className="text-brand-gold text-xs font-mono">Rs. {item.price * quantity}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-brand-black rounded px-2 py-1 border border-white/10">
                        <button onClick={() => removeFromCart(id)} className="text-gray-400 hover:text-white"><Minus size={14}/></button>
                        <span className="text-white text-sm w-4 text-center font-bold">{quantity}</span>
                        <button onClick={() => addToCart(item)} className="text-gray-400 hover:text-white"><Plus size={14}/></button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-auto border-t border-white/10 pt-4 pb-safe">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Total Estimate</span>
                  <span className="text-2xl font-bold text-brand-gold">Rs. {cartTotal}</span>
                </div>
                <Button 
                  variant="brand" 
                  className="w-full font-bold shadow-lg shadow-green-900/20" 
                  size="lg"
                  onClick={handleCheckout}
                >
                   Send Order on WhatsApp
                </Button>
                <p className="text-[10px] text-center text-gray-500 mt-2">
                  No payment required now. Pay at the counter.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;