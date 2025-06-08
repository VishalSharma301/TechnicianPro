import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type ServiceData = {
  mainType: string;
  subType: string | null;
  isMakingNoise: boolean | null;
  image: string | undefined | null;
  notes: string | undefined | null;
};

interface ServiceTypeContext {
  service: ServiceData;
  setService: Dispatch<SetStateAction<ServiceData>>;
}

export const ServiceTypeContext = createContext<ServiceTypeContext>({
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
