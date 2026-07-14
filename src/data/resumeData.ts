export const resumeData = {
  personalInfo: {
    name: "Raul Florin",
    role: "Desarrollador Web Junior | Estudiante de DAW",
    email: "raul.dumitrean07@gmail.com",
    phone: "+34 658 545 662",
    location: "Ávila, España",
    github: "https://github.com/rauldumitrean",
    linkedin: "https://www.linkedin.com/in/raul-dumitrean-aa6238414",
    profile:
      "Apasionado por la programación y el diseño de interfaces. Próximo estudiante del Grado Superior en Desarrollo de Aplicaciones Web (DAW) con sólida base técnica en Sistemas (SMR). Busco mi primera oportunidad como Desarrollador Frontend o Fullstack Junior para seguir aprendiendo y aportando valor mediante código limpio y soluciones modernas.",
    drivingLicense: "Tipo B",
    availability: "Completa hasta septiembre 2026 - Turno de tarde desde esa fecha",
  },
  experience: [
    {
      role: "Prácticas FCT: Atención al Cliente y Ventas",
      company: "Carrefour",
      location: "Ávila",
      date: "Feb 2026 - Jun 2026",
      tasks: [
        "Gestión de devoluciones e incidencias en mostrador de atención al cliente.",
        "Asesoramiento técnico a clientes en la sección de tecnología e informática.",
        "Resolución de consultas y problemas planteados por clientes.",
      ],
    },
  ],
  education: [
    {
      degree: "FPGS Desarrollo de Aplicaciones Web (DAW)",
      school: "IES Alonso de Madrigal",
      location: "Ávila",
      date: "Sep 2026 - Jun 2028",
      status: "Cursando",
    },
    {
      degree: "FPGM Sistemas Microinformáticos y Redes (SMR)",
      school: "IES Alonso de Madrigal",
      location: "Ávila",
      date: "Sep 2024 - Jun 2026",
      status: "Titulación obtenida",
    },
  ],
  projects: [
    {
      title: "Portfolio Personal Interactivo",
      context: "Proyecto de Desarrollo Web",
      date: "2026",
      technologies: ["React", "Next.js", "Tailwind CSS", "GSAP", "TypeScript", "Sanity CMS", "Git", "Vercel"],
      description: [
        "Desarrollo de un portafolio web moderno y responsivo para mostrar proyectos y trayectoria profesional.",
        "Implementación de animaciones avanzadas y fluidas utilizando GSAP y ScrollTrigger.",
        "Integración de un panel de administración personalizado (CMS Headless) utilizando Sanity para gestionar el contenido dinámicamente sin tocar código.",
        "Diseño UI/UX con Tailwind CSS enfocado en la usabilidad, modo oscuro y estética minimalista.",
        "Despliegue automatizado en Vercel mediante CI/CD con GitHub.",
        "Gestión de formularios de contacto conectada a correos electrónicos en tiempo real.",
      ],
    },
    {
      title: "Sistema de Detección de Intrusos con Snort",
      context: "Proyecto Final de Ciclo SMR",
      date: "2026",
      technologies: ["Ubuntu Server", "Netplan", "Snort", "NIDS", "EFK", "Elasticsearch", "Filebeat", "Kibana", "Nmap", "ICMP"],
      description: [
        "Despliegue de Ubuntu Server con configuración de interfaces de red mediante Netplan.",
        "Instalación y configuración de Snort en modo NIDS para monitorización de tráfico en tiempo real.",
        "Definición de reglas de detección de amenazas: escaneos de puertos, accesos no autorizados y tráfico anómalo.",
        "Implementación de stack EFK (Elasticsearch, Filebeat y Kibana) como sistema SIEM para visualización de alertas.",
        "Configuración de Filebeat para envío de logs de Snort a Elasticsearch.",
        "Fase de pruebas con ataques controlados mediante Nmap e inundaciones ICMP para validar detección.",
        "Proyecto realizado de forma individual.",
      ],
    },
  ],
  certifications: [
    "Certificado de Formación de Nivel Básico en Prevención de Riesgos Laborales (2026)",
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        { name: "HTML/CSS", level: "Avanzado" },
        { name: "JavaScript", level: "Medio" },
        { name: "React / Next.js", level: "Medio" },
        { name: "Tailwind", level: "Avanzado" },
      ],
    },
    {
      category: "Backend & Bases de Datos",
      items: [
        { name: "PHP", level: "Básico" },
        { name: "Node.js", level: "Básico" },
        { name: "SQL / MySQL", level: "Medio" },
        { name: "CMS (Sanity)", level: "Medio" },
      ],
    },
    {
      category: "Herramientas de Desarrollo",
      items: [
        { name: "Git / GitHub", level: "Medio" },
        { name: "Vercel", level: "Medio" },
        { name: "VS Code", level: "Avanzado" },
        { name: "Figma (UI/UX)", level: "Básico" },
      ],
    },
    {
      category: "Sistemas & Redes (SMR)",
      items: [
        { name: "Windows / Linux", level: "Avanzado" },
        { name: "Gestión de Redes", level: "Medio" },
        { name: "Soporte IT", level: "Avanzado" },
      ],
    },
    {
      category: "Soft Skills",
      items: [
        { name: "Resolución de problemas", level: "Avanzado" },
        { name: "Trabajo en equipo", level: "Avanzado" },
        { name: "Adaptabilidad", level: "Avanzado" },
      ],
    },
  ],
  languages: [
    { language: "Español", level: "Nativo" },
    { language: "Inglés", level: "Nivel medio (B1)" },
  ],
};
