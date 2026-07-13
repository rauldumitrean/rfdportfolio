import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schema";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

// Custom structure to make the settings a singleton
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["portfolioSettings"]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schema.types,
    // Filter out actions for singletons so users can't create multiple "Settings"
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Hide the 'Duplicate' and 'Delete' buttons for singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido del Portafolio")
          .items([
            // Singleton Settings Item
            S.listItem()
              .title("Ajustes Globales")
              .id("portfolioSettings")
              .child(S.document().schemaType("portfolioSettings").documentId("portfolioSettings")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
