import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Address } from "../constants/types";


const initialAddresses : Address[] = [
  {
    label: "Home",
    address: "Bassi Pathana, India",
    phone: "+91-2454657787",
  },
  {
    label: "Home",
    address: "Morinda",
    phone: "+91-5436578755",
  },
  {
    label: "Work",
    address: "Chandigarh",
    phone: "+91-97653445334",
  },
];

interface AddressContext {
  addresses: Address[];
  setAddresses: Dispatch<SetStateAction<Address[]>>;
  selectedAddress: Address;
  setSelectedAddress: Dispatch<SetStateAction<Address>>;
}

export const AddressContext = createContext<AddressContext>({
  addresses: [],
  setAddresses: () => {},
  selectedAddress: {
    label: "",
    address: "",
    phone: "",
  },
  setSelectedAddress: () => {},
});

export default function AddressContextProvider({
  children,
}: PropsWithChildren) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState({
    label: "",
    address: "",
    phone: "",
  });

  const value = {
    addresses,
    selectedAddress,
    setAddresses,
    setSelectedAddress,
  };

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}
