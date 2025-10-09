import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { scale, verticalScale } from "../../util/scaling";
import BookingCard from "./TachnicianCard";

const data = [1, 2, 3, 4, 5];

export default function CarouselTest() {
  const ref = useRef<ICarouselInstance>(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        data={data}
        width={scale(350)}
        height={verticalScale(310)}
        loop
        pagingEnabled
        snapEnabled
        mode="vertical-stack"
        modeConfig={{
          snapDirection: "right",
          stackInterval: -25, // Bigger number = more visible tail
          scaleInterval: 0.08, // Smaller values = softer scale effect
        }}
        customConfig={() => ({
          type: "negative",
          viewCount: 4,
        })}
        renderItem={({ index }) => (
          //   <View style={[styles.card, { backgroundColor: colors[index % colors.length] }]}>
          //     <Text style={styles.text}>Card {index + 1}</Text>
          //   </View>
          <BookingCard />
        )}
      />
    </View>
  );
}

const colors = ["#FF4C4C", "#FFA64C", "#4CFF4C", "#4C4CFF", "#FF4CFF"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: verticalScale(210),
    // borderWidth: 1,
    alignItems : 'center',
    overflow : 'hidden'
    // position : 'absolute'
    // justifyContent: "flex-end",
    // alignItems: "center",
  },

});
