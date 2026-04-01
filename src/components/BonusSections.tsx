/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Twitter, Mail } from "lucide-react";
import { ParallaxScroll } from "./ParallaxScroll";

const PORTFOLIO_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744626753-1fa28f621b42?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1443632864897-14973fa006cf?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504608524841-42ce6c20b001?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop",
];

export default function BonusSections() {
  return (
    <div className="bg-[#050505] text-white pt-32 pb-12 relative z-10 border-t border-white/5">
      {/* Portfolio Preview */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-4">Selected Work</h3>
            <p className="text-white/60 text-lg max-w-md font-light">
              A glimpse into our recent editorial and commercial captures.
            </p>
          </div>
          <button className="flex items-center gap-2 group text-white/80 hover:text-white transition-colors mt-6 md:mt-0">
            View full portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="w-full -mx-6 lg:-mx-12">
          <ParallaxScroll images={PORTFOLIO_IMAGES} className="h-[60rem] md:h-[80rem]" />
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#0B0B0E] py-40 mb-40 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-light italic leading-relaxed text-white/90 mb-12"
          >
            &quot;LensCraft doesn&apos;t just push the button. They understand light, texture, and emotion in a way that elevates the entire brand experience.&quot;
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-medium text-lg">Elena Rossi</p>
            <p className="text-white/60">Creative Director, Vogue</p>
          </motion.div>
        </div>
      </section>

      {/* Booking / CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-32 flex flex-col md:flex-row gap-16 justify-between">
        <div className="flex-1">
          <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Ready to create?</h3>
          <p className="text-xl text-white/60 max-w-md font-light mb-10">
            Let’s discuss your upcoming project and see how we can bring it to life.
          </p>
          <div className="flex gap-6">
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors" />
              <input type="text" placeholder="Last Name" className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors" />
            </div>
            <input type="email" placeholder="Email Address" className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors" />
            <textarea placeholder="Tell us about your project..." rows={4} className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors resize-none"></textarea>
            <button className="bg-white text-black py-4 rounded-full font-medium hover:bg-white/90 transition-transform active:scale-95 mt-4">
              Send Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-12 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
        <p>© 2026 LensCraft Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
}
