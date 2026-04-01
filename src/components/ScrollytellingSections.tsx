"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import CanvasSequencePlayer from "./CanvasSequencePlayer";

function FadeInText({
  progress,
  range,
  children,
  className,
  isHero = false,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: React.ReactNode;
  className?: string;
  isHero?: boolean;
}) {
  const opacity = useTransform(progress, range, isHero ? [1, 1, 1, 0] : [0, 1, 1, 0]);
  const y = useTransform(progress, range, isHero ? [0, 0, 0, -50] : [50, 0, 0, -50]);
  
  // Physically hide the element when it's outside its active scroll range to prevent any glass layer stacking
  const display = useTransform(progress, (p) => {
    if (isHero && p >= range[3]) return "none";
    if (!isHero && (p <= range[0] || p >= range[3])) return "none";
    return "flex";
  });

  return (
    <motion.div 
      initial={{ opacity: isHero ? 1 : 0, y: isHero ? 0 : 50, display: isHero ? "flex" : "none" }}
      style={{ opacity, y, display }} 
      className={`absolute inset-0 flex-col justify-center px-6 md:px-[8%] lg:px-[12%] pointer-events-none ${className}`}
    >
      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-[50px] border-t border-l border-white/30 border-b-transparent border-r-white/5 p-10 md:p-14 rounded-3xl w-full md:w-[45%] max-w-lg shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] pointer-events-auto overflow-hidden">
        {/* Liquid reflection overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[2px]" />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export default function ScrollytellingSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (!mounted) {
    return <div ref={containerRef} className="relative w-full h-[500vh] bg-[#050505]" />;
  }

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#050505]">
      {/* Sticky viewport container tracks the 500vh scroll space */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* The canvas player receives the exact scroll progress of the 500vh container */}
        <CanvasSequencePlayer progress={scrollYProgress} />

        {/* Text Overlays - absolute inside the sticky h-screen container */}
        
        {/* 0-15% (Hero) */}
        <FadeInText progress={scrollYProgress} range={[0, 0.05, 0.1, 0.15]} isHero className="items-start">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter text-white mb-4 relative z-20">
            Photography,<br />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] to-white/90">perfected.</span>
          </h1>
          
          <div className="w-[120%] -ml-[10%] h-24 relative flex items-center px-[10%] mt-2 mb-2">
            {/* Gradients & Particles Container */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-white/50 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-white/50 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-1/4 top-0 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-1/4 top-0 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent h-px w-1/4" />

              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#C9A96E"
              />

              <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(150px_100px_at_top,transparent_20%,black)]"></div>
            </div>

            {/* Text Overlay */}
            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed relative z-20 pointer-events-none">
              We don’t just capture moments — we craft them with absolute precision.
            </p>
          </div>
        </FadeInText>

        {/* 15-40% (Camera Reveal) */}
        <FadeInText progress={scrollYProgress} range={[0.18, 0.25, 0.35, 0.4]} className="items-start">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-6">
            Built on <span className="font-medium text-white/90">precision.</span>
          </h2>
          <p className="text-lg text-white/50 font-light leading-relaxed">
            Every shot begins with control — light, glass, and timing working in perfect harmony to expose the unseen.
          </p>
        </FadeInText>

        {/* 40-65% (Lens & Light) */}
        <FadeInText progress={scrollYProgress} range={[0.42, 0.5, 0.6, 0.65]} className="items-start">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-6">
            Light is our <span className="font-medium text-white/90">language.</span>
          </h2>
          <ul className="text-lg text-white/50 space-y-3 font-light leading-relaxed">
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" /> Precision optics for perfect clarity</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" /> Every detail, every texture preserved</li>
            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" /> From shadows to highlights — nothing lost</li>
          </ul>
        </FadeInText>

        {/* 65-85% (Sensor & Detail) */}
        <FadeInText progress={scrollYProgress} range={[0.68, 0.75, 0.8, 0.85]} className="items-start">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white mb-6">
            Where moments<br />become <span className="font-medium text-[#4DA3FF]">memories.</span>
          </h2>
          <p className="text-lg text-white/50 font-light leading-relaxed">
            High-resolution capture meets artistic vision — every single frame is intentional and profound.
          </p>
        </FadeInText>

        {/* 85-100% (Reassembly) */}
        <FadeInText progress={scrollYProgress} range={[0.88, 0.93, 1, 1]} className="items-start text-left">
          <h2 className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-6">
            Your story, <br />
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] to-white/90">captured.</span>
          </h2>
          <p className="text-xl text-white/50 mb-10 font-light leading-relaxed">
            From concept to creation — we deliver luxury visual experiences.
          </p>
          <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            View Portfolio
          </button>
        </FadeInText>
      </div>
    </div>
  );
}
