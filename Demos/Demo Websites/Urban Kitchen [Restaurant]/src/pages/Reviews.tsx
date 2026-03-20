import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { REVIEWS } from '../data/reviews';
import { cn } from '../utils/cn';
import { containerVariants, itemVariants } from '../utils/animations';

const Reviews: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Food' | 'Service' | 'Ambience'>('All');

  // Simple keyword matching for demo filtering
  const filteredReviews = filter === 'All' 
    ? REVIEWS 
    : REVIEWS.filter(r => r.text.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="min-h-screen bg-brand-black pb-20">
      <Helmet>
        <title>Reviews | URBAN KITCHEN’S</title>
        <meta name="description" content="See what our customers are saying about Urban Kitchen." />
      </Helmet>

      <div className="bg-brand-dark py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif font-bold text-white mb-4"
          >
            Customer Love
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="text-5xl font-bold text-white">4.8</span>
            <div className="flex flex-col items-start">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-400">Based on 1,200+ reviews</span>
            </div>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Food', 'Service', 'Ambience'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  filter === f
                    ? "bg-brand-gold text-brand-black"
                    : "bg-white/5 text-gray-400 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={filter} // Re-animate on filter change
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredReviews.map((review) => (
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.3)' }}
              key={review.id} 
              className="bg-white/5 p-6 rounded-xl border border-white/5 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-orange-500 flex items-center justify-center text-brand-black font-bold text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-white">{review.author}</h4>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
                <div className="bg-white/10 px-2 py-1 rounded text-xs text-gray-400">
                  {review.source}
                </div>
              </div>
              
              <div className="flex text-brand-gold mb-3">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;