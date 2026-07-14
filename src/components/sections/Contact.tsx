"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "@/data/resumeData";
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Settings } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ settings }: { settings: Settings }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      if (
        !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ) {
        throw new Error("Faltan las claves de configuración de EmailJS. Por favor, añádelas en el archivo .env.local y en Vercel.");
      }

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setIsSent(true);
      formRef.current?.reset();
      setTimeout(() => setIsSent(false), 5000);
    } catch (error: unknown) {
      console.error("Error enviando email:", error);
      setErrorMsg((error as Error)?.message || "Error de conexión, intenta más tarde.");
      setTimeout(() => setErrorMsg(""), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Toast Notification with unfolding animation */}
      <div 
        className={`fixed top-6 left-6 md:left-10 z-50 transition-all duration-500 transform ${
          isSent ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className={`glass bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded-full flex items-center shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-500 ease-out overflow-hidden ${
            isSent ? "max-w-[280px] delay-500" : "max-w-[48px] delay-0"
          }`}
        >
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <span 
            className={`font-medium whitespace-nowrap transition-all duration-500 ${
              isSent ? "opacity-100 ml-3 delay-500" : "opacity-0 ml-0 delay-0"
            }`}
          >
            ¡Mensaje enviado!
          </span>
        </div>
      </div>

      <section id="contact" className="py-32 relative z-10" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient contact-item">
          Contacto
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Info Side */}
          <div className="space-y-8 contact-item">
            <h3 className="text-3xl font-bold text-white mb-6">Hablemos.</h3>
            <p className="text-gray-400 text-lg mb-8">
              Estoy buscando mi primera oportunidad como Desarrollador Web Junior. Si crees que mi perfil encaja con lo que buscas, no dudes en contactarme.
            </p>

            <div className="space-y-6">
              <a href={`mailto:${settings?.contactEmail || resumeData.personalInfo.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                  <Mail className="text-blue-400" size={20} />
                </div>
                <div>
                  <span className="block text-sm text-gray-500 font-mono uppercase tracking-wider mb-1">Email</span>
                  <span className="text-lg text-gray-200 group-hover:text-blue-400 transition-colors">{settings?.contactEmail || resumeData.personalInfo.email}</span>
                </div>
              </a>

              <a href={`tel:${(settings?.contactPhone || resumeData.personalInfo.phone).replace(/\s+/g, '')}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-colors">
                  <Phone className="text-blue-400" size={20} />
                </div>
                <div>
                  <span className="block text-sm text-gray-500 font-mono uppercase tracking-wider mb-1">Teléfono</span>
                  <span className="text-lg text-gray-200 group-hover:text-blue-400 transition-colors">{settings?.contactPhone || resumeData.personalInfo.phone}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10">
                  <MapPin className="text-blue-400" size={20} />
                </div>
                <div>
                  <span className="block text-sm text-gray-500 font-mono uppercase tracking-wider mb-1">Ubicación</span>
                  <span className="text-lg text-gray-200">{resumeData.personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-8 flex gap-4">
              <a href={settings?.githubUrl || resumeData.personalInfo.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 hover:border-white hover:bg-white/10 transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a href={settings?.linkedinUrl || resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10 hover:border-[#0A66C2] hover:bg-[#0A66C2]/20 transition-all hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white hover:text-[#0A66C2]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass p-8 rounded-3xl border border-white/5 contact-item relative overflow-hidden">
             {/* Decorative glow */}
             <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
             
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
            >
              {/* Hidden Inputs (opcionales para EmailJS, pero evitamos romper nada) */}
              <input type="hidden" name="to_name" value={resumeData.personalInfo.name} />

              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center gap-2">
                  <span className="animate-pulse">⚠️</span> {errorMsg}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Tu nombre completo"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Teléfono (Opcional)</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Tu número de teléfono"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Mensaje</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="¿En qué puedo ayudarte?"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isSent}
                className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group ${
                  isSubmitting
                    ? "bg-blue-600/50 text-white cursor-wait"
                    : isSent
                    ? "bg-green-600 text-white cursor-default"
                    : "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                }`}
              >
                {isSubmitting ? (
                  <span>Enviando...</span>
                ) : isSent ? (
                  <span>Enviado ✓</span>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
