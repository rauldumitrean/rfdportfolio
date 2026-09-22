import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "rfdportfolio",
  description: "Portfolio de Raul Dumitrean, Desarrollador Web especializado en frontend y tecnologías modernas (React, Next.js). Descubre mis últimos proyectos y experiencia.",
  keywords: ["Desarrollador Web", "Programador Frontend", "Portfolio Web", "Raul Dumitrean", "React", "Next.js", "Desarrollo de Aplicaciones Web", "España"],
  authors: [{ name: "Raul Dumitrean" }],
  creator: "Raul Dumitrean",
  metadataBase: new URL("https://rfdportfolio.vercel.app"),
  openGraph: {
    title: "rfdportfolio",
    description: "Portfolio de Raul Dumitrean. Echa un vistazo a mis últimos proyectos web, experiencia y tecnologías que utilizo en mi día a día.",
    url: "https://rfdportfolio.vercel.app",
    siteName: "Portfolio de Raul Dumitrean",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "Portfolio de Raul Dumitrean",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "rfdportfolio",
    description: "Echa un vistazo a mi portfolio como Desarrollador Web. Proyectos, tecnologías y trayectoria.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-[#FAF7F2] text-[#1C1917] selection:bg-amber-200 selection:text-amber-900">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
