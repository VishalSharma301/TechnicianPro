import { Asset } from "react-native-image-picker";

export type Coordinates = {
  lat: number;
  lon: number;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  coordinates: Coordinates;
};

export type AddressCardType = {
  label: string;
  address: Address;
  phone: string;
};

export type ServiceDetailsData = {
  mainType: string;
  subType: string | null;
  isMakingNoise: string | null;
  image: Asset | null | undefined;
  notes: string | undefined | null;
};

export type ItemData = {
  _id : string
  name: string;
  mainType: string;
  subType: string | null;
  isMakingNoise: string | null;
  image: string | undefined | null;
  notes: string | undefined | null;
  price: number;
  description: string;
  quantity: number;
  address: Address;
  phone: string;
  createdAt: string | null | undefined;
};

export type OngoingService = {
  __v: number;
  _id: string;
  address: Address;
  completionPin: string;
  createdAt: string; // ISO string
  notes: string;
  pinVerified: boolean;
  requestSubmittedAt: string; // ISO string
  scheduledDate: string; // ISO string
  service: string | null; // could be populated later
  status: "pending" | "accepted" | "in-progress" | "completed" | "cancelled";
  user: string; // userId
  zipcode: string;
};

export type UserProfile = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  zipcode?: string;
  name?: string;
  isVerified: boolean;
  isNewUser: boolean;
  previousRequests: any[]; // can refine if backend defines request schema
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v?: number;
};

export type NotificationData = {
  id: string;
  title: string;
  body: string;
  data?: any;
  receivedAt: string;
  read: boolean;
};

type ServiceCategory = {
  _id: string;
  icon: string;
  name: string;
};

type ServiceOption = {
  // Define fields based on what [Object] actually contains
  // Example:
  _id: string;
  name: string;
  price?: number;
};

export type ServiceBrand = {
  // Define fields for a brand item
  // Example:
  _id: string;
  name: string;
  logo?: string;
  description: string;
};

export type ServiceData = {
  _id: string;
  availableInZipcode: boolean;
  basePrice: number;
  brands: ServiceBrand[];
  category: ServiceCategory;
  dailyNeed: boolean;
  description: string;
  estimatedTime: string;
  icon: string;
  mostBooked: boolean;
  name: string;
  options: ServiceOption[];
  popular: boolean;
  providerCount: number;
  quickPick: boolean;
  slug: string;
  specialty: string;
  subServices: []; // Or a different type if subservices are simpler
  subcategoryName: string;
};

// export type ServiceData = {
//   __v: number;
//   _id: string;
//   basePrice: number;
//   category: string;
//   createdAt: string; // ISO date string
//   dailyNeed: boolean;
//   description: string;
//   estimatedTime: string;
//   icon: string;
//   isActive: boolean;
//   mostBooked: boolean;
//   name: string;
//   popular: boolean;
//   quickPick: boolean;
//   totalRequests: number;
//   updatedAt: string;
//   rating: number | string | undefined;
// };

