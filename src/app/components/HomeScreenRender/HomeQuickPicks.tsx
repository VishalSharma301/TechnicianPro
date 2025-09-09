import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "../../../util/scaling";
import { iconMap, IconName } from "../../../util/iconMap";

interface Props {
  quickPickServices: any[];
  onPressItem: (item: any) => void;
}

export default function HomeQuickPick({ quickPickServices, onPressItem }: Props) {
  return (
    <View style={styles.dailyGrid}>
      {quickPickServices.map((item, idx) => (
        <TouchableOpacity key={idx} style={styles.dailyItem} onPress={() => onPressItem(item)}>
          <View style={styles.dailyIcon}>
            <Image source={iconMap[item.icon as IconName] ?? iconMap["default"]} style={{ height: scale(41), width: scale(41), resizeMode: "contain" }} />
          </View>
          <Text style={{ fontSize: moderateScale(12), textAlign: "center" }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dailyGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", marginTop: verticalScale(12), height: verticalScale(232), marginHorizontal: scale(20), width: scale(350), backgroundColor: "white", alignItems: "center", borderRadius: 15, alignSelf: "center" },
  dailyItem: { width: "22%", alignItems: "center", marginTop: verticalScale(34) },
  dailyIcon: { width: scale(40), height: scale(40), borderRadius: 20, marginBottom: 5 },
});
