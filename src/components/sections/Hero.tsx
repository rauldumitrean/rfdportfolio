"use client";

import { useEffect, useRef } from "react";
import { resumeData } from "@/data/resumeData";
import { ArrowDown, Terminal } from "lucide-react";
import { Settings } from "@/types";

export default function Hero({ settings }: { settings: Settings }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 20;
      const yPos = (e.clientY / innerHeight - 0.5) * 20;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (textRef.current) {
          textRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-24"
    >
      {/* Warm decorative orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] bg-amber-200/40 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-2/3 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] bg-orange-200/30 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] bg-yellow-100/50 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="z-10 flex flex-col items-center text-center px-6 max-w-5xl transition-transform duration-100 ease-out will-change-transform" ref={textRef}>
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-200 bg-amber-50/80 animate-hero-fade-up">
          <Terminal size={16} className="text-amber-600" />
          <span className="text-sm font-mono text-stone-600">Listo para Desarrollar</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 [perspective:1000px]">
          <div className="overflow-hidden">
            <span className="block text-gradient animate-hero-title delay-200">{settings?.heroTitle || "Hola, soy"}</span>
          </div>
          <div className="overflow-hidden pb-4">
            <span className="block text-[#1C1917] animate-hero-title delay-400">{resumeData.personalInfo.name}</span>
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-stone-500 max-w-2xl mb-10 font-light animate-hero-subtitle delay-600"
        >
          {settings?.heroSubtitle || resumeData.personalInfo.profile}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#projects"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-amber-600 px-8 font-medium text-white transition-all hover:bg-amber-700 hover:scale-105 hover:shadow-[0_8px_30px_rgba(217,119,6,0.45)] animate-hero-cta delay-800"
          >
            <span>Ver Proyectos</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
          </a>

          <a
            href="#contact"
            className="inline-flex h-14 items-center justify-center rounded-full border border-stone-300 bg-white/70 px-8 font-medium text-stone-700 backdrop-blur-sm transition-all hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 animate-hero-cta delay-900"
          >
            Contactar
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-400">Descubrir</span>
        <ArrowDown size={20} className="text-stone-500" />
      </div>
    </section>
  );
}
