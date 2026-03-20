import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';
import { pageVariants, pageTransition } from '../../utils/animations';

const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-brand-black text-gray-100 flex flex-col font-sans selection:bg-brand-gold selection:text-brand-black">
      <Navbar />
      
      {/* 
         Floating navbar requires more breathing room for content.
         pt-24 (96px) mobile
         md:pt-32 (128px) desktop
      */}
      <main className="flex-grow pt-24 md:pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Layout;