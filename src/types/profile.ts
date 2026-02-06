export interface ContactDetails {
  email: string;
  linkedIn: string;
  location: string;
  phone?: string;
  website?: string;
}

export interface CompanyDetails {
  name: string;
  kvk?: string;
  btw?: string;
  location: string;
}

export interface PortfolioItem {
  companyName: string;
  description: string;
  startDate: string;
  endDate: string | null;
  linkedInUrl: string;
}

export interface Profile {
  name: string;
  company: CompanyDetails;
  bio: string;
  education: string[];
  photo: string;
  logo: string;
  contact: ContactDetails;
  portfolio: PortfolioItem[];
}
