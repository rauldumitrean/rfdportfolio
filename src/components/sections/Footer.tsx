"use client";

import { resumeData } from "@/data/resumeData";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-stone-200 relative z-10 bg-[#FAF7F2]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-stone-400 text-sm">
          © {new Date().getFullYear()} {resumeData.personalInfo.name}. Todos los derechos reservados.
        </div>

        <div className="flex items-center gap-6 text-sm font-mono text-stone-400">
          <a href="#experience" className="hover:text-amber-600 transition-colors">Experiencia</a>
          <a href="#skills" className="hover:text-amber-600 transition-colors">Habilidades</a>
          <a href="#certificates" className="hover:text-amber-600 transition-colors">Certificados</a>
          <a href="#projects" className="hover:text-amber-600 transition-colors">Proyectos</a>
        </div>
      </div>
    </footer>
  );
}
