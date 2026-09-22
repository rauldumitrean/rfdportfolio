"use server";

import { client } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

const writeClient = client.withConfig({
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function savePortfolioSettings(formData: FormData) {
  const password = formData.get("adminPassword");
  
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Contraseña incorrecta o no configurada en el servidor." };
  }

  try {
    const experienceJson = formData.get("experience") as string;
    const educationJson = formData.get("education") as string;
    const skillsJson = formData.get("skills") as string;
    const projectsJson = formData.get("projects") as string;
    const certificatesJson = formData.get("certificates") as string;

    const generateKey = (prefix: string, index: number) => `${prefix}_${crypto.randomUUID()}_${index}`;

    // Process Projects and Upload Images if any
    const parsedProjects = projectsJson ? JSON.parse(projectsJson) : [];
    for (let i = 0; i < parsedProjects.length; i++) {
      const file = formData.get(`projectImage_${i}`) as File | null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const asset = await writeClient.assets.upload('image', buffer, { filename: file.name });
        parsedProjects[i].imageUrl = asset.url;
      } else {
        // Keep existing if not updated
        parsedProjects[i].imageUrl = formData.get(`existingImageUrl_${i}`) as string || undefined;
      }
      delete parsedProjects[i].localPreviewUrl;
      parsedProjects[i]._key = generateKey("proj", i);
    }

    const data = {
      _type: "portfolioSettings",
      _id: "portfolioSettings",
      heroTitle: formData.get("heroTitle") as string || undefined,
      heroSubtitle: formData.get("heroSubtitle") as string || undefined,
      seoTitle: formData.get("seoTitle") as string || undefined,
      seoDescription: formData.get("seoDescription") as string || undefined,
      contactEmail: formData.get("contactEmail") as string || undefined,
      contactPhone: formData.get("contactPhone") as string || undefined,
      githubUrl: formData.get("githubUrl") as string || undefined,
      linkedinUrl: formData.get("linkedinUrl") as string || undefined,
      experience: experienceJson ? JSON.parse(experienceJson).map((e: Record<string, unknown>, i: number) => ({...e, _key: generateKey("exp", i)})) : [],
      education: educationJson ? JSON.parse(educationJson).map((e: Record<string, unknown>, i: number) => ({...e, _key: generateKey("edu", i)})) : [],
      skills: skillsJson ? JSON.parse(skillsJson).map((e: Record<string, unknown>, i: number) => ({...e, _key: generateKey("skill", i)})) : [],
      projects: parsedProjects,
      certificates: certificatesJson ? JSON.parse(certificatesJson).map((e: Record<string, unknown>, i: number) => ({...e, _key: generateKey("cert", i)})) : [],
    };

    await writeClient.createOrReplace(data);
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving to Sanity:", error);
    
    // Check if it's a default project ID error
    if (error?.message?.includes("default-project-id")) {
      return { error: "Falta configurar Sanity. El proyecto está usando 'default-project-id'. Añade las variables de entorno NEXT_PUBLIC_SANITY_PROJECT_ID y SANITY_API_TOKEN en Vercel." };
    }
    
    return { error: error?.message || "Ocurrió un error al guardar en la base de datos." };
  }
}
