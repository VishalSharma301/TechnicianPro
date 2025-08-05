import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { ServiceDetailsData } from "../constants/types";



interface ServiceTypeContextProps {
  serviceDetails: ServiceDetailsData;
  setServiceDetails: Dispatch<SetStateAction<ServiceDetailsData>>;
}

export const ServiceDetailContext = createContext<ServiceTypeContextProps>({
  setServiceDetails: () => {},
  serviceDetails: {
    image: null,
    isMakingNoise: null,
    mainType: "Split AC",
    notes: null,
    subType: null,
  },
});

export default function ServiceDetailContextProvider({
  children,
}: PropsWithChildren) {
  const [serviceDetails, setServiceDetails] = useState<ServiceDetailsData>({
    image: null,
    isMakingNoise: null,
    mainType: "Split AC",
    notes: null,
    subType: null,
  });

  const value = { serviceDetails, setServiceDetails };

  return (
    <ServiceDetailContext.Provider value={value}>
      {children}
    </ServiceDetailContext.Provider>
  );
}
