import { ServiceData } from "../constants/types";

 export function getServiceTags(service: ServiceData) {
    return [
      service.mainType,
      service.subType,
      service.isMakingNoise !== null
        ? service.isMakingNoise == "No"
          ? "No Noise"
          : "Making Noise"
        : null,
      service.image ? "Image Added" : "No Image",
      service.notes ? "Note Added" : "No Notes",
    ].filter((tag) => tag !== null && tag !== "");
  }