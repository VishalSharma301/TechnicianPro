import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeImages from "../components/SwipeImages";
import { useNavigation } from "@react-navigation/native";
import ServiceCard from "../components/ServiceCard";
// import { popularServices } from "../../util/popularServices";
import PopularServicesCard from "../components/PopularServicesCard";
import { ProfileContext } from "../../store/ProfileContext";
import { AddressContext } from "../../store/AddressContext";
import { serviceOptions } from "../../util/serviceOptions";
import SearchBar from "../components/SearchBar";
import CategoryComponent from "../components/CategoryComponent";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import {
  fetchBrandsByZip,
  fetchServices,
  fetchServicesByZip,
} from "../../util/servicesApi";
import { ServicesContext } from "../../store/ServicesContext";
import { ServiceData } from "../../constants/types";
import { iconMap, IconName } from "../../util/iconMap";
import HomeSearchResults from "../components/HomeScreenRender/HomeSearch";
import HomeCategories from "../components/HomeScreenRender/HomeCategories";
import HomeQuickPick from "../components/HomeScreenRender/HomeQuickPicks";
import HomeHeader from "../components/HomeScreenRender/HomeHeader";
import { Line } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import MostBookedServicesCard from "../components/HomeScreenRender/MostBookedServicesCard";
import OngoingServiceCard from "../components/HomeScreenRender/OngoingServiceCard";
import PartnerImages from "../components/PartnerImages";
import { CartContext } from "../../store/CartContext";
import ACServiceCard from "../components/AcServiceCard";
import Carousel from "react-native-reanimated-carousel";
import VerticalStackCards from "../components/VerticalStackCarousel";
import VerticalStackCarousel from "../components/VerticalStackCarousel";
import VerticalSlider from "../components/VerticalStackCarousel";

const ASSETS_PATH = "../../../assets/";
const zipcode = "140802";

const servicesx = [
  { id: 1, title: "AC Installation", price: "$50" },
  { id: 2, title: "AC Repair", price: "$40" },
  { id: 3, title: "AC Maintenance", price: "$60" },
  { id: 4, title: "AC Gas Refill", price: "$30" },
  { id: 5, title: "AC Cleaning", price: "$45" },
];

