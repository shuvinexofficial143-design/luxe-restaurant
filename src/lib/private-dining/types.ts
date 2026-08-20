export type PrivateDiningRoom = {
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  gallery: string[];
  minGuests: number;
  maxGuests: number;
  seated: number;
  standing: number;
  description: string;
  features: string[];
  baseMinimum: number;
  featured?: boolean;
};

export type PrivateDiningPackage = {
  id: string;
  name: string;
  description: string;
  pricePerGuest: number;
  inclusions: string[];
};

export type PrivateDiningInquiry = {
  id: string;
  roomSlug: string;
  roomName: string;
  packageId: string;
  packageName: string;
  guests: number;
  date: string;
  time: string;
  occasion: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  estimatedTotal: number;
  status: "ENQUIRY_RECEIVED";
  createdAt: string;
};
