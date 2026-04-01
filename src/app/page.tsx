"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ScrollytellingSections from "@/components/ScrollytellingSections";
import BonusSections from "@/components/BonusSections";
import { ContainerTextFlip } from "@/components/ContainerTextFlip";
import Lenis from "@studio-freight/lenis";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Sync Framer motion update with Lenis if needed
    // Assuming framer motion handles itself fine with lenis window scroll 
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <ScrollytellingSections />
      
      {/* Animated Text Flip Section */}
      <section className="relative z-20 py-32 md:py-48 bg-[#050505] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white/50 leading-tight flex flex-col md:flex-row items-center justify-center gap-x-4 gap-y-6">
          <span>We craft visual experiences that are</span>
          <ContainerTextFlip 
            words={["cinematic.", "breathtaking.", "unforgettable.", "timeless."]} 
            className="text-[#C9A96E]"
            textClassName="font-medium tracking-tight"
          />
        </h2>
      </section>

      <BonusSections />
    </main>
  );
}