const images = [
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const {
    services,
    setServices,
    dailyNeedServices,
    mostBookedServices,
    quickPickServices,
    popularServices,
    servicesByCategory,
    filteredOngoingServices,
    setBrands,
  } = useContext(ServicesContext);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { selectedAddress } = useContext(AddressContext);

  useEffect(() => {
    async function getAllServices() {
      if (services.length > 0) {
        return;
      }
      try {
        setLoading(true);
        const services = await fetchServicesByZip(
          selectedAddress.address.zipcode
        );
        const brands = await fetchBrandsByZip(zipcode);
        console.log("🔧 Services:", services);
        setServices(services.data);
        setBrands(brands.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("❌ Failed to get services:", error);
      }
    }
    getAllServices();
  }, []);

  function bookService(service: ServiceData) {
    navigation.navigate("SelectServiceScreen", {
      service: service,
    });
  }

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    return services.filter((service) => {
      const nameMatch = service.name.toLowerCase().includes(query);
      const descriptionMatch = service.description
        .toLowerCase()
        .includes(query);
      const categoryMatch = service.category.name.toLowerCase().includes(query);

      return (
        (nameMatch || descriptionMatch || categoryMatch) &&
        service.availableInZipcode
      );
    });
  }, [searchQuery, services]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowSearchResults(text.length > 0);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSearchResults(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  useEffect(() => {
    servicesByCategory &&
      console.log("Services by Category:", servicesByCategory["plumbing"]);
  }, []);

  function fetchByCategory(category: string) {
    console.log("Fetching services for category:", category);

    navigation.navigate("AllServicesScreen", { categoryName: category });
  }

  const renderHomeContent = () => (
    <>
      {/* Category Icons */}
      <HomeCategories
        categories={serviceOptions}
        onPressCategory={(cat) => fetchByCategory(cat)}
      />

      {/* Coupon Banner */}
      <View style={styles.couponBanner}>
        <SwipeImages bannerImages={images} />
      </View>

      {/* Most Booked Services */}
      <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
        Most Booked Services
      </Text>
      {/* {mostBookedServices.length > 0 && (
        <ServiceCard
          image={
            iconMap[mostBookedServices[0].icon as IconName] ||
            iconMap["default"]
          }
          // bgcolor={mostBookedServices[0].color || "#FEE4E2"}
          description={mostBookedServices[0].description}
          title={mostBookedServices[0].name}
          originalPrice={mostBookedServices[0].basePrice}
          price={mostBookedServices[0].basePrice}
          rating={mostBookedServices[0].rating || 4.5}
          id={mostBookedServices[0]._id}
          onPressBook={() => bookService(mostBookedServices[0])}
          onPressDetail={() =>
            navigation.navigate("ServiceDetailsScreen", {
              service: mostBookedServices[0],
            })
          }
        />
      )} */}

      <MostBookedServicesCard
        icon="https://cdn-icons-png.flaticon.com/512/1684/1684375.png"
        category={mostBookedServices[0].name}
        price={mostBookedServices[0].basePrice}
        serviceType="AC Services"
        bookingTime="00:15:16"
        previewImage="https://via.placeholder.com/150x80"
        tags={["Split AC", "Windows AC", "Plumber", "Electrician"]}
        amount={mostBookedServices[0].basePrice}
        onBookNow={() => bookService(mostBookedServices[0])}
        onWishlist={() => alert("Added to wishlist!")}
      />

      {filteredOngoingServices.length > 0 && (
        <FlatList
          data={filteredOngoingServices}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OngoingServiceCard item={item} />}
        />
      )}

      {/* Quick Picks */}
      <Text style={[styles.sectionTitle, { marginTop: verticalScale(31) }]}>
        Quick Picks
      </Text>
      <HomeQuickPick
        quickPickServices={quickPickServices}
        onPressItem={(item) => bookService(item)}
      />

      {/* Popular Services */}
      <Text style={styles.sectionTitle}>Popular Services</Text>

      <View style={styles.serviceGrid}>
        {popularServices.map((service, idx) => (
          <PopularServicesCard service={service} key={idx} />
        ))}
      </View>

      <View style={styles.badgeRow}>
        <Image
          source={require("../../../assets/popular_services/badges/badge2.png")}
        />
        <Image
          source={require("../../../assets/popular_services/badges/badge3.png")}
        />
        <Image
          source={require("../../../assets/popular_services/badges/badge1.png")}
        />
      </View>

      <View style={styles.badgeRow}>
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

      <Text style={styles.sectionTitle}>Daily Need</Text>

      <HomeQuickPick
        quickPickServices={dailyNeedServices}
        onPressItem={(item) => bookService(item)}
      />

      <View
        style={{
          flexDirection: "row",
          marginTop: verticalScale(41),
          marginHorizontal: scale(20),
          alignItems: "center",
          justifyContent: "center",
          gap: scale(10),
          width: scale(350),
          // borderWidth : 1,
          overflow: "hidden",
          alignSelf: "center",
          borderRadius: 10,
        }}
      >
        <Image
          source={require(`${ASSETS_PATH}/popular_services/Frame 7.png`)}
          style={{
            width: scale(200),
            aspectRatio: 200 / 95,
            borderRadius: 10,
          }}
        />
        <Image
          source={require(`${ASSETS_PATH}/popular_services/Frame 8.png`)}
          style={{
            width: scale(140),
            aspectRatio: 140 / 95,
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: verticalScale(10),
          marginHorizontal: scale(20),
          alignItems: "center",
          justifyContent: "center",
          gap: scale(10),
          width: scale(350),
          // borderWidth : 2,
          overflow: "hidden",
          alignSelf: "center",
          // borderRadius: 10,
        }}
      >
        <Image
          source={require(`${ASSETS_PATH}/5000s.png`)}
          style={{
            width: scale(140),
            aspectRatio: 140 / 110,
            borderRadius: 10,
          }}
        />
        <Image
          source={require(`${ASSETS_PATH}/check.png`)}
          style={{
            width: scale(200),
            aspectRatio: 200 / 110,
            borderRadius: 10,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: verticalScale(24),
          marginHorizontal: scale(20),
          gap: scale(9),
          // borderWidth : 2
        }}
      >
        {serviceOptions.map((services, idx) => (
          <TouchableOpacity
            onPress={() => {
              fetchByCategory(services.name);
            }}
            key={idx}
            style={{
              height: verticalScale(46),
              width: scale(170),
              // aspectRatio : 170/46,
              borderRadius: 11,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: services.color,
              borderColor: services.borderColor,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: moderateScale(13), fontWeight: "500" }}>
              {services.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <Image
        source={require(`${ASSETS_PATH}/bookNow.png`)}
        style={{
          height: verticalScale(144),
          width: scale(350),
          marginHorizontal: 20,
          alignSelf: "center",
          marginTop: verticalScale(24),
          borderRadius: 10,
          marginBottom: 12,
        }}
      /> */}
      <View
        style={{
          // borderWidth : 1,
          marginHorizontal: scale(20),
          overflow : 'hidden'
        }}
      >
        <PartnerImages />
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF4FF" }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="red" />
          <Text>Loading services...</Text>
        </View>
      ) : services.length === 0 ? ( // ✅ Removed extra `{ }`
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Service Provider available in this area</Text>
        </View>
      ) : (
        <ScrollView>
          {/* Header */}
          <View style={styles.headerCard}>
            <LinearGradient
              colors={["#795FDA", "#403374"]}
              style={{
                height: verticalScale(263),
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                width: scale(390),
                position: "absolute",
              }}
            />
          </View>
          <View style={styles.headerContainer}>
            <HomeHeader />

            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onPressIcon={() => navigation.navigate("AllServicesScreen")}
            />
          </View>

          {showSearchResults
            ? HomeSearchResults({
                filteredServices,
                onClearSearch: clearSearch,
                onPressService: (item) => bookService(item),
                searchQuery,
              })
            : renderHomeContent()}

          <View
            style={{
              flex: 1,
              marginBottom: verticalScale(50),
              // width : 390,
              // borderWidth : 1
              alignItems : 'center'
            
            }}
          >
            

            
          </View>
          <VerticalSlider />
        </ScrollView>
      )}

      {cartItems.length > 0 && (
        <View style={styles.cartBar}>
          <Text style={styles.cartText}>
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            cart
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    // backgroundColor: "#FF9619",
    height: verticalScale(263),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // borderWidth : 2,
    width: "100%",
    position: "absolute",
  },

  headerContainer: {
    paddingTop: verticalScale(22),
    paddingHorizontal: scale(20),
    width: "100%",
    //  backgroundColor: "#FF9619",
  },

  couponBanner: {
    borderRadius: 16,
    marginHorizontal: scale(20),
    marginTop: verticalScale(24),
    marginBottom: verticalScale(50),
  },

  sectionTitle: {
    fontWeight: "600",
    fontSize: moderateScale(20),
    marginHorizontal: scale(20),
    marginTop: verticalScale(43),
    // borderWidth : 1
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: verticalScale(10),
    marginHorizontal: scale(20),
    // borderWidth : 1
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(26),
    marginHorizontal: scale(20),
    // borderWidth : 1,
    gap: scale(10),
  },
  cartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#795FDA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 10, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  viewCartText: {
    color: "gold",
    fontSize: 16,
    fontWeight: "700",
  },
  
});
