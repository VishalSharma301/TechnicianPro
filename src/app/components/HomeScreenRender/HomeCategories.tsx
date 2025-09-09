import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import CategoryComponent from "../CategoryComponent";
import { scale, verticalScale } from "../../../util/scaling";

interface Props {
  categories: any[];
  onPressCategory: (cat: any) => void;
}

export default function HomeCategories({ categories, onPressCategory }: Props) {
  return (
    <View style={styles.categoryRow}>
      {categories.map((cat, idx) => (
        <CategoryComponent cat={cat} key={idx} onPress={() => onPressCategory(cat.name)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(29),
    height: verticalScale(132),
    backgroundColor: "#FAFAFA",
    borderRadius: 15,
    marginHorizontal: scale(20),
  },
});
