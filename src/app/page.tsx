import dynamic from "next/dynamic";
import { client } from "@/sanity/lib/client";
import { getPortfolioSettingsQuery } from "@/sanity/lib/queries";

// Static imports for above-the-fold or lightweight components
import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";

// Dynamic imports for heavy or below-the-fold components (Lazy loading)
const Background3D = dynamic(() => import("@/components/canvas/Background3D"));
const Timeline = dynamic(() => import("@/components/sections/Timeline"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  let settings = null;
  try {
    settings = await client.fetch(getPortfolioSettingsQuery);
  } catch (error) {
    console.warn("Failed to fetch Sanity settings, using fallback data:", error);
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      <Background3D />
      
      <Hero settings={settings} />
      <Timeline settings={settings} />
      <Skills settings={settings} />
      <Projects settings={settings} />
      <Contact settings={settings} />
      
      <Footer />
    </main>
  );
}
