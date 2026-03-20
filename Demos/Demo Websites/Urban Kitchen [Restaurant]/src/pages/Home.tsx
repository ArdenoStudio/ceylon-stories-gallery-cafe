import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, ArrowRight, Flame, MapPin, ChefHat, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import SignatureCarousel from '../components/ui/SignatureCarousel';
import { MENU_ITEMS } from '../data/menu';
import { REVIEWS } from '../data/reviews';
import { BRANCHES } from '../data/locations';
import { getWhatsAppLink, buildOrderMessage } from '../utils/whatsapp';
import { cn } from '../utils/cn';
import { containerVariants, itemVariants } from '../utils/animations';

const Home: React.FC = () => {
   const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

   // Curate signatures - ensuring we pick the most visually striking ones
   const signatures = MENU_ITEMS.filter(item => ['s1', 'p1', 'b1', 'sd1', 's2'].includes(item.id));

   return (
      <>
         <Helmet>
            <title>URBAN KITCHEN’S | Fire. Flavor. Culture.</title>
            <meta name="description" content="Premium Halal Shawarma & Grill in Colombo. Authentic wood-fired flavors." />
         </Helmet>

         {/* 1. CINEMATIC HERO */}
         <section className="relative h-screen w-full overflow-hidden bg-brand-black -mt-24 md:-mt-32">
            {/* Background */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 z-10" />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-10" />
               <img
                  src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2670&auto=format&fit=crop"
                  alt="Urban Kitchen Fire Grill"
                  className="w-full h-full object-cover animate-slow-zoom origin-right"
               />
            </div>

            {/* Hero Content — Left Aligned */}
            <div className="relative z-20 h-full flex flex-col justify-end md:justify-center px-6 md:px-16 lg:px-24 pb-28 md:pb-0 pt-32 md:pt-0 max-w-4xl">

               {/* Est. pill */}
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="flex items-center gap-3 mb-6"
               >
                  <span className="w-8 h-[1px] bg-brand-gold" />
                  <span className="text-brand-gold text-xs font-bold tracking-[0.35em] uppercase">Est. 2018 · Colombo</span>
               </motion.div>

               {/* Headline */}
               <h1 className="font-serif font-black leading-[0.88] tracking-tight mb-8 overflow-hidden">
                  <motion.span
                     initial={{ y: "110%" }} animate={{ y: 0 }}
                     transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                     className="block text-white text-6xl md:text-8xl lg:text-[9rem]"
                  >
                     FIRE.
                  </motion.span>
                  <motion.span
                     initial={{ y: "110%" }} animate={{ y: 0 }}
                     transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.22 }}
                     className="block text-white text-6xl md:text-8xl lg:text-[9rem]"
                  >
                     FLAVOR.
                  </motion.span>
                  <motion.span
                     initial={{ y: "110%" }} animate={{ y: 0 }}
                     transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 0.34 }}
                     className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold text-5xl md:text-7xl lg:text-8xl"
                  >
                     URBAN KITCHEN.
                  </motion.span>
               </h1>

               {/* Subtext */}
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-gray-400 text-base md:text-lg font-light tracking-wide max-w-sm mb-10 leading-relaxed"
               >
                  The authentic taste of the Middle East — reimagined for the modern palate. 100% Halal.
               </motion.p>

               {/* CTAs */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
               >
                  <Button size="lg" variant="gold" onClick={() => setIsBranchModalOpen(true)}>
                     Order on WhatsApp
                  </Button>
                  <Link to="/menu">
                     <Button size="lg" variant="outline">
                        View The Menu
                     </Button>
                  </Link>
               </motion.div>
            </div>

            {/* Bottom Stats Strip */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.5, duration: 1 }}
               className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/40 backdrop-blur-sm hidden md:flex"
            >
               {[
                  { label: "Locations", value: "2" },
                  { label: "Years Serving", value: "7+" },
                  { label: "100% Halal", value: "✓" },
                  { label: "Happy Customers", value: "10,000+" },
               ].map((stat, i) => (
                  <div key={i} className="flex-1 py-5 px-6 border-r border-white/10 last:border-r-0 text-center">
                     <div className="text-brand-gold font-serif font-black text-2xl leading-none mb-1">{stat.value}</div>
                     <div className="text-gray-500 text-[10px] uppercase tracking-[0.25em]">{stat.label}</div>
                  </div>
               ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1, y: [0, 8, 0] }}
               transition={{
                  opacity: { delay: 2, duration: 1 },
                  y: { delay: 2, duration: 4, repeat: Infinity, ease: "easeInOut" }
               }}
               className="absolute bottom-20 right-8 md:right-16 z-20 md:flex flex-col items-center gap-2 hidden"
            >
               <div className="w-[26px] h-[42px] rounded-full border border-brand-gold/40 flex justify-center pt-2">
                  <motion.div
                     animate={{ y: [0, 12], opacity: [1, 0] }}
                     transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                     className="w-1 h-1.5 bg-brand-gold rounded-full"
                  />
               </div>
               <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/60 font-bold">Scroll</span>
            </motion.div>
         </section>

         {/* 2. SIGNATURE CAROUSEL */}
         <section className="py-24 bg-brand-black border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
               <Flame size={400} />
            </div>

            <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
               >
                  <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-2">Signatures.</h2>
                  <p className="text-brand-gold text-sm tracking-widest uppercase">Curated favorites</p>
               </motion.div>
               <Link to="/menu" className="hidden md:flex items-center text-white hover:text-brand-gold transition-colors text-sm font-bold uppercase tracking-widest group cursor-hover">
                  Full Menu <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>

            {/* Embla Carousel */}
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
               <SignatureCarousel
                  items={signatures}
                  onOrderClick={() => setIsBranchModalOpen(true)}
               />
            </motion.div>
         </section>

         {/* 3. THE URBAN KITCHEN STANDARD (Pillars) */}
         <section className="py-32 bg-brand-dark relative">
            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-b border-white/5 py-16"
            >
               <motion.div variants={itemVariants} className="text-center group">
                  <div className="mb-6 inline-flex p-4 rounded-full bg-white/5 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors duration-500 cursor-hover">
                     <ChefHat size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">Master Grillers</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                     Our chefs are artisans of the flame. Every cut of meat is marinated for 24 hours and grilled to perfection over open coals.
                  </p>
               </motion.div>
               <motion.div variants={itemVariants} className="text-center group">
                  <div className="mb-6 inline-flex p-4 rounded-full bg-white/5 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors duration-500 cursor-hover">
                     <Star size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">Premium Halal</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                     Zero compromise. We source only the finest Halal-certified meats, ensuring ethical standards and superior quality in every bite.
                  </p>
               </motion.div>
               <motion.div variants={itemVariants} className="text-center group">
                  <div className="mb-6 inline-flex p-4 rounded-full bg-white/5 text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors duration-500 cursor-hover">
                     <Clock size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">Fresh Daily</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                     From our garlic toum to our hummus, everything is made from scratch daily. No freezers, just fresh ingredients.
                  </p>
               </motion.div>
            </motion.div>
         </section>

         {/* 4. FIND THE FIRE (Locations) */}
         <section className="py-24 bg-brand-black">
            <div className="max-w-7xl mx-auto px-6">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16 text-center"
               >
                  <h2 className="text-5xl font-serif font-black text-white mb-4">Find The Fire.</h2>
                  <p className="text-gray-400">Two locations. One standard of excellence.</p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {BRANCHES.map((branch, i) => (
                     <motion.div
                        key={branch.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="relative group overflow-hidden h-[400px] md:h-[500px] bg-brand-charcoal cursor-hover"
                     >
                        {/* Background Image */}
                        <img
                           src={branch.image}
                           alt={branch.name}
                           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                           <h3 className="text-3xl font-serif font-bold text-white mb-2">{branch.name}</h3>
                           <p className="text-gray-300 mb-6 flex items-center">
                              <MapPin size={16} className="text-brand-gold mr-2" />
                              {branch.address}
                           </p>

                           <div className="flex gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                              <a
                                 href={getWhatsAppLink(branch.whatsapp)}
                                 target="_blank"
                                 rel="noreferrer"
                                 className="flex-1"
                              >
                                 <Button variant="gold" className="w-full">WhatsApp</Button>
                              </a>
                              <a
                                 href={`tel:${branch.phone}`}
                                 className="flex-1"
                              >
                                 <Button variant="outline" className="w-full">Call</Button>
                              </a>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* 5. WALL OF LOVE (Social Proof) */}
         <section className="py-24 bg-brand-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
               <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <h2 className="text-4xl font-serif font-bold text-white">The Verdict.</h2>
                  <div className="flex gap-1 text-brand-gold mt-4 md:mt-0">
                     {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={20} />)}
                  </div>
               </div>

               <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
               >
                  {REVIEWS.slice(0, 3).map((review, i) => (
                     <motion.div
                        variants={itemVariants}
                        key={review.id}
                        className="bg-white/5 p-8 border border-white/5 hover:border-brand-gold/30 transition-colors duration-300 cursor-hover"
                     >
                        <p className="text-xl text-white font-serif italic mb-6 leading-relaxed">"{review.text}"</p>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-brand-gold text-brand-black flex items-center justify-center font-bold text-lg">
                              {review.author.charAt(0)}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-white uppercase tracking-wider">{review.author}</p>
                              <p className="text-xs text-gray-500">{review.source}</p>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </motion.div>
            </div>
         </section>

         {/* Branch Modal */}
         <Modal
            isOpen={isBranchModalOpen}
            onClose={() => setIsBranchModalOpen(false)}
            title="SELECT LOCATION"
         >
            <div className="space-y-4">
               <p className="text-gray-400 text-sm mb-6 text-center">Choose a branch to start your WhatsApp order.</p>
               {BRANCHES.map((branch) => (
                  <a
                     key={branch.id}
                     href={getWhatsAppLink(branch.whatsapp, buildOrderMessage(branch.name, []))}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold/10 transition-all group cursor-hover"
                  >
                     <div>
                        <h4 className="font-serif font-bold text-white text-xl mb-1">{branch.name}</h4>
                        <span className="text-xs text-brand-gold uppercase tracking-wider">Open • {branch.hours}</span>
                     </div>
                     <ArrowRight className="text-gray-500 group-hover:text-brand-gold transition-colors" />
                  </a>
               ))}
            </div>
         </Modal>
      </>
   );
};

export default Home;