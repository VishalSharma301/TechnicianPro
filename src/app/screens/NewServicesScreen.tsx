import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import SearchBar from "../components/SearchBar";
import { iconMap, IconName } from "../../util/iconMap";
import ACServiceCard from "../components/AcServiceCard";
import {
  ServiceBrand,
  ServiceCategory,
  ServiceData,
  ServiceOption,
} from "../../constants/types";
import { Ionicons } from "@expo/vector-icons";

// 🧩 --- STATIC CATEGORY DATA --- //
const staticCategories = [
  { id: "ac", name: "AC Service", icon: iconMap["acx" as IconName] },
  { id: "chimney", name: "Chimney", icon: iconMap["kitchen" as IconName] },
  { id: "plumbing", name: "Plumbing", icon: iconMap["pipe-leak" as IconName] },
  {
    id: "electrical",
    name: "Electrical",
    icon: iconMap["power" as IconName],
  },
  {
    id: "carpenter",
    name: "Carpenter",
    icon: iconMap["plumbing" as IconName],
  },
];

// 🧰 --- STATIC SERVICES DATA --- //
// Brand definitions
const serviceBrands: ServiceBrand[] = [
  {
    _id: "brand_1",
    name: "Daikin",
    description: "Premium air conditioning solutions",
    logo: "https://example.com/logos/daikin.png",
  },
  {
    _id: "brand_2",
    name: "Voltas",
    description: "Trusted cooling experts",
    logo: "https://example.com/logos/voltas.png",
  },
  {
    _id: "brand_3",
    name: "Faber",
    description: "Kitchen chimney specialists",
    logo: "https://example.com/logos/faber.png",
  },
  {
    _id: "brand_4",
    name: "Generic",
    description: "Standard service provider",
    logo: "https://example.com/logos/generic.png",
  },
  {
    _id: "brand_5",
    name: "Havells",
    description: "Electrical solutions",
    logo: "https://example.com/logos/havells.png",
  },
  {
    _id: "brand_6",
    name: "IKEA",
    description: "Furniture assembly experts",
    logo: "https://example.com/logos/ikea.png",
  },
];

// Category definitions
const serviceCategories: ServiceCategory[] = [
  {
    _id: "cat_1",
    name: "AC",
    icon: "❄️",
  },
  {
    _id: "cat_2",
    name: "Chimney",
    icon: "🏠",
  },
  {
    _id: "cat_3",
    name: "Plumbing",
    icon: "🔧",
  },
  {
    _id: "cat_4",
    name: "Electrical",
    icon: "⚡",
  },
  {
    _id: "cat_5",
    name: "Carpenter",
    icon: "🪚",
  },
];

// Service options for each service
const acInstallationOptions: ServiceOption[] = [
  {
    _id: "opt_1",
    name: "Standard Installation",
    singlePrice: 400,
    doublePrice: 750,
    triplePrice: 1050,
  },
  {
    _id: "opt_2",
    name: "Premium Installation",
    singlePrice: 600,
    doublePrice: 1100,
    triplePrice: 1500,
  },
];

const gasFillingOptions: ServiceOption[] = [
  {
    _id: "opt_3",
    name: "R22 Gas",
    singlePrice: 600,
    doublePrice: 1100,
    triplePrice: 1500,
  },
  {
    _id: "opt_4",
    name: "R32 Gas",
    singlePrice: 800,
    doublePrice: 1500,
    triplePrice: 2100,
  },
];

const chimneyCleaningOptions: ServiceOption[] = [
  {
    _id: "opt_5",
    name: "Basic Cleaning",
    singlePrice: 500,
    doublePrice: 900,
    triplePrice: 1200,
  },
];

const tapFixingOptions: ServiceOption[] = [
  {
    _id: "opt_6",
    name: "Tap Repair",
    singlePrice: 300,
    doublePrice: 550,
    triplePrice: 750,
  },
];

const leakageRepairOptions: ServiceOption[] = [
  {
    _id: "opt_7",
    name: "Minor Leakage",
    singlePrice: 450,
    doublePrice: 800,
    triplePrice: 1100,
  },
  {
    _id: "opt_8",
    name: "Major Leakage",
    singlePrice: 700,
    doublePrice: 1300,
    triplePrice: 1800,
  },
];

const fanInstallationOptions: ServiceOption[] = [
  {
    _id: "opt_9",
    name: "Ceiling Fan",
    singlePrice: 250,
    doublePrice: 450,
    triplePrice: 600,
  },
];

const furnitureAssemblyOptions: ServiceOption[] = [
  {
    _id: "opt_10",
    name: "Small Furniture",
    singlePrice: 800,
    doublePrice: 1400,
    triplePrice: 1900,
  },
  {
    _id: "opt_11",
    name: "Large Furniture",
    singlePrice: 1200,
    doublePrice: 2200,
    triplePrice: 3000,
  },
];

