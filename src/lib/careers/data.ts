import type { JobOpening } from "./types";

export const jobs: JobOpening[] = [
  {
    slug: "chef-de-partie",
    title: "Chef de Partie",
    department: "Kitchen",
    type: "Full Time",
    location: "Indore",
    experience: "2–4 years",
    schedule: "Evening-led rota",
    salaryNote: "Competitive · based on experience",
    summary: "Own a section, maintain consistency and work closely with the sous chef.",
    description:
      "Join the core kitchen team responsible for precise mise en place, service execution and consistent seasonal dishes.",
    responsibilities: [
      "Run an assigned section during service",
      "Maintain mise en place and prep standards",
      "Support menu trials and seasonal changes",
      "Follow food-safety and hygiene systems",
      "Coach commis chefs during service",
    ],
    requirements: [
      "2+ years in a quality restaurant kitchen",
      "Strong knife and station-management skills",
      "Calm communication under pressure",
      "Comfort with evening and weekend shifts",
    ],
    benefits: [
      "Staff meals",
      "Training and tasting sessions",
      "Uniform support",
      "Career progression reviews",
    ],
    featured: true,
  },
  {
    slug: "restaurant-captain",
    title: "Restaurant Captain",
    department: "Service",
    type: "Full Time",
    location: "Indore",
    experience: "2–5 years",
    schedule: "Dinner + weekend service",
    salaryNote: "Competitive + service incentives",
    summary: "Lead a section of the dining room and create calm, confident guest experiences.",
    description:
      "Guide guests through the menu, coordinate table pacing and support the floor team during busy services.",
    responsibilities: [
      "Lead a dining-room section",
      "Coordinate with kitchen and bar",
      "Handle guest requests and occasions",
      "Support opening and closing procedures",
      "Train junior service team members",
    ],
    requirements: [
      "Fine-dining or premium hospitality experience",
      "Strong spoken communication",
      "Menu and allergen-learning discipline",
      "Professional grooming and calm service style",
    ],
    benefits: [
      "Staff meals",
      "Service training",
      "Recognition incentives",
      "Internal promotion opportunities",
    ],
    featured: true,
  },
  {
    slug: "junior-sommelier",
    title: "Junior Sommelier",
    department: "Wine",
    type: "Full Time",
    location: "Indore",
    experience: "1–3 years",
    schedule: "Dinner service",
    salaryNote: "Based on experience and certification",
    summary: "Support cellar service, pairings and guest-friendly wine conversations.",
    description:
      "Work with the wine team on service, cellar organization, pairings and staff education.",
    responsibilities: [
      "Assist with wine service and pairings",
      "Maintain cellar organization",
      "Prepare wine for events and tastings",
      "Support staff wine education",
      "Track bottle movement in demo inventory systems",
    ],
    requirements: [
      "Strong interest in wine and hospitality",
      "WSET or equivalent study is helpful",
      "Comfort speaking with guests",
      "Attention to storage and service detail",
    ],
    benefits: [
      "Guided tastings",
      "Certification support",
      "Cellar education",
      "Event exposure",
    ],
  },
  {
    slug: "pastry-commis",
    title: "Pastry Commis",
    department: "Pastry",
    type: "Full Time",
    location: "Indore",
    experience: "0–2 years",
    schedule: "Prep + dinner service",
    salaryNote: "Entry-level hospitality package",
    summary: "Build strong pastry fundamentals in a detail-focused kitchen.",
    description:
      "Support dessert preparation, breads, petits fours and seasonal pastry production.",
    responsibilities: [
      "Daily pastry prep",
      "Dessert plating support",
      "Bread and garnish preparation",
      "Station cleaning and labeling",
      "Assist with new dessert trials",
    ],
    requirements: [
      "Basic pastry training or culinary education",
      "Strong attention to detail",
      "Willingness to learn",
      "Reliable mise en place habits",
    ],
    benefits: [
      "Mentorship",
      "Staff meals",
      "Pastry tastings",
      "Structured skill development",
    ],
  },
  {
    slug: "events-coordinator",
    title: "Events Coordinator",
    department: "Events",
    type: "Full Time",
    location: "Indore",
    experience: "2–4 years",
    schedule: "Flexible · event dependent",
    salaryNote: "Competitive",
    summary: "Turn private dining and special events into smooth guest experiences.",
    description:
      "Coordinate enquiries, room setup, menus, timelines and communication across private dining and special events.",
    responsibilities: [
      "Manage incoming event enquiries",
      "Prepare timelines and guest notes",
      "Coordinate kitchen, service and vendors",
      "Support event-day execution",
      "Maintain event follow-up records",
    ],
    requirements: [
      "Hospitality or events experience",
      "Strong written and verbal communication",
      "Excellent organization",
      "Comfort with weekend event schedules",
    ],
    benefits: [
      "Event exposure",
      "Cross-department learning",
      "Staff meals",
      "Performance reviews",
    ],
    featured: true,
  },
  {
    slug: "hospitality-intern",
    title: "Hospitality Intern",
    department: "Operations",
    type: "Internship",
    location: "Indore",
    experience: "Students / freshers",
    schedule: "Rotational",
    salaryNote: "Stipend · demo listing",
    summary: "Learn restaurant operations through structured department rotations.",
    description:
      "A practical hospitality internship covering guest experience, reservations, events and basic restaurant operations.",
    responsibilities: [
      "Support reservation and guest-prep tasks",
      "Shadow service and events teams",
      "Assist with operational checklists",
      "Learn basic restaurant systems",
      "Complete a final improvement project",
    ],
    requirements: [
      "Hospitality student or recent graduate",
      "Curiosity and reliability",
      "Basic English communication",
      "Availability for rotational shifts",
    ],
    benefits: [
      "Completion letter",
      "Department rotations",
      "Mentor check-ins",
      "Staff meals during shifts",
    ],
  },
];

export const careerBenefits = [
  ["Learning", "Regular tastings, briefings and practical skill sessions."],
  ["Growth", "Structured reviews with clear internal progression paths."],
  ["Team Meals", "Staff meals during scheduled restaurant shifts."],
  ["Recognition", "Performance, service and learning milestones are celebrated."],
  ["Exposure", "Events, private dining and chef collaborations expand experience."],
  ["Craft", "Work in an environment built around detail and consistency."],
];

export const cultureValues = [
  ["01", "Calm under pressure", "Good hospitality should feel composed, even when the room is full."],
  ["02", "Details matter", "Small things — timing, temperature, tone and cleanliness — shape the whole experience."],
  ["03", "Teach forward", "Strong team members make the next person stronger."],
  ["04", "Guest first, ego last", "We value confident service without unnecessary theatre."],
  ["05", "Stay curious", "Menus, wine, systems and guest expectations keep changing."],
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}
