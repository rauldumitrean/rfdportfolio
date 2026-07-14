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
  title: "Raul Florin | Portfolio",
  description: "Portafolio personal de Raul Florin, Desarrollador Web Junior y estudiante de Desarrollo de Aplicaciones Web (DAW).",
  keywords: ["Desarrollador Web", "Frontend", "DAW", "Portfolio", "Raul Florin", "React", "Next.js"],
  authors: [{ name: "Raul Florin" }],
  creator: "Raul Florin",
  openGraph: {
    title: "Raul Florin | Portfolio",
    description: "Portafolio personal de Raul Florin, Desarrollador Web Junior y estudiante de Desarrollo de Aplicaciones Web (DAW).",
    url: "https://raulflorin.dev",
    siteName: "Raul Florin Portfolio",
    locale: "es_ES",
    type: "website",
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
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white selection:bg-blue-500/30 selection:text-white`}
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
