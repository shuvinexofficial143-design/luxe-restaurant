export type JobDepartment =
  | "Kitchen"
  | "Service"
  | "Wine"
  | "Pastry"
  | "Events"
  | "Operations";

export type JobType = "Full Time" | "Part Time" | "Internship";

export type JobOpening = {
  slug: string;
  title: string;
  department: JobDepartment;
  type: JobType;
  location: string;
  experience: string;
  schedule: string;
  salaryNote: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  featured?: boolean;
};

export type CareerApplication = {
  id: string;
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  portfolioUrl: string;
  message: string;
  resumeName: string;
  status: "RECEIVED" | "REVIEW" | "INTERVIEW" | "OFFER" | "CLOSED";
  createdAt: string;
};
