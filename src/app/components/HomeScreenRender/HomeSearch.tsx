import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "../../../util/scaling";
import { iconMap, IconName } from "../../../util/iconMap";
import { ServiceData } from "../../../constants/types";

interface Props {
  filteredServices: ServiceData[];
  searchQuery: string;
  onPressService: (service: ServiceData) => void;
  onClearSearch: () => void;
}

export default function HomeSearchResults({ filteredServices, searchQuery, onPressService, onClearSearch }: Props) {
  return (
    <View style={styles.searchResultsContainer}>
      <View style={styles.searchHeader}>
        <Text style={styles.resultsCount}>
          {filteredServices.length} services found for "{searchQuery}"
        </Text>
        <TouchableOpacity onPress={onClearSearch}>
          <Text style={styles.clearSearchText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredServices}
        scrollEnabled={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.searchResultItem} onPress={() => onPressService(item)}>
            <View style={styles.serviceIcon}>
              <Image source={iconMap[item.icon as IconName] ?? iconMap["default"]} style={{ width: 30, height: 30, resizeMode: "contain" }} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <Text style={styles.serviceDescription} numberOfLines={2}>{item.description}</Text>
              <View style={styles.serviceDetails}>
                <Text style={styles.servicePrice}>₹{item.basePrice}</Text>
                <Text style={styles.serviceTime}>{item.estimatedTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptySearchContainer}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.emptySearchText}>No services found</Text>
            <Text style={styles.emptySearchSubtext}>Try different keywords or browse categories below</Text>
          </View>
        }
      />
    </View>
  );
}

// Styles are almost identical to your current styles
const styles = StyleSheet.create({
  searchResultsContainer: { paddingHorizontal: scale(16), paddingVertical: verticalScale(16) },
  searchHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: verticalScale(16) },
  resultsCount: { fontSize: moderateScale(14), color: "#666", flex: 1 },
  clearSearchText: { fontSize: moderateScale(14), color: "#007AFF", fontWeight: "600" },
  searchResultItem: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 12, padding: scale(16), marginBottom: verticalScale(12), shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  serviceIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#F0F8FF", justifyContent: "center", alignItems: "center", marginRight: scale(12) },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: moderateScale(16), fontWeight: "600", color: "#000", marginBottom: verticalScale(4) },
  serviceDescription: { fontSize: moderateScale(13), color: "#666", marginBottom: verticalScale(8) },
  serviceDetails: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  servicePrice: { fontSize: moderateScale(16), fontWeight: "700", color: "#007AFF" },
  serviceTime: { fontSize: moderateScale(12), color: "#999" },
  emptySearchContainer: { alignItems: "center", paddingVertical: verticalScale(48) },
  emptySearchText: { fontSize: moderateScale(18), fontWeight: "600", color: "#666", marginTop: verticalScale(16), marginBottom: verticalScale(8) },
  emptySearchSubtext: { fontSize: moderateScale(14), color: "#999", textAlign: "center" },
});
