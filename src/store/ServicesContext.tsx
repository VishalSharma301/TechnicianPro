import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { ServiceData } from "../constants/types";

export type ServiceAddress = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  coordinates: {
    lat: number;
    lon: number;
  };
};

export type OngoingService = {
  __v: number;
  _id: string;
  address: ServiceAddress;
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



type ServicesContextProps = {
  services: ServiceData[];
  setServices: Dispatch<SetStateAction<ServiceData[]>>;

  ongoingServices: OngoingService[];
  setOngoingServices: Dispatch<SetStateAction<OngoingService[]>>;
};

export const ServicesContext = createContext<ServicesContextProps>({
  services: [],
  setServices: () => {},
  ongoingServices: [],
  setOngoingServices: () => {},
});

export default function ServicesContextProvider({
  children,
}: PropsWithChildren) {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [ongoingServices, setOngoingServices] = useState<OngoingService[]>([]);

  const value = {
    services,
    setServices,
    ongoingServices,
    setOngoingServices,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}
