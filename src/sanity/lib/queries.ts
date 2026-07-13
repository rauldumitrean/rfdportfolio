import { groq } from "next-sanity";

export const getPortfolioSettingsQuery = groq`
  *[_type == "portfolioSettings"][0] {
    heroTitle,
    heroSubtitle,
    seoTitle,
    seoDescription,
    contactEmail,
    contactPhone,
    githubUrl,
    linkedinUrl,
    experience,
    education,
    skills,
    projects
  }
`;
