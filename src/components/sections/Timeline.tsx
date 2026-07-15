"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { resumeData } from "@/data/resumeData";
import { Settings, Experience, Education } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ settings }: { settings: Settings }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  const addToDots = (el: HTMLDivElement | null) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // Items animation
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Dot fill animation
        const dot = dotsRef.current[i];
        if (dot) {
          const color = dot.getAttribute('data-color') || '#3b82f6';
          gsap.to(dot, {
            backgroundColor: color,
            boxShadow: "0 0 20px " + color,
            scrollTrigger: {
              trigger: item,
              start: "top center",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [settings]);

  const experiences = settings?.experience?.length ? settings.experience : resumeData.experience;
  const education = settings?.education?.length ? settings.education : resumeData.education;

  const parseDate = (dateStr: string) => {
    if (!dateStr) return 0;
    // Support both short (ene, feb) and full (enero, febrero) Spanish month names
    const monthMap: Record<string, number> = {
      "ene": 0, "enero": 0,
      "feb": 1, "febrero": 1,
      "mar": 2, "marzo": 2,
      "abr": 3, "abril": 3,
      "may": 4, "mayo": 4,
      "jun": 5, "junio": 5,
      "jul": 6, "julio": 6,
      "ago": 7, "agosto": 7,
      "sep": 8, "sept": 8, "septiembre": 8,
      "oct": 9, "octubre": 9,
      "nov": 10, "noviembre": 10,
      "dic": 11, "diciembre": 11,
    };
    const yearMatch = dateStr.match(/(\d{4})/);
    if (!yearMatch) return 0;
    const year = parseInt(yearMatch[1], 10);
    const lower = dateStr.toLowerCase();
    let monthIdx = 0;
    for (const [key, val] of Object.entries(monthMap)) {
      if (lower.includes(key)) { monthIdx = val; break; }
    }
    return year * 100 + monthIdx;
  };

  const combinedTimeline = [
    ...experiences.map((e: Experience) => ({ ...e, type: 'experience' })),
    ...education.map((e: Education) => ({ ...e, type: 'education' }))
  ].sort((a, b) => parseDate(a.period || a.date || "") - parseDate(b.period || b.date || ""));


  return (
    <section id="experience" className="py-32 relative z-10" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            Trayectoria
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Main Timeline Line — offset left on mobile, centered on lg+ */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2.5px] rounded-full bg-white/10 -translate-x-1/2">
            <div className="timeline-line absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>

          <div className="space-y-16">
            <div className="mb-24">
              {/* Column Headers (Desktop Only — lg+) */}
              <div className="hidden lg:flex justify-between w-full mb-12 relative z-10">
                <div className="w-5/12 flex justify-end pr-8">
                  <div className="flex items-center gap-3 text-purple-400">
                    <h3 className="text-2xl font-bold">Formación Académica</h3>
                    <GraduationCap size={28} />
                  </div>
                </div>
                <div className="w-2/12" />
                <div className="w-5/12 flex justify-start pl-8">
                  <div className="flex items-center gap-3 text-blue-400">
                    <Briefcase size={28} />
                    <h3 className="text-2xl font-bold">Vida Laboral</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                {combinedTimeline.map((item: Record<string, string>, idx: number) => {
                  const isExp = item.type === 'experience';
                  const isLeft = !isExp;
                  const hexColor = isExp ? '#3b82f6' : '#a855f7';
                  const hoverBorder = isExp ? 'hover:border-blue-500/50' : 'hover:border-purple-500/50';
                  const textColor = isExp ? 'text-blue-400' : 'text-purple-400';
                  const borderColor = isExp ? 'border-blue-500' : 'border-purple-500';

                  return (
                    <div
                      key={idx}
                      ref={addToRefs}
                      className={"relative flex flex-col lg:flex-row items-center justify-between group " + (!isLeft ? 'lg:flex-row-reverse' : '')}
                    >
                      <div className={"hidden lg:flex w-5/12 " + (isLeft ? 'justify-end text-right pr-8' : 'justify-start text-left pl-8')}>
                        <div className={"glass p-6 rounded-2xl w-full border border-white/5 transition-all duration-300 hover:bg-white/5 " + hoverBorder}>
                          <h4 className="text-xl font-bold text-white mb-2">{item.title || item.role || item.degree}</h4>
                          <p className={"font-medium mb-4 " + textColor}>{item.company || item.institution || item.school}</p>
                          <p className="text-gray-400 text-sm whitespace-pre-wrap">{item.description || item.details}</p>
                        </div>
                      </div>

                      <div 
                        ref={addToDots}
                        data-color={hexColor}
                        className={"absolute left-4 lg:left-1/2 w-5 h-5 bg-[#09090b] border-[3px] rounded-full -translate-x-1/2 z-10 transition-all duration-300 group-hover:scale-125 " + borderColor} 
                      />

                      <div className={"flex flex-col w-full lg:w-5/12 mt-4 lg:mt-0 pl-12 lg:pl-0 " + (isLeft ? 'lg:pl-8 lg:justify-start items-start' : 'lg:pr-8 lg:justify-end lg:items-end items-start')}>
                        <div className={"flex items-center gap-2 text-gray-500 font-mono text-sm " + (!isLeft ? 'md:flex-row-reverse' : '')}>
                          <Calendar size={16} />
                          {item.period || item.date}
                        </div>
                        
                        <div className="md:hidden glass p-6 rounded-2xl w-full border border-white/5 mt-4">
                          <span className={"inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 border " + (isExp ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20')}>
                            {isExp ? 'Vida Laboral' : 'Formación Académica'}
                          </span>
                          <h4 className="text-xl font-bold text-white mb-2">{item.title || item.role || item.degree}</h4>
                          <p className={"font-medium mb-4 " + textColor}>{item.company || item.institution || item.school}</p>
                          <p className="text-gray-400 text-sm whitespace-pre-wrap">{item.description || item.details}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
