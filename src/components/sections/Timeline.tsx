"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Calendar, ChevronRight } from "lucide-react";
import { resumeData } from "@/data/resumeData";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ settings }: { settings: any }) {
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
      });

      // Dots fill animation
      dotsRef.current.forEach((dot) => {
        if (!dot) return;
        const color = dot.getAttribute('data-color') || '#3b82f6';
        gsap.to(dot, {
          backgroundColor: color,
          boxShadow: `0 0 20px ${color}`,
          scrollTrigger: {
            trigger: dot,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [settings]);

  const experiences = settings?.experience?.length ? settings.experience : resumeData.experience;
  const education = settings?.education?.length ? settings.education : resumeData.education;

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
          {/* Main Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
            <div className="timeline-line absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>

          <div className="space-y-16">
            {/* Experience Section */}
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <Briefcase className="text-blue-500" size={28} />
                <h3 className="text-2xl font-semibold">Experiencia Laboral</h3>
              </div>
              
              <div className="space-y-12">
                {experiences.map((exp: any, idx: number) => (
                  <div
                    key={idx}
                    ref={addToRefs}
                    className="relative flex flex-col md:flex-row items-center justify-between group"
                  >
                    <div className="hidden md:flex w-5/12 justify-end text-right pr-8">
                      <div className="glass p-6 rounded-2xl w-full border border-white/5 transition-all duration-300 hover:border-blue-500/50 hover:bg-white/5">
                        <h4 className="text-xl font-bold text-white mb-2">{exp.title || exp.role}</h4>
                        <p className="text-blue-400 font-medium mb-4">{exp.company}</p>
                        <p className="text-gray-400 text-sm whitespace-pre-wrap">{exp.description}</p>
                      </div>
                    </div>

                    <div 
                      ref={addToDots}
                      data-color="#3b82f6"
                      className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#09090b] border-2 border-blue-500 rounded-full -translate-x-1/2 z-10 transition-all duration-300 group-hover:scale-150" 
                    />

                    <div className="flex w-full md:w-5/12 justify-start pl-12 md:pl-8 mt-4 md:mt-0">
                      <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                        <Calendar size={16} />
                        {exp.period || exp.date}
                      </div>
                      
                      {/* Mobile Card */}
                      <div className="md:hidden glass p-6 rounded-2xl w-full border border-white/5 mt-4">
                        <h4 className="text-xl font-bold text-white mb-2">{exp.title || exp.role}</h4>
                        <p className="text-blue-400 font-medium mb-4">{exp.company}</p>
                        <p className="text-gray-400 text-sm whitespace-pre-wrap">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <div className="flex items-center gap-4 mb-8 justify-center">
                <GraduationCap className="text-purple-500" size={28} />
                <h3 className="text-2xl font-semibold">Formación Académica</h3>
              </div>

              <div className="space-y-12">
                {education.map((edu: any, idx: number) => (
                  <div
                    key={idx}
                    ref={addToRefs}
                    className="relative flex flex-col md:flex-row-reverse items-center justify-between group"
                  >
                    <div className="hidden md:flex w-5/12 justify-start text-left pl-8">
                      <div className="glass p-6 rounded-2xl w-full border border-white/5 transition-all duration-300 hover:border-purple-500/50 hover:bg-white/5">
                        <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                        <p className="text-purple-400 font-medium mb-4">{edu.institution || edu.school}</p>
                        <p className="text-gray-400 text-sm whitespace-pre-wrap">{edu.details}</p>
                      </div>
                    </div>

                    <div 
                      ref={addToDots}
                      data-color="#a855f7"
                      className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#09090b] border-2 border-purple-500 rounded-full -translate-x-1/2 z-10 transition-all duration-300 group-hover:scale-150" 
                    />

                    <div className="flex w-full md:w-5/12 justify-end pr-12 md:pr-8 mt-4 md:mt-0">
                      <div className="flex items-center gap-2 text-gray-500 font-mono text-sm flex-row-reverse md:flex-row">
                        <Calendar size={16} />
                        {edu.period || edu.date}
                      </div>

                      {/* Mobile Card */}
                      <div className="md:hidden glass p-6 rounded-2xl w-full border border-white/5 mt-4">
                        <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                        <p className="text-purple-400 font-medium mb-4">{edu.institution || edu.school}</p>
                        <p className="text-gray-400 text-sm whitespace-pre-wrap">{edu.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
