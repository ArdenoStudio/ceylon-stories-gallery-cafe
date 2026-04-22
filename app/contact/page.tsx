'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('General Inquiry');

  const inquiryTypes = ['General Inquiry', 'Press & Media', 'Partnership', 'Artwork Purchase', 'Events & Private Hire'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative w-full bg-mahogany text-cream-page pt-40 pb-20 px-6 overflow-hidden">
        <div className="batik-line absolute top-0 left-0 bg-white/20" />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-10 left-[-5%] font-display italic text-[28vw] text-mahogany-soft/15 leading-none">08</span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-gold-leaf mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-gold-leaf/50" /> 08 — CONTACT
          </p>
          <h1 className="font-display font-light text-cream-page text-[clamp(52px,8vw,110px)] leading-[0.9] tracking-[-0.02em]">
            Let&apos;s talk, <br />
            <i className="text-clay-warm">slowly.</i>
          </h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="relative w-full bg-cream-page py-[clamp(60px,8vh,120px)] px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="flex flex-col gap-4 py-12">
                <p className="font-display font-light text-mahogany text-4xl">Thank you.</p>
                <p className="font-body text-sm text-mahogany/60 leading-relaxed max-w-[36ch]">
                  Your message has been received. We read every inquiry personally and will respond within two working days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-5">Inquiry Type</p>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`font-editorial text-[9px] tracking-[0.18em] uppercase px-3 py-2 border transition-colors duration-200 ${
                          type === t
                            ? 'bg-mahogany text-cream-page border-mahogany'
                            : 'text-mahogany/50 border-mahogany/20 hover:border-mahogany/60'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Your email"
                      required
                      className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany transition-colors"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany transition-colors"
                />

                <textarea
                  placeholder="Your message"
                  required
                  rows={6}
                  className="w-full border-b border-mahogany/20 bg-transparent py-3 font-body text-sm text-mahogany placeholder:text-mahogany/30 focus:outline-none focus:border-mahogany transition-colors resize-none"
                />

                <button
                  type="submit"
                  className="font-editorial text-[10px] tracking-[0.2em] uppercase bg-mahogany text-cream-page px-8 py-4 hover:bg-clay-deep transition-colors duration-300 w-fit"
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-12 pt-2 lg:pt-0 lg:pl-12 lg:border-l lg:border-mahogany/10"
          >
            <div>
              <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-4">Direct Contact</p>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@ceylonstories.lk" className="font-body text-base text-mahogany hover:text-clay-deep transition-colors">
                  hello@ceylonstories.lk
                </a>
                <a href="tel:+94770000000" className="font-body text-base text-mahogany hover:text-clay-deep transition-colors">
                  +94 (77) 000 0000
                </a>
              </div>
            </div>

            <div>
              <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-4">Social</p>
              <div className="flex flex-col gap-2">
                <a href="https://instagram.com/ceylonstories.gallerycafe" target="_blank" rel="noreferrer" className="font-editorial text-[10px] tracking-widest uppercase text-mahogany/60 hover:text-mahogany transition-colors">
                  @ceylonstories.gallerycafe
                </a>
              </div>
            </div>

            <div>
              <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-4">Press & Partnerships</p>
              <p className="font-body text-sm text-mahogany/60 leading-relaxed max-w-[36ch]">
                For media features, editorial collaborations, and brand partnerships — including our ongoing Dilmah authorised dealership — please select the relevant inquiry type and include details in your message.
              </p>
            </div>

            <div className="border-t border-mahogany/10 pt-8">
              <p className="font-editorial text-[9px] tracking-[0.25em] uppercase text-clay-warm mb-4">Dilmah Authorised Partner</p>
              <p className="font-body text-xs text-mahogany/50 leading-relaxed max-w-[36ch]">
                Ceylon Stories is an authorised Dilmah partner. For Dilmah-specific trade or collaboration inquiries, please select &apos;Partnership&apos; above.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
