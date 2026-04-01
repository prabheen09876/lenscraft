"use client";

import { useRef, useEffect, useState } from "react";
import { useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 40;

function getFramePath(index: number) {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/frames/ezgif-frame-${paddedIndex}.jpg`;
}

interface CanvasSequencePlayerProps {
  progress: MotionValue<number>;
}

export default function CanvasSequencePlayer({ progress }: CanvasSequencePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Map 0 -> 1 scroll to frame 1 -> 40
  const frameIndex = useTransform(progress, [0, 1], [1, FRAME_COUNT]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setImages(loadedImages);
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (index: number) => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const safeIndex = Math.max(1, Math.min(FRAME_COUNT, Math.round(index)));
    const img = images[safeIndex - 1];
    if (!img) return;

    const { width, height } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    const PADDING_FACTOR = 0.65; // Use 65% of the screen so it's fully zoomed out and sharp

    let drawWidth, drawHeight;

    if (canvasRatio > imgRatio) {
      // Fit to height
      drawHeight = height * PADDING_FACTOR;
      drawWidth = drawHeight * imgRatio;
    } else {
      // Fit to width
      drawWidth = width * PADDING_FACTOR;
      drawHeight = drawWidth / imgRatio;
    }

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvasRef.current.parentElement?.getBoundingClientRect();

        if (rect) {
          canvasRef.current.width = rect.width * dpr;
          canvasRef.current.height = rect.height * dpr;

          const ctx = canvasRef.current.getContext("2d");
          if (ctx) ctx.scale(dpr, dpr);

          canvasRef.current.style.width = `${rect.width}px`;
          canvasRef.current.style.height = `${rect.height}px`;
        }
        drawFrame(frameIndex.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(latest);
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505] flex items-center justify-center">
      <canvas ref={canvasRef} className="block w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent pointer-events-none opacity-60" />
    </div>
  );
}
