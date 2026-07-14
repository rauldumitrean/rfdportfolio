import { client } from "@/sanity/lib/client";
import { getPortfolioSettingsQuery } from "@/sanity/lib/queries";
import { Settings } from "lucide-react";
import Link from "next/link";
import AdminClientForm from "./AdminClientForm";
import { resumeData } from "@/data/resumeData";

export const revalidate = 0; // Don't cache the admin page

export default async function AdminDashboard() {
  const settings = await client.fetch(getPortfolioSettingsQuery);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Settings className="text-blue-500" />
              Panel de Control Avanzado
            </h1>
            <p className="text-gray-400 mt-2">Gestiona el 100% del contenido de tu portafolio</p>
          </div>
          <Link href="/" className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10 text-sm">
            Ver Portafolio
          </Link>
        </header>

        <AdminClientForm settings={settings} fallbackData={resumeData} />
      </div>
    </div>
  );
}
