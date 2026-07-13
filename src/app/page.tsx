import { client } from "@/sanity/lib/client";
import { getPortfolioSettingsQuery } from "@/sanity/lib/queries";
import Background3D from "@/components/canvas/Background3D";
import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  const settings = await client.fetch(getPortfolioSettingsQuery);

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