// Complete service data
const staticServiceData: ServiceData[] = [
  {
    _id: "service_1",
    name: "AC Installation",
    description:
      "Professional air conditioner installation service with warranty",
    estimatedTime: "2-3 hours",
    icon: "🛠️",
    specialty: "Installation",
    slug: "ac-installation",
    subcategoryName: "AC Services",
    mostBooked: true,
    popular: true,
    dailyNeed: false,
    quickPick: false,
    availableInZipcode: true,
    providerCount: 25,
    basePrice: 400,
    category: serviceCategories[0], // AC category
    options: acInstallationOptions,
    brands: [serviceBrands[0]], // Daikin
    subServices: [],
  },
  {
    _id: "service_2",
    name: "Gas Filling",
    description: "AC gas refilling service for optimal cooling performance",
    estimatedTime: "1-2 hours",
    icon: "💨",
    specialty: "Service",
    slug: "gas-filling",
    subcategoryName: "AC Services",
    mostBooked: true,
    popular: true,
    dailyNeed: false,
    quickPick: true,
    availableInZipcode: true,
    providerCount: 30,
    basePrice: 600,
    category: serviceCategories[0], // AC category
    options: gasFillingOptions,
    brands: [serviceBrands[1]], // Voltas
    subServices: [],
  },
  {
    _id: "service_3",
    name: "Chimney Cleaning",
    description: "Deep cleaning service for kitchen chimneys",
    estimatedTime: "1.5-2 hours",
    icon: "🧹",
    specialty: "Cleaning",
    slug: "chimney-cleaning",
    subcategoryName: "Chimney Services",
    mostBooked: false,
    popular: true,
    dailyNeed: false,
    quickPick: false,
    availableInZipcode: true,
    providerCount: 15,
    basePrice: 500,
    category: serviceCategories[1], // Chimney category
    options: chimneyCleaningOptions,
    brands: [serviceBrands[2]], // Faber
    subServices: [],
  },
  {
    _id: "service_4",
    name: "Tap Fixing",
    description: "Quick tap repair and fixing service",
    estimatedTime: "30-45 minutes",
    icon: "🚰",
    specialty: "Repair",
    slug: "tap-fixing",
    subcategoryName: "Plumbing Services",
    mostBooked: true,
    popular: true,
    dailyNeed: true,
    quickPick: true,
    availableInZipcode: true,
    providerCount: 40,
    basePrice: 300,
    category: serviceCategories[2], // Plumbing category
    options: tapFixingOptions,
    brands: [serviceBrands[3]], // Generic
    subServices: [],
  },
  {
    _id: "service_5",
    name: "Leakage Repair",
    description: "Professional water leakage detection and repair",
    estimatedTime: "1-2 hours",
    icon: "💧",
    specialty: "Repair",
    slug: "leakage-repair",
    subcategoryName: "Plumbing Services",
    mostBooked: true,
    popular: true,
    dailyNeed: true,
    quickPick: false,
    availableInZipcode: true,
    providerCount: 35,
    basePrice: 450,
    category: serviceCategories[2], // Plumbing category
    options: leakageRepairOptions,
    brands: [serviceBrands[3]], // Generic
    subServices: [],
  },
  {
    _id: "service_6",
    name: "Fan Installation",
    description: "Ceiling fan installation and setup service",
    estimatedTime: "45 minutes - 1 hour",
    icon: "🌀",
    specialty: "Installation",
    slug: "fan-installation",
    subcategoryName: "Electrical Services",
    mostBooked: false,
    popular: true,
    dailyNeed: false,
    quickPick: true,
    availableInZipcode: true,
    providerCount: 28,
    basePrice: 250,
    category: serviceCategories[3], // Electrical category
    options: fanInstallationOptions,
    brands: [serviceBrands[4]], // Havells
    subServices: [],
  },
  {
    _id: "service_7",
    name: "Furniture Assembly",
    description: "Expert furniture assembly and installation service",
    estimatedTime: "2-4 hours",
    icon: "🪑",
    specialty: "Assembly",
    slug: "furniture-assembly",
    subcategoryName: "Carpenter Services",
    mostBooked: false,
    popular: true,
    dailyNeed: false,
    quickPick: false,
    availableInZipcode: true,
    providerCount: 20,
    basePrice: 800,
    category: serviceCategories[4], // Carpenter category
    options: furnitureAssemblyOptions,
    brands: [serviceBrands[5]], // IKEA
    subServices: [],
  },
];

// Helper function to get services by category
const getServicesByCategory = (categoryName: string): ServiceData[] => {
  return staticServiceData.filter(
    (service) =>
      service.category.name.toLowerCase() === categoryName.toLowerCase()
  );
};

// Export everything
export {
  staticServiceData,
  serviceBrands,
  serviceCategories,
  getServicesByCategory,
};

// 🧩 CATEGORY SELECTOR COMPONENT
interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory?: string;
}

