import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function test() {
  try {
    console.log("Token:", process.env.SANITY_API_TOKEN ? "Exists" : "Missing");
    const data = {
      _type: "portfolioSettings",
      _id: "portfolioSettings",
      heroTitle: "Test",
    };
    await writeClient.createOrReplace(data);
    console.log("Success!");
  } catch (err: any) {
    console.error("Sanity Error:", err.message);
    if (err.details) console.error("Details:", err.details);
  }
}

test();
