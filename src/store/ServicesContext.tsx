import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
  useMemo,
  useContext,
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
  // Original state
  services: ServiceData[];
  setServices: Dispatch<SetStateAction<ServiceData[]>>;
  ongoingServices: OngoingService[];
  setOngoingServices: Dispatch<SetStateAction<OngoingService[]>>;
  
  // Memoized filtered services
  quickPickServices: ServiceData[];
  popularServices: ServiceData[];
  mostBookedServices: ServiceData[];
  dailyNeedServices: ServiceData[];
  activeServices: ServiceData[];
  servicesByCategory: { [key: string]: ServiceData[] };
  
  // Memoized filtered ongoing services
  
  // pendingServices: OngoingService[];
  // acceptedServices: OngoingService[];
  // inProgressServices: OngoingService[];
  // completedServices: OngoingService[];
  
  // Loading and error states (optional)
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
};

export const ServicesContext = createContext<ServicesContextProps>({
  services: [],
  setServices: () => {},
  ongoingServices: [],
  setOngoingServices: () => {},
  quickPickServices: [],
  popularServices: [],
  mostBookedServices: [],
  dailyNeedServices: [],
  activeServices: [],
  servicesByCategory: {},
  // pendingServices: [],
  // acceptedServices: [],
  // inProgressServices: [],
  // completedServices: [],
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
});

export default function ServicesContextProvider({
  children,
}: PropsWithChildren) {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [ongoingServices, setOngoingServices] = useState<OngoingService[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized filtered services - only recalculate when services array changes
  const activeServices = useMemo(() => 
    services.filter(service => service.isActive), 
    [services]
  );

  const quickPickServices = useMemo(() => 
    services.filter(service => service.quickPick && service.isActive), 
    [services]
  );

  const popularServices = useMemo(() => 
    services.filter(service => service.popular && service.isActive), 
    [services]
  );

  const mostBookedServices = useMemo(() => 
    services.filter(service => service.mostBooked && service.isActive), 
    [services]
  );

  const dailyNeedServices = useMemo(() => 
    services.filter(service => service.dailyNeed && service.isActive), 
    [services]
  );

  // Group services by category - only recalculate when services change
  const servicesByCategory = useMemo(() => {
    const categorized: { [key: string]: ServiceData[] } = {};
    services
      .filter(service => service.isActive)
      .forEach(service => {
        if (!categorized[service.category]) {
          categorized[service.category] = [];
        }
        categorized[service.category].push(service);
      });
    return categorized;
  }, [services]);

  // Memoized filtered ongoing services - only recalculate when ongoingServices changes
  // const pendingServices = useMemo(() => 
  //   ongoingServices.filter(service => service.status === "pending"), 
  //   [ongoingServices]
  // );

  // const acceptedServices = useMemo(() => 
  //   ongoingServices.filter(service => service.status === "accepted"), 
  //   [ongoingServices]
  // );

  // const inProgressServices = useMemo(() => 
  //   ongoingServices.filter(service => service.status === "in-progress"), 
  //   [ongoingServices]
  // );

  // const completedServices = useMemo(() => 
  //   ongoingServices.filter(service => service.status === "completed"), 
  //   [ongoingServices]
  // );

  const value = {
    // Original state
    services,
    setServices,
    ongoingServices,
    setOngoingServices,
    
    // Memoized filtered services
    activeServices,
    quickPickServices,
    popularServices,
    mostBookedServices,
    dailyNeedServices,
    servicesByCategory,
    
    // Memoized filtered ongoing services
    // pendingServices,
    // acceptedServices,
    // inProgressServices,
    // completedServices,
    
    // Loading and error states
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}

// Custom hook for easier usage
export const useServices = (): ServicesContextProps => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesContextProvider');
  }
  return context;
};
