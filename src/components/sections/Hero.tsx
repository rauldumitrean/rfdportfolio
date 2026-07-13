"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { resumeData } from "@/data/resumeData";
import { ArrowDown, Terminal } from "lucide-react";

export default function Hero({ settings }: { settings: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-title-line",
        { y: 100, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.2, delay: 0.2 }
      )
        .fromTo(
          ".hero-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
          "-=0.4"
        );

      // Parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const xPos = (e.clientX / innerWidth - 0.5) * 20;
        const yPos = (e.clientY / innerHeight - 0.5) * 20;

        gsap.to(textRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* Decorative gradient glowing orb behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="z-10 flex flex-col items-center text-center px-6 max-w-5xl" ref={textRef}>
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass">
          <Terminal size={16} className="text-blue-400" />
          <span className="text-sm font-mono text-gray-300">Ready to Deploy</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 [perspective:1000px]">
          <div className="hero-title-line overflow-hidden">
            <span className="block text-gradient">{settings?.heroTitle || "Hi, I'm"}</span>
          </div>
          <div className="hero-title-line overflow-hidden pb-4">
            <span className="block text-white">{resumeData.personalInfo.name}</span>
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="hero-subtitle text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light"
        >
          {settings?.heroSubtitle || resumeData.personalInfo.profile}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#projects"
            className="hero-cta group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 font-medium text-white transition-all hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            <span>Ver Proyectos</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
          </a>
          
          <a
            href="#contact"
            className="hero-cta inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40"
          >
            Contactar
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs uppercase tracking-widest font-mono text-gray-400">Scroll</span>
        <ArrowDown size={20} className="text-white" />
      </div>
    </section>
  );
}
