const ASSETS_PATH = "../../assets/"

export const dailyNeeds = [
  {
    name: "Tap Service",
    image: require(`${ASSETS_PATH}dailyNeeds/5.png`),
    onPress: () => console.log("Tap Service pressed"),
  },
  {
    name: "TDS Checker",
    image: require(`${ASSETS_PATH}dailyNeeds/2.png`),
    onPress: () => console.log("TDS Checker pressed"),
  },
  {
    name: "R.O. Services",
    image: require(`${ASSETS_PATH}dailyNeeds/1.png`),
    onPress: () => console.log("R.O. Services pressed"),
  },
  {
    name: "Fan Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/8.png`),
    onPress: () => console.log("Fan Repair pressed"),
  },
  {
    name: "Washing M. Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/6.png`),
    onPress: () => console.log("Washing Machine Repair pressed"),
  },
  {
    name: "Gyser Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/7.png`),
    onPress: () => console.log("Gyser Repair pressed"),
  },
  {
    name: "Gas Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/3.png`),
    onPress: () => console.log("Gas Repair pressed"),
  },
  {
    name: "Iron Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/4.png`),
    onPress: () => console.log("Iron Repair pressed"),
  },
];