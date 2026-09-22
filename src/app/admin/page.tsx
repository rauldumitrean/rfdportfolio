import { client } from "@/sanity/lib/client";
import { getPortfolioSettingsQuery } from "@/sanity/lib/queries";
import { Settings } from "lucide-react";
import Link from "next/link";
import AdminClientForm from "./AdminClientForm";
import { resumeData } from "@/data/resumeData";

export const revalidate = 0; // Don't cache the admin page

export default async function AdminDashboard() {
  let settings = null;
  try {
    settings = await client.fetch(getPortfolioSettingsQuery);
  } catch (error) {
    console.warn("Failed to fetch Sanity settings in admin, using fallback data:", error);
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] p-8 font-sans selection:bg-amber-200 selection:text-amber-900">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Settings className="text-amber-600" />
              Panel de Control Avanzado
            </h1>
            <p className="text-stone-500 mt-2">Gestiona el 100% del contenido de tu portafolio</p>
          </div>
          <Link href="/" className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white transition border border-stone-200 text-sm font-medium shadow-sm">
            Ver Portafolio
          </Link>
        </header>

        <AdminClientForm settings={settings} fallbackData={resumeData} />
      </div>
    </div>
  );
}
