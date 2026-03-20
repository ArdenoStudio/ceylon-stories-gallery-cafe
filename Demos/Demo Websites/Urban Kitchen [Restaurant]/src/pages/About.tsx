import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../utils/animations';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-black pb-20">
      <Helmet>
        <title>About Us | URBAN KITCHEN’S</title>
        <meta name="description" content="Our story of reimagining Shawarma in Sri Lanka." />
      </Helmet>

      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=1200&q=80" 
            alt="Shawarma Grill" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Shawarma, Reimagined.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-300"
          >
            We started Urban Kitchen with one simple mission: to elevate the street food experience in Colombo.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-20">
        
        {/* Story */}
        <section>
          <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-3xl font-serif font-bold text-brand-gold mb-6"
          >
             Our Story
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="prose prose-invert max-w-none text-gray-300"
          >
            <p className="mb-4">
              It began in a small kitchen in 2018. We were tired of dry, flavorless shawarmas. We wanted the authentic garlic toum, the perfectly marinated meats, and the soft, fresh kubboos bread that we tasted in the Middle East.
            </p>
            <p>
              So we built Urban Kitchen. No shortcuts. No frozen patties. Just fresh ingredients, spices sourced directly from origins, and a passion for fire-grilled perfection. Today, with two bustling outlets in Colombo, we are proud to serve thousands of happy customers every month.
            </p>
          </motion.div>
        </section>

        {/* Quality Promise / Halal */}
        <section className="bg-brand-dark p-8 rounded-2xl border border-white/5">
           <h2 className="text-3xl font-serif font-bold text-white mb-8 text-center">Our Promise</h2>
           <div className="grid md:grid-cols-2 gap-8">
             <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="space-y-4"
             >
               <motion.div variants={itemVariants} className="flex items-start">
                 <CheckCircle2 className="text-green-500 mt-1 mr-4 flex-shrink-0" />
                 <div>
                   <h3 className="font-bold text-white text-lg">100% Halal Certified</h3>
                   <p className="text-gray-400 text-sm">All our meats and ingredients are strictly Halal sourced and prepared.</p>
                 </div>
               </motion.div>
               <motion.div variants={itemVariants} className="flex items-start">
                 <CheckCircle2 className="text-brand-gold mt-1 mr-4 flex-shrink-0" />
                 <div>
                   <h3 className="font-bold text-white text-lg">Fresh, Never Frozen</h3>
                   <p className="text-gray-400 text-sm">We marinate our meats for 24 hours and grill them fresh daily.</p>
                 </div>
               </motion.div>
             </motion.div>
             
             <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="space-y-4"
             >
               <motion.div variants={itemVariants} className="flex items-start">
                 <CheckCircle2 className="text-brand-gold mt-1 mr-4 flex-shrink-0" />
                 <div>
                   <h3 className="font-bold text-white text-lg">Authentic Recipes</h3>
                   <p className="text-gray-400 text-sm">Our garlic sauce (Toum) and tahini are made in-house from scratch.</p>
                 </div>
               </motion.div>
               <motion.div variants={itemVariants} className="flex items-start">
                 <CheckCircle2 className="text-brand-gold mt-1 mr-4 flex-shrink-0" />
                 <div>
                   <h3 className="font-bold text-white text-lg">Hygiene First</h3>
                   <p className="text-gray-400 text-sm">Open kitchens where you can see exactly how your food is prepared.</p>
                 </div>
               </motion.div>
             </motion.div>
           </div>
        </section>

        {/* Gallery Grid */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Inside Our Kitchen</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1547055768-466d71333fb7?auto=format&fit=crop&w=400&q=80" alt="Preparation" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80" alt="Grilling" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1561651823-34febf224560?auto=format&fit=crop&w=400&q=80" alt="Plating" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80" alt="Drinks" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" alt="Ambience" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=400&q=80" alt="Spices" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;