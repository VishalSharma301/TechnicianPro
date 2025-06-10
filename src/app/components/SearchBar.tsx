import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onPressIcon?: () => void;
}

export default function SearchBar({ onPressIcon }: SearchBarProps) {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color="#888" />
      <TextInput
        placeholder="Search For Services"
        style={{ flex: 1, marginLeft: 10 }}
      />
      <TouchableOpacity onPress={onPressIcon}>
        <Ionicons name="options-outline" size={20} color="#888" />
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
    marginTop: 10,
    paddingHorizontal: 13,
    height: 50,
  },
});
