import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";


const partners = [
  { id: "1", logo: require("../../../assets/x1.png") },
  { id: "2", logo: require("../../../assets/x1.png") },
  { id: "3", logo: require("../../../assets/x1.png") },
  { id: "4", logo: require("../../../assets/x1.png") },
];

export default function PartnerImages({ title = "Our Partners" }) {
  return (
    <View style={styles.partnerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Carousel
        mode="horizontal-stack"
           modeConfig={{
        moveSize: 390,
        stackInterval: 30,
        scaleInterval: 0.08,
        rotateZDeg: 135,
        snapDirection: 'left',
    }}
        loop
        autoPlay
        autoPlayInterval={2000}
        width={350}
        height={60}
        data={partners}
        renderItem={({ item }) => (
          <Image source={item.logo} style={styles.logo} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  partnerContainer: {
    paddingVertical: 10,
    // borderTopWidth: 1,
    // borderColor: "#ddd",
    // backgroundColor: "#fff",
    alignItems: "center",
    marginVertical : 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  logo: {
    width: 390,
    height: 50,
    resizeMode: "cover",
  },
});
