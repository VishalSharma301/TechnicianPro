import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { ServiceData } from "../constants/types";



interface ServiceTypeContextProps {
  service: ServiceData;
  setService: Dispatch<SetStateAction<ServiceData>>;
}

export const ServiceTypeContext = createContext<ServiceTypeContextProps>({
  setService: () => {},
  service: {
    image: null,
    isMakingNoise: null,
    mainType: "Split AC",
    notes: null,
    subType: null,
  },
});

export default function ServiceTypeContextProvider({
  children,
}: PropsWithChildren) {
  const [service, setService] = useState<ServiceData>({
    image: null,
    isMakingNoise: null,
    mainType: "Split AC",
    notes: null,
    subType: null,
  });

  const value = { service, setService };

  return (
    <ServiceTypeContext.Provider value={value}>
      {children}
    </ServiceTypeContext.Provider>
  );
}
