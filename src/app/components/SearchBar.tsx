import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onPressIcon?: () => void;
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  onPressIcon, 
  searchQuery = "",
  onSearchChange,
  onFocus,
  placeholder = "Search For Services"
}: SearchBarProps) {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={moderateScale(20)} color="#888" />
      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={onSearchChange}
        onFocus={onFocus}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => onSearchChange?.("")}>
          <Ionicons name="close-circle" size={moderateScale(18)} color="#888" />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onPressIcon} style={styles.filterButton}>
        <Ionicons name="options-outline" size={moderateScale(20)} color="#888" />
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
  searchInput: {
    flex: 1,
    marginLeft: scale(10),
    fontSize: moderateScale(14),
    color: "#000",
  },
  filterButton: {
    marginLeft: scale(8),
  },
});