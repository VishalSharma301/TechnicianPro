import { Asset } from "react-native-image-picker";

export type Address = {
  label: string;
  address: string;
  phone: string;
};

export type ServiceData = {
  mainType: string;
  subType: string | null;
  isMakingNoise: string | null;
 image: Asset | null | undefined;
  notes: string | undefined | null;
};


export type CartItemData = {
  name : string;
  mainType: string;
  subType: string | null;
  isMakingNoise: string | null;
  image: string | undefined | null;
  notes: string | undefined | null;
  price : number,
  quantity : number
};