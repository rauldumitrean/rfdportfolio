"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resumeData";
import { ExternalLink, ShieldAlert, Server } from "lucide-react";
import { Settings, Project } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ settings }: { settings: Settings }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectsRef.current.forEach((project) => {
        if (!project) return;
        
        gsap.fromTo(
          project,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Parallax image
        const img = project.querySelector(".project-img");
        if (img) {
          gsap.fromTo(
            img,
            { y: -50, scale: 1.1 },
            {
              y: 50,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: project,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [settings]);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  const projectsData = settings?.projects?.length 
    ? settings.projects 
    : resumeData.projects.map((p) => ({
        title: p.title,
        description: p.description.join("\n"),
        tags: p.technologies,
        link: "#",
        date: p.date,
        context: p.context
      }));

  return (
    <section id="projects" className="py-32 relative z-10" ref={containerRef}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center text-gradient">
          Proyectos Destacados
        </h2>

        <div className="space-y-32">
          {projectsData.map((project: Project, idx: number) => (
            <div
              key={idx}
              ref={addToRefs}
              className="flex flex-col lg:flex-row items-center gap-12 group"
            >
              {/* Project Image/Visualizer */}
              <div className={`w-full lg:w-1/2 overflow-hidden rounded-3xl border border-white/10 relative aspect-video bg-[#0a0a0a] ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Abstract visualization for the project since we don't have a real image */}
                <div className="project-img absolute inset-[-10%] w-[120%] h-[120%] flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black bg-cover bg-center" style={project.imageUrl ? { backgroundImage: `url(${project.imageUrl})` } : {}}>
                  {!project.imageUrl && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      <Server size={120} className="text-blue-500/20 absolute" />
                      <ShieldAlert size={60} className="text-blue-400 animate-pulse" />
                    </div>
                  )}
                </div>

                {project.context && (
                  <div className="absolute bottom-4 left-4 z-20 glass px-4 py-2 rounded-full text-xs font-mono text-blue-300 border border-blue-500/30">
                    {project.context}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                {project.date && (
                  <span className="text-blue-500 font-mono text-sm tracking-wider uppercase mb-4 block">
                    {project.date}
                  </span>
                )}
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <div className="glass p-6 rounded-2xl border border-white/5 mb-8 w-full relative z-20">
                  <p className="text-gray-400 text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags?.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-gray-300 border border-white/10 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <div className="flex items-center gap-4">
                    <a
                      href={project.link === "#" ? "#" : project.link}
                      target={project.link === "#" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform"
                      onClick={(e) => { if (project.link === "#") e.preventDefault() }}
                    >
                      {project.link === "#" ? "Ver Proyecto" : "Ver Código"} <ExternalLink size={18} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
