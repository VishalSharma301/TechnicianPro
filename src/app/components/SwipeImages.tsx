import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import {scale, moderateScale, verticalScale} from "../../util/scaling"

const { width } = Dimensions.get("window");

interface BannerSliderProps {
  bannerImages: ImageSourcePropType[];
}

const SwipeImages: React.FC<BannerSliderProps> = ({ bannerImages }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / 400);
    setCurrentIndex(slide);
  };

  return (
    <View style={styles.sliderContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        ref={scrollRef}
        scrollEventThrottle={20}
      >
        {bannerImages.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {bannerImages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    // marginVertical: 20,
    // gap : 20
  },
  image: {
    width: scale(350),
    aspectRatio : 350/178,
    overflow: "hidden",
    borderRadius: moderateScale(15),
    // gap : 20
    // marginRight : scale(1),
    // marginLeft : 20

  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(14),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
    
  },
  activeDot: {
    backgroundColor: "#000",
  },
});

export default SwipeImages;
