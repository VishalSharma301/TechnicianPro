import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import BookingCard from "./TachnicianCard";

const bookingData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

export default function Index() {
  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        data={bookingData}
        renderItem={({ item, index }) => (
         <View style={{ backgroundColor: 'red', height: 200, width: 300 }} />
        )}
        width={scale(350)}
        height={verticalScale(240)}  // Match your card height
        loop
        pagingEnabled
        snapEnabled
        mode="vertical-stack"
        modeConfig={{
          snapDirection: "right",
          stackInterval: 30,     // Bigger number = more visible tail
          scaleInterval: 0.08,   // Smaller values = softer scale effect
          rotateZDeg: 4,         // Slight rotation adds depth
        }}
        customConfig={() => ({
          type: "positive",
          viewCount: 4,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(40),
  },
  cardWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});