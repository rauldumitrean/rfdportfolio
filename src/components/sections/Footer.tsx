"use client";

import { resumeData } from "@/data/resumeData";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 relative z-10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} {resumeData.personalInfo.name}. Todos los derechos reservados.
        </div>
        
        <div className="flex items-center gap-6 text-sm font-mono text-gray-500">
          <a href="#experience" className="hover:text-blue-400 transition-colors">Experiencia</a>
          <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-blue-400 transition-colors">Proyectos</a>
        </div>
      </div>
    </footer>
  );
}
