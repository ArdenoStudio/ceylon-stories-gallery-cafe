import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-black pb-20">
      <Helmet>
        <title>Contact Us | URBAN KITCHEN’S</title>
        <meta name="description" content="Get in touch with us. WhatsApp, Email or Visit." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-4xl font-serif font-bold text-white text-center mb-4"
        >
           Get in Touch
        </motion.h1>
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="text-gray-400 text-center mb-12"
        >
           We'd love to hear from you. Feedback, questions, or catering inquiries.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Direct Info */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="space-y-8"
          >
            <div className="bg-brand-dark p-6 rounded-xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Fastest Support</h3>
              <p className="text-gray-400 mb-6">For order status or immediate queries, WhatsApp is best.</p>
              <Button variant="brand" className="w-full">
                <MessageCircle className="mr-2" />
                Chat on WhatsApp
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Mail className="mr-4 text-brand-gold" />
                <span>hello@urbankitchen.lk</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="mr-4 text-brand-gold" />
                <span>+94 11 234 5678</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-2">Catering?</h4>
              <p className="text-sm text-gray-400">
                Planning a party? We offer live Shawarma stations for events. 
                Email us with subject "Catering Inquiry".
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-4" 
             onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Name</label>
              <input type="text" className="w-full bg-brand-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none transition-colors" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email</label>
              <input type="email" className="w-full bg-brand-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Message</label>
              <textarea rows={4} className="w-full bg-brand-black border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none transition-colors" placeholder="How can we help?"></textarea>
            </div>
            <Button variant="primary" className="w-full">Send Message</Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;