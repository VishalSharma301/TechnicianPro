import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {moderateScale, scale, verticalScale} from "../../util/scaling"

interface SearchBarProps {
  onPressIcon?: () => void;
}

export default function SearchBar({ onPressIcon }: SearchBarProps) {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={moderateScale(20)} color="#888" />
      <TextInput
        placeholder="Search For Services"
        style={{ flex: 1, marginLeft: scale(10) }}
      />
      <TouchableOpacity onPress={onPressIcon}>
        <Ionicons name="options-outline" size={ moderateScale(20)} color="#888" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: verticalScale(10),
    paddingHorizontal: scale(13),
    height: verticalScale(50),
  },
});
