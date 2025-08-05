const ASSETS_PATH = "../../assets/";

export interface popularServiceProps {
  service: {
    name: string;
    description: string;
    color: string;
    image: any;
    rating: number;
    basePrice: number;
    discountPrice: number;
    onPress: () => void;
  };
}

export const popularServices = [
  {
    name: "Split_AC Services",
    description:
      "Installation, repair, maintenance, and gas refilling for all types of ACs.",
    color: "#658CB226",
    image: require(`${ASSETS_PATH}popular_services/ac.png`),
    rating: 4.5,
    basePrice: 450,
    discountPrice: 300,
    onPress: () => {
      console.log("AC Repair pressed");
    },
  },
  {
    name: "Chimney Services",
    description:
      "Cleaning, servicing, and installation of all major chimney brands.",
    color: "#CD9E5126",
    image: require(`${ASSETS_PATH}popular_services/chimney.png`),
    rating: 4.8,
    basePrice: 450,
    discountPrice: 300,
    onPress: () => {
      console.log("Geyser Installation pressed");
    },
  },
  {
    name: "Plumbing Services",
    description:
      "Leakage fixing, tap replacement, bathroom fittings, and more.",
    color: "#FFFCD899",
    image: require(`${ASSETS_PATH}popular_services/plumber.png`),
    rating: 4.3,
    basePrice: 450,
    discountPrice: 300,
    onPress: () => {
      console.log("Chimney Cleaning pressed");
    },
  },
  {
    name: "Electrecian Services",
    description:
      "Switches, wiring, lighting setup, appliance fitting and general repair.",
    color: "#FFF1EC",
    image: require(`${ASSETS_PATH}popular_services/electric.png`),
    rating: 4.2,
    basePrice: 450,
    discountPrice: 300,
    onPress: () => {
      console.log("Tap Replacement pressed");
    },
  },
];
