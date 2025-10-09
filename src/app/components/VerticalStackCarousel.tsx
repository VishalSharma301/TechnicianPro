import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, Dimensions, Easing } from "react-native";
import { moderateScale, scale, verticalScale } from "../../util/scaling";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = verticalScale(250);

const cardsData = [
  { id: "1", title: "AC Services", bg: "#3fb4c6" },
  { id: "2", title: "Plumbing Services", bg: "#f27c7c" },
  { id: "3", title: "Cleaning Services", bg: "#abd774" },
  { id: "4", title: "Kitchen Services", bg: "#79d9a8" },
];

function RandomCard({ title, bg } : { title : string, bg : string}) {
  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function VerticalSliderWithAnimatedStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const transition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(transition, {
        toValue: 1,
        duration: 750,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => (prev + 1) % cardsData.length);
        transition.setValue(0);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, transition]);

  return (
    <View style={styles.container}>
      <View style={{ height: CARD_HEIGHT * 2, overflow: "visible" }}>
        {cardsData.map((item, index) => {
          const position = (index - currentIndex + cardsData.length) % cardsData.length;

          // Calculate interpolated values
          const scaleStart = position === 0 ? 1 : Math.max(0.9 - position * 0.05, 0.7);
          const scaleEnd = position === 0 ? Math.max(0.9 - position * 0.05, 0.7) : 1;
          const scaleValue = transition.interpolate({
            inputRange: [0, 1],
            outputRange: [scaleStart, scaleEnd],
          });

          const translateYStart = position === 0 ? 0 : -verticalScale(30) * position;
          const translateYEnd = position === 0 ? -verticalScale(30) * position : 0;
          const translateYValue = transition.interpolate({
            inputRange: [0, 1],
            outputRange: [translateYStart, translateYEnd],
          });

          const opacityStart = position === 0 ? 1 : 0.5;
          const opacityEnd = position === 0 ? 0.5 : 1;
          const opacityValue = transition.interpolate({
            inputRange: [0, 1],
            outputRange: [opacityStart, opacityEnd],
          });

          const zIndex = cardsData.length - position;

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.cardWrapper,
                {
                  position: "absolute",
                  top: CARD_HEIGHT*0.5,
                  left: width*-0.4,
                  right: 0,
                  transform: [
                    { translateY: translateYValue },
                    { scale: scaleValue },
                  ],
                  opacity: opacityValue,
                  zIndex,
                  width: scale(width * 0.8),
                },
              ]}
            >
              <RandomCard title={item.title} bg={item.bg} />
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(40),
    alignItems: "center",
  },
  cardWrapper: {
    height: CARD_HEIGHT,
    borderRadius: moderateScale(15),
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(10),
    shadowOffset: { width: 0, height: moderateScale(5) },
    overflow: "hidden",
  },
  card: {
    flex: 1,
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(28),
    color: "#fff",
    fontWeight: "bold",
  },
});
