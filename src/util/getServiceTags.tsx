import { ServiceDetailsData } from "../constants/types";

 export function getServiceTags(serviceDetails: ServiceDetailsData) {
    return [
      serviceDetails.mainType,
      serviceDetails.subType,
      serviceDetails.isMakingNoise !== null
        ? serviceDetails.isMakingNoise == "No"
          ? "No Noise"
          : "Making Noise"
        : null,
      serviceDetails.image ? "Image Added" : "No Image",
      serviceDetails.notes ? "Note Added" : "No Notes",
    ].filter((tag) => tag !== null && tag !== "");
  }