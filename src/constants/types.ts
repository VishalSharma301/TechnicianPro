import { Asset } from "react-native-image-picker";

export type Address = {
  label: string;
  address: string;
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
  name : string;
  mainType: string;
  subType: string | null;
  isMakingNoise: string | null;
  image: string | undefined | null;
  notes: string | undefined | null;
  price : number,
  description : string,
  quantity : number,
  address : string,
  phone : string,
  createdAt : string | null | undefined
};


export type ServiceData = {
   __v: number;
  _id: string;
  basePrice: number;
  category: string;
  createdAt: string;   // ISO date string
  dailyNeed: boolean;
  description: string;
  estimatedTime: string;
  icon: string;
  isActive: boolean;
  mostBooked: boolean;
  name: string;
  popular: boolean;
  quickPick: boolean;
  totalRequests: number;
  updatedAt: string;  
}

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
