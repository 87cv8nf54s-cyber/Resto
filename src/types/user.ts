import type { ColorTheme, TemplateStyle } from "@/lib/themes";

export interface Address {
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  diplomaObtained?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  naam: string;
  bio?: string;
  kvkNumber?: string;
  companyName?: string;
  companyEmail?: string;
  profilePicture?: string;
  logo?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  phoneNumber?: string;
  isPublished?: boolean;
  address?: Address;
  educations: Education[];
  certifications: Certification[];
  workExperiences: WorkExperience[];
  templateStyle?: TemplateStyle;
  colorTheme?: ColorTheme;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileData {
  user: User | null;
}
