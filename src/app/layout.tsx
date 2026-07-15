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
  title: "Raul Dumitrean | Portfolio",
  description: "Portafolio personal de Raul Dumitrean, Desarrollador Web Junior y estudiante de Desarrollo de Aplicaciones Web (DAW).",
  keywords: ["Desarrollador Web", "Frontend", "DAW", "Portfolio", "Raul Dumitrean", "React", "Next.js"],
  authors: [{ name: "Raul Dumitrean" }],
  creator: "Raul Dumitrean",
  metadataBase: new URL("https://rfdportfolio.vercel.app"),
  openGraph: {
    title: "Raul Dumitrean | Portfolio",
    description: "Portafolio personal de Raul Dumitrean, Desarrollador Web Junior y estudiante de Desarrollo de Aplicaciones Web (DAW).",
    url: "https://rfdportfolio.vercel.app",
    siteName: "Raul Dumitrean Portfolio",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "Raul Dumitrean — Desarrollador Web Junior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raul Dumitrean | Portfolio",
    description: "Portafolio personal de Raul Dumitrean, Desarrollador Web Junior.",
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
