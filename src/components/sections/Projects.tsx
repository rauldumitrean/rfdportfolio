"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resumeData";
import { ExternalLink, ShieldAlert, Server, Code2 } from "lucide-react";
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

  const projectsData = settings?.projects?.length
    ? settings.projects
    : resumeData.projects.map((p) => ({
        title: p.title,
        description: p.description.join("\n"),
        tags: p.technologies,
        githubUrl: p.githubUrl || undefined,
        liveUrl: p.liveUrl || undefined,
        date: p.date,
        context: p.context,
        imageUrl: p.imageUrl || undefined,
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
              ref={(el) => { projectsRef.current[idx] = el; }}
              className="flex flex-col lg:flex-row items-center gap-12 group"
            >
              {/* Project Image */}
              <div className={`w-full lg:w-1/2 overflow-hidden rounded-3xl border border-stone-200 relative aspect-video bg-gradient-to-br from-amber-50 to-orange-50 shadow-md group-hover:shadow-xl transition-shadow duration-500 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="absolute inset-0 bg-amber-400/5 z-10 group-hover:bg-transparent transition-colors duration-500" />

                <div className="project-img absolute inset-[-10%] w-[120%] h-[120%] flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100/80 via-orange-50 to-stone-50">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                      <Server size={120} className="text-amber-200 absolute" />
                      <ShieldAlert size={60} className="text-amber-600 animate-pulse" />
                    </div>
                  )}
                </div>

                {project.context && (
                  <div className="absolute bottom-4 left-4 z-20 glass px-4 py-2 rounded-full text-xs font-mono text-amber-700 border border-amber-200 shadow-sm">
                    {project.context}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                {project.date && (
                  <span className="text-amber-600 font-mono text-sm tracking-wider uppercase mb-4 block">
                    {project.date}
                  </span>
                )}
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1917] group-hover:text-amber-700 transition-colors">
                  {project.title}
                </h3>

                <div className="glass p-6 rounded-2xl border border-stone-200 mb-8 w-full relative z-20 shadow-sm">
                  <p className="text-stone-500 text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags?.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-stone-100 rounded-full text-xs font-mono text-stone-600 border border-stone-200 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {project.githubUrl && project.githubUrl !== "#" ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver código fuente de ${project.title} en GitHub`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 rounded-full font-medium hover:scale-105 hover:border-stone-400 transition-all shadow-sm"
                    >
                      <Code2 size={18} /> Ver Código
                    </a>
                  ) : project.githubUrl === "#" ? (
                    <span className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 text-stone-400 border border-stone-200 rounded-full font-medium cursor-not-allowed">
                      <Code2 size={18} /> Código no disponible
                    </span>
                  ) : null}

                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar el proyecto ${project.title}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 hover:scale-105 hover:shadow-[0_8px_25px_rgba(217,119,6,0.40)] transition-all"
                    >
                      Ver Proyecto <ExternalLink size={18} />
                    </a>
                  ) : project.liveUrl === "#" ? (
                    <span className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 text-stone-400 rounded-full font-medium cursor-not-allowed">
                      Ver Proyecto <ExternalLink size={18} />
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
