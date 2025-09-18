import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ServicesContext } from "../../store/ServicesContext";
import { iconMap, IconName } from "../../util/iconMap";
import ServiceCard from "../components/ServiceCard";
import { scale, verticalScale, moderateScale } from "../../util/scaling";
import ScreenHeader from "../components/ScreenHeader";
import { Ionicons } from "@expo/vector-icons";

type RouteParams = {
  categoryName?: string;
};

export default function AllServicesScreen() {
  const { servicesByCategory, services } = useContext(ServicesContext);
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
  const requestedCategory = route.params?.categoryName;
  console.log("Requested Category:", requestedCategory);

  // Track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => {
    // ✅ CHANGED: auto-expand requested category if provided
    return requestedCategory ? [requestedCategory] : [];
  });

  useEffect(() => {
    if (requestedCategory && Object.keys(servicesByCategory).length > 0) {
      const matchedCategory = Object.keys(servicesByCategory).find(
        (cat) => cat.toLowerCase() === requestedCategory.toLowerCase()
      );
      if (matchedCategory) {
        setExpandedCategories([matchedCategory]);
      }
    }
  }, [requestedCategory, servicesByCategory]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  if (!services || services.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading services...</Text>
      </View>
    );
  }

  // ✅ CHANGED: Use categoriesToShow instead of looping all categories
  const categoriesToShow = requestedCategory
    ? Object.entries(servicesByCategory).filter(
        ([categoryName]) =>
          categoryName.toLowerCase() === requestedCategory.toLowerCase()
      )
    : Object.entries(servicesByCategory);

  return (
    <View style={styles.root}>
      <ScreenHeader name={`${requestedCategory+" "}Services`} rightIcon={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {categoriesToShow.map(([categoryName, services]) => {
          const isExpanded = expandedCategories.includes(categoryName);

          return (
            <View key={categoryName} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => toggleCategory(categoryName)}
              >
                <Text style={styles.categoryTitle}>
                  {categoryName.toUpperCase()} ({services.length})
                </Text>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={moderateScale(20)}
                  color="#333"
                />
              </TouchableOpacity>

              {isExpanded && (
                <FlatList
                  data={services}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <ServiceCard
                      key={item._id}
                      bgcolor="#fff"
                      description={item.description}
                      id={item._id}
                      image={
                        iconMap[item.icon as IconName] || iconMap["default"]
                      }
                      onPressBook={() => {
                        navigation.navigate("SelectServiceScreen", {
                          service: item,
                        });
                      }}
                      price={item.basePrice}
                      originalPrice={item.originalPrice || item.basePrice}
                      rating={item.rating || 4.5}
                      title={item.name}
                      onPressDetail={() => {
                        navigation.navigate("ServiceDetailScreen", {
                          service: item,
                        });
                      }}
                    />
                  )}
                  scrollEnabled={false}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffffff",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  categoryContainer: {
    marginBottom: verticalScale(20),
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    // elevation: 2,
    borderWidth: 1,
    borderColor: "#eee",
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(12),
    backgroundColor: "#fff",
    borderRadius: 10,
    // marginBottom: verticalScale(8),
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  categoryTitle: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    flex: 1,
  },
});
