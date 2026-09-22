"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Award } from "lucide-react";
import { resumeData } from "@/data/resumeData";
import { Settings, Certificate } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function Certificates({ settings }: { settings: Settings }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [settings]);

  const certData = settings?.certificates?.length
    ? settings.certificates
    : resumeData.certificates || [];

  if (certData.length === 0) return null;

  return (
    <section id="certificates" className="py-24 relative z-10" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient">
          Certificados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certData.map((cert: Certificate, idx: number) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="glass p-8 rounded-3xl border border-stone-200 relative overflow-hidden group hover:border-amber-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full bg-white/60"
            >
              {/* Subtle hover background */}
              <div className="absolute inset-0 bg-amber-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 shadow-sm border border-amber-200">
                  {cert.svgIcon ? (
                    <div 
                      className="w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                      dangerouslySetInnerHTML={{ __html: cert.svgIcon }}
                    />
                  ) : (
                    <Award size={28} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#1C1917] mb-2 group-hover:text-amber-700 transition-colors">
                  {cert.title}
                </h3>
                
                <p className="text-amber-600 font-medium mb-1">{cert.issuer}</p>
                <p className="text-stone-400 font-mono text-sm mb-6">{cert.date}</p>

                <div className="mt-auto pt-4 border-t border-stone-100">
                  {cert.url && cert.url !== "#" ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 font-medium transition-colors text-sm"
                    >
                      Ver Credencial <ExternalLink size={16} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-stone-300 font-medium text-sm">
                      Credencial Interna
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
