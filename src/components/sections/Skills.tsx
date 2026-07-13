"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resumeData";

gsap.registerPlugin(ScrollTrigger);

export default function Skills({ settings }: { settings: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, rotateX: 20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [settings]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const skillsData = settings?.skills?.length 
    ? settings.skills 
    : resumeData.skills.map(s => ({
        category: s.category,
        items: s.items.map(item => item.name)
      }));

  return (
    <section id="skills" className="py-32 relative z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient">
          Conocimientos Técnicos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skillGroup: any, idx: number) => (
            <div
              key={idx}
              ref={addToRefs}
              className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors flex flex-col h-full"
            >
              {/* Glow effect on hover */}
              <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-mono border border-blue-500/30 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {skillGroup.category}
              </h3>

              <div className="flex flex-wrap gap-2 mt-auto">
                {skillGroup.items.map((item: any, i: number) => {
                  const itemName = typeof item === 'string' ? item : item.name;
                  return (
                    <span 
                      key={i}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors cursor-default"
                    >
                      {itemName}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
