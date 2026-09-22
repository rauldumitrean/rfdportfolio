"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resumeData";
import { Settings, SkillCategory } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function Skills({ settings }: { settings: Settings }) {
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

  const skillsData = settings?.skills?.length
    ? settings.skills
    : resumeData.skills.map((s: SkillCategory) => ({
        category: s.category,
        items: s.items?.map((item: unknown) => typeof item === 'string' ? item : ((item as Record<string, string>).name || String(item))) || []
      }));

  return (
    <section id="skills" className="py-32 relative z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient">
          Conocimientos Técnicos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skillGroup: SkillCategory, idx: number) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="glass p-8 rounded-3xl border border-stone-200 relative overflow-hidden group hover:border-amber-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              {/* Warm glow on hover */}
              <div className="absolute top-0 left-0 w-full h-full bg-amber-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

              <h3 className="text-xl font-semibold mb-6 text-[#1C1917] flex items-center gap-3 relative z-10">
                <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-mono border border-amber-200 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {skillGroup.category}
              </h3>

              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {skillGroup.items.map((item: unknown, i: number) => {
                  const itemName = typeof item === 'string' ? item : (item as Record<string, string>).name;
                  return (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-stone-100 border border-stone-200 rounded-lg text-sm text-stone-600 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 transition-colors cursor-default"
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
