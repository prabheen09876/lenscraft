"use client";

import { motion } from "framer-motion";
import { Camera, Image as ImageIcon, Layers, BookOpen, Mail } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Work", href: "#", icon: ImageIcon },
  { name: "Process", href: "#", icon: Layers },
  { name: "Gear", href: "#", icon: Camera },
  { name: "Stories", href: "#", icon: BookOpen },
  { name: "Contact", href: "#", icon: Mail },
];

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-8 left-1/2 z-50 pointer-events-none"
      initial={{ y: -150, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-auto bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-[40px] border-t border-l border-white/30 border-b-transparent border-r-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] px-8 md:px-12 py-4 rounded-full flex items-center justify-center gap-6 md:gap-14 overflow-hidden relative">
        
        {/* Subtle internal glowing reflection */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px]" />
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[150%] bg-white/10 blur-[50px] transform rotate-45 pointer-events-none" />

        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="group flex flex-col items-center gap-2 text-white/50 hover:text-white transition-all duration-300 z-10"
          >
            <link.icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <span className="text-[10px] md:text-xs font-light tracking-wide opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 absolute -bottom-10 bg-[#050505]/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              {link.name}
            </span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
