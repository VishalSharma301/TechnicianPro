import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { ServiceData } from "../constants/types";

interface ServicesContextProps {
  services: ServiceData[];
  setServices: Dispatch<SetStateAction<ServiceData[]>>;
}

export const ServicesContext = createContext<ServicesContextProps>({
  services: [],
  setServices: () => {},
});

export default function ServicesContextProvider({
  children,
}: PropsWithChildren) {
  const [services, setServices] = useState<ServiceData[]>([]);

  const value = { services, setServices };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}