function CategorySelector({
  onSelectCategory,
  selectedCategory,
}: CategorySelectorProps) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      data={staticCategories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isActive = item.id === selectedCategory;
        return (
          <TouchableOpacity
            // activeOpacity={0.8}
            style={[styles.categoryBox, isActive && styles.categoryBoxActive]}
            onPress={() => onSelectCategory(item.id)}
          >
            <View style={styles.iconContainer}>
              <Image
                source={item.icon}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text
              style={[
                styles.categoryText,
                isActive && styles.categoryTextActive,
              ]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

// 🧩 MAIN SCREEN
export default function NewServiceScreen() {
  const [selectedCategory, setSelectedCategory] = useState("ac");

  // Filter service data based on selected category
  const servicesToShow = useMemo(() => {
    return getServicesByCategory(selectedCategory) || [];
  }, [selectedCategory]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(80) }}
      >
        {/* 🔍 Search Bar */}
        <SearchBar />

        {/* 🧩 Category Selector */}
        <View style={{ marginTop: verticalScale(20) }}>
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>

        <View
          style={{
            marginTop: verticalScale(10),
            gap: scale(8),
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {servicesToShow.map((service) =>
            service.options.map((option) => (
              <View
                key={option._id}
                style={{
                  height: verticalScale(52),
                  width: scale(110),
                  borderWidth: 1,
                  borderColor: "#153B93",
                  backgroundColor: "#153B9312",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: scale(8),
                  borderRadius: moderateScale(3),
                }}
              >
                <Image
                  source={require("../../../assets/HandSetting.png")}
                  style={{
                    width: scale(18),
                    height: verticalScale(18),
                    resizeMode: "contain",
                  }}
                />
                <Text style={{ color: "#153B93" }} numberOfLines={1}>
                  {option.name}0
                </Text>
              </View>
            ))
          )}
        </View>

        {/* 💡 Services List */}
        <View style={{ marginTop: verticalScale(10), gap: verticalScale(10) }}>
          {servicesToShow.map((service) => (
            <ACServiceCard service={service} key={service._id} />
            // <View key={service._id} style={styles.serviceCard}>
            //   <Text style={styles.serviceTitle}>{service.name}</Text>
            //   <Text style={styles.serviceSubText}>{service.brands[0].name}</Text>
            //   <View style={styles.priceRow}>
            //     <Text style={styles.servicePrice}>₹{service.basePrice}</Text>
            //     <TouchableOpacity style={styles.addButton}>
            //       <Text style={styles.addButtonText}>Add to Cart</Text>
            //     </TouchableOpacity>
            //   </View>
            // </View>
          ))}
        </View>
        {/* Badges */}
        <View style={styles.badgesRow}>
          <Image
            source={require("../../../assets/popular_services/badges/badge2.png")}
            style={styles.badgeIcon}
          />
          <Image
            source={require("../../../assets/popular_services/badges/badge3.png")}
            style={styles.badgeIcon}
          />
          <Image
            source={require("../../../assets/popular_services/badges/badge1.png")}
            style={styles.badgeIcon}
          />
        </View>

        <View style={styles.ctaRow}>
          <Image
            source={require("../../../assets/popular_services/specs/Frame 4.png")}
            style={{
              width: scale(170),
              aspectRatio: 170 / 100,
            }}
          />
          <Image
            source={require("../../../assets/popular_services/specs/Frame 5.png")}
            style={{
              // width: "43.59%",
              width: scale(170),
              aspectRatio: 170 / 100,
            }}
          />
        </View>
        <View style={{
          height : verticalScale(185),
          width : scale(349),
          backgroundColor : "#fff",
          borderRadius : moderateScale(20),
          marginTop : verticalScale(27),
          // alignItems : 'center',
          paddingLeft : scale(10),
          justifyContent : 'center'
        }}>
          <Image
                  source={require("../../../assets/HomeDesign.png")}
                  style={{
                    width: scale(326),
                    height: verticalScale(164),
                    resizeMode: "contain",
                  }}
                />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🧩 STYLES
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF4FF",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
  },
  scrollContainer: {
    paddingHorizontal: moderateScale(12),
    paddingBottom: verticalScale(10),
  },
  categoryBox: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(6),
    paddingVertical: verticalScale(8),
    // paddingHorizontal: scale(10),
    // borderRadius: 12,
    backgroundColor: "#EFF4FF",
    width: scale(75),
    height: verticalScale(83),
    // borderWidth : 1
  },
  categoryBoxActive: {
    // backgroundColor: "#0046FF20",
    borderBottomWidth: 3,
    borderColor: "#FEA801",
  },
  categoryText: {
    fontSize: moderateScale(11),
    fontWeight: "500",
    color: "#000",
    marginTop: verticalScale(6),
    textAlign: "center",
  },
  categoryTextActive: {
    // color: "#0046FF",
    fontWeight: "600",
  },
  iconContainer: {
    width: scale(35),
    height: scale(35),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: "contain",
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: scale(14),
    marginBottom: verticalScale(12),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    // borderWidth : 1
  },
  serviceTitle: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#333",
  },
  serviceSubText: {
    fontSize: moderateScale(12),
    color: "#777",
    marginVertical: verticalScale(4),
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  servicePrice: {
    fontSize: moderateScale(14),
    color: "#0046FF",
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#0046FF",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
  badgesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(55),
    marginHorizontal: scale(55),
  },
  badgeIcon: { width: scale(73), height: scale(73), resizeMode: "contain" },
  ctaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    // marginHorizontal: scale(20),
  },
});
