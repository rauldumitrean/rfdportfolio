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
    throw new Error("Contraseña incorrecta");
  }

  try {
    const experienceJson = formData.get("experience") as string;
    const educationJson = formData.get("education") as string;
    const skillsJson = formData.get("skills") as string;
    const projectsJson = formData.get("projects") as string;

    const generateKey = (prefix: string, index: number) => `${prefix}_${crypto.randomUUID()}_${index}`;

    // Process Projects and Upload Images if any
    let parsedProjects = projectsJson ? JSON.parse(projectsJson) : [];
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
      experience: experienceJson ? JSON.parse(experienceJson).map((e: any, i: number) => ({...e, _key: generateKey("exp", i)})) : [],
      education: educationJson ? JSON.parse(educationJson).map((e: any, i: number) => ({...e, _key: generateKey("edu", i)})) : [],
      skills: skillsJson ? JSON.parse(skillsJson).map((e: any, i: number) => ({...e, _key: generateKey("skill", i)})) : [],
      projects: parsedProjects,
    };

    await writeClient.createOrReplace(data);
    revalidatePath("/");
  } catch (error) {
    console.error("Error saving to Sanity:", error);
    throw new Error("Failed to save settings");
  }
}
