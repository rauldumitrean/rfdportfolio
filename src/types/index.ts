export interface PersonalInfo {
  name: string;
  profile: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export interface Experience {
  _key?: string;
  role?: string;
  title?: string;
  company: string;
  date?: string;
  period?: string;
  description: string;
}

export interface Education {
  _key?: string;
  degree: string;
  school?: string;
  institution?: string;
  date?: string;
  period?: string;
  description?: string;
  details?: string;
}

export interface SkillCategory {
  _key?: string;
  category: string;
  items: string[];
}

export interface Project {
  _key?: string;
  title: string;
  context?: string;
  date?: string;
  technologies?: string[];
  tags?: string[];
  description: string | string[];
  imageUrl?: string;
  localPreviewUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
}

export interface Settings {
  _type: string;
  _id: string;
  heroTitle?: string;
  heroSubtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: SkillCategory[];
  projects?: Project[];
}
