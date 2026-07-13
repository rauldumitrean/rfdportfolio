import { defineField, defineType } from "sanity";

export const portfolioSettings = defineType({
  name: "portfolioSettings",
  title: "Ajustes del Portafolio",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Título Principal (Hero)",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtítulo Principal (Hero)",
      type: "text",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    }),
    defineField({
      name: "contactEmail",
      title: "Email de Contacto",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Teléfono de Contacto",
      type: "string",
    }),
    defineField({
      name: "githubUrl",
      title: "URL de GitHub",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "URL de LinkedIn",
      type: "url",
    }),
    // EXPERIENCIA
    defineField({
      name: "experience",
      title: "Experiencia Laboral",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Cargo", type: "string" },
            { name: "company", title: "Empresa", type: "string" },
            { name: "period", title: "Periodo", type: "string" },
            { name: "description", title: "Descripción", type: "text" },
          ],
        },
      ],
    }),
    // EDUCACION
    defineField({
      name: "education",
      title: "Educación",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "degree", title: "Título", type: "string" },
            { name: "institution", title: "Institución", type: "string" },
            { name: "period", title: "Periodo", type: "string" },
            { name: "details", title: "Detalles adicionales", type: "text" },
          ],
        },
      ],
    }),
    // SKILLS
    defineField({
      name: "skills",
      title: "Habilidades Técnicas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "category", title: "Categoría (ej: Frontend)", type: "string" },
            { 
              name: "items", 
              title: "Tecnologías", 
              type: "array", 
              of: [{ type: "string" }] 
            },
          ],
        },
      ],
    }),
    // PROYECTOS
    defineField({
      name: "projects",
      title: "Proyectos Destacados",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Título del Proyecto", type: "string" },
            { name: "description", title: "Descripción", type: "text" },
            { name: "imageUrl", title: "URL de la Imagen", type: "string" },
            { name: "link", title: "Enlace (GitHub o Web)", type: "string" },
            { 
              name: "tags", 
              title: "Tecnologías (Tags)", 
              type: "array", 
              of: [{ type: "string" }] 
            },
          ],
        },
      ],
    }),
  ],
});

export const schema = {
  types: [portfolioSettings],
};
