export const resumeData = {
  personalInfo: {
    name: "Raul Florin",
    role: "Técnico de Soporte IT | Sysadmin Junior",
    email: "raul.dumitrean07@gmail.com",
    phone: "+34 658 545 662",
    location: "Ávila, España",
    github: "https://github.com/rauldumitrean",
    linkedin: "https://www.linkedin.com/in/raul-dumitrean-aa6238414",
    profile:
      "Técnico en SMR especializado en administración de sistemas, redes y ciberseguridad básica. Experiencia práctica en despliegue de servidores, configuración de redes y monitorización mediante IDS (Snort/EFK). Busco mi primera oportunidad como Técnico de Soporte IT o Sysadmin Junior.",
    drivingLicense: "Tipo B",
    availability: "Completa hasta septiembre 2026 · Turno de tarde desde esa fecha",
  },
  experience: [
    {
      role: "Prácticas FCT: Atención al Cliente y Ventas",
      company: "Carrefour",
      location: "Ávila",
      date: "Feb 2026 – Jun 2026",
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
      date: "Sep 2026 – Jun 2028",
      status: "Cursando",
    },
    {
      degree: "FPGM Sistemas Microinformáticos y Redes (SMR)",
      school: "IES Alonso de Madrigal",
      location: "Ávila",
      date: "Sep 2024 – Jun 2026",
      status: "Titulación obtenida",
    },
  ],
  projects: [
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
      category: "Sistemas Operativos",
      items: [
        { name: "Windows", level: "Avanzado" },
        { name: "Linux/Ubuntu Server", level: "Medio" },
        { name: "macOS", level: "Básico" },
      ],
    },
    {
      category: "Redes",
      items: [
        { name: "LAN/WAN", level: "Avanzado" },
        { name: "IDS Config", level: "Medio" },
        { name: "Servidores DHCP", level: "Avanzado" },
        { name: "FTP", level: "Avanzado" },
        { name: "Servidores Web", level: "Medio" },
      ],
    },
    {
      category: "Ciberseguridad",
      items: [
        { name: "Snort", level: "Avanzado" },
        { name: "NIDS", level: "Avanzado" },
        { name: "Detección de Intrusos", level: "Medio" },
        { name: "Análisis de Tráfico", level: "Medio" },
      ],
    },
    {
      category: "SIEM",
      items: [
        { name: "Elasticsearch", level: "Medio" },
        { name: "Filebeat", level: "Medio" },
        { name: "Kibana (EFK)", level: "Medio" },
      ],
    },
    {
      category: "Herramientas",
      items: [
        { name: "Nmap", level: "Avanzado" },
        { name: "systemctl", level: "Avanzado" },
        { name: "Netplan", level: "Avanzado" },
        { name: "Diagnóstico de equipos", level: "Avanzado" },
      ],
    },
  ],
  languages: [
    { language: "Español", level: "Nativo" },
    { language: "Inglés", level: "Nivel medio (B1)" },
  ],
};
