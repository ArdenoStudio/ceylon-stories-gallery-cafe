import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRANCHES } from '../data/locations';
import Button from '../components/ui/Button';
import { getWhatsAppLink } from '../utils/whatsapp';
import { containerVariants, itemVariants } from '../utils/animations';

const Locations: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-black pb-20">
      <Helmet>
        <title>Locations | URBAN KITCHEN’S</title>
        <meta name="description" content="Visit us at Colombo 03 or Colombo 07. Open daily for Dine-in and Takeaway." />
      </Helmet>

      <div className="bg-brand-dark py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif font-bold text-white mb-2"
          >
            Our Locations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400"
          >
            Find your nearest Urban Kitchen outlet.
          </motion.p>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 py-12 space-y-8"
      >
        {BRANCHES.map((branch, index) => (
          <motion.div 
            variants={itemVariants}
            key={branch.id} 
            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 flex flex-col md:flex-row hover:border-brand-gold/30 transition-colors"
          >
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden group">
              <img src={branch.image} alt={branch.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 md:hidden">
                <h2 className="text-2xl font-bold text-white">{branch.name}</h2>
              </div>
            </div>
            
            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-white hidden md:block mb-6">{branch.name}</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="text-brand-gold mt-1 mr-3 flex-shrink-0" size={20} />
                  <p className="text-gray-300">{branch.address}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="text-brand-gold mr-3 flex-shrink-0" size={20} />
                  <a href={`tel:${branch.phone}`} className="text-gray-300 hover:text-white transition-colors">{branch.phone}</a>
                </div>
                <div className="flex items-center">
                  <Clock className="text-brand-gold mr-3 flex-shrink-0" size={20} />
                  <p className="text-gray-300">{branch.hours}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={getWhatsAppLink(branch.whatsapp)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="col-span-2"
                >
                  <Button variant="brand" className="w-full">Order Here (WhatsApp)</Button>
                </a>
                <a href={branch.mapLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="w-full">
                    <Navigation size={16} className="mr-2" />
                    Directions
                  </Button>
                </a>
                <a href={`tel:${branch.phone}`}>
                  <Button variant="outline" className="w-full">
                    <Phone size={16} className="mr-2" />
                    Call
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* How it works */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-serif font-bold text-white text-center mb-8">How Ordering Works</h3>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between gap-8 relative"
        >
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10 -translate-y-1/2" />

           {[
             { step: '01', title: 'Choose Items', desc: 'Browse our menu and select your cravings.' },
             { step: '02', title: 'Select Branch', desc: 'Pick the outlet closest to you.' },
             { step: '03', title: 'WhatsApp', desc: 'Send the pre-filled message. We handle the rest.' },
           ].map((s) => (
             <div key={s.step} className="bg-brand-black p-6 rounded-xl border border-white/5 text-center flex-1">
               <div className="w-12 h-12 bg-brand-gold text-brand-black rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                 {s.step}
               </div>
               <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
               <p className="text-sm text-gray-400">{s.desc}</p>
             </div>
           ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Locations;