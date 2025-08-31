import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeImages from "../components/SwipeImages";
import { useNavigation } from "@react-navigation/native";
import ServiceCard from "../components/ServiceCard";
import { popularServices } from "../../util/popularServices";
import PopularServicesCard from "../components/PopularServicesCard";
import { ProfileContext } from "../../store/ProfileContext";
import { AddressContext } from "../../store/AddressContext";
import { dailyNeeds } from "../../util/dailyNeeds";
import { serviceOptions } from "../../util/serviceOptions";
import SearchBar from "../components/SearchBar";
import CategoryComponent from "../components/CategoryComponent";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import { fetchServices } from "../../util/servicesApi";
import { ServicesContext } from "../../store/ServicesContext";
import { ServiceData } from "../../constants/types";

const ASSETS_PATH = "../../../assets/";

const categories = [
  { name: "AC Service", icon: require(`${ASSETS_PATH}ac.png`), basePrice : 111, description : "meow meow"  },
  { name: "Chimney", icon: require(`${ASSETS_PATH}chimney.png`), basePrice : 111, description : "meow meow" },
  { name: "Plumbing", icon: require(`${ASSETS_PATH}plumber.png`), basePrice : 111, description : "meow meow" },
  { name: "Electrical", icon: require(`${ASSETS_PATH}electric.png`), basePrice : 111, description : "meow meow" },
];

const images = [
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { picture, firstName, lastName } = useContext(ProfileContext);
  const { services, setServices } = useContext(ServicesContext);
  const { selectedAddress } = useContext(AddressContext);
  const [loading, setLoading] = useState(false);
  function bookService(service: ServiceData) {
    navigation.navigate("SelectServiceScreen", {
      service: service,
    });
  }

  async function getServices() {
    if (services.length > 0) {
      navigation.navigate("AllServicesScreen");
    } else {
      try {
        setLoading(true)
        const services = await fetchServices({});
        console.log("🔧 Services:", services);
        setServices(services.services);
        setLoading(false)
        navigation.navigate("AllServicesScreen");
      } catch (error) {
        setLoading(false)
        console.error("❌ Failed to get services:", error);
      }
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF4FF" }}>
      {loading && (
        <ActivityIndicator
          size={"large"}
          style={{
            position: "absolute",
            alignSelf: "center",
            zIndex: 999,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          color={"red"}
        />
      )}
      <ScrollView>
        {/* Header */}
        <View style={styles.headerCard}></View>
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="location-outline"
                size={moderateScale(18)}
                color="#000"
              />
              <TouchableOpacity
                onPress={() => navigation.navigate("AddressScreen")}
              >
                <Text style={styles.locationText}>
                  {selectedAddress.label
                    ? `${selectedAddress.label}`
                    : "Allow Location"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.welcomeContainer}
              onPress={() => navigation.navigate("ProfileStack")}
            >
              <Image source={{ uri: picture }} style={styles.avatar} />

              <View>
                <Text style={styles.welcomeText}>Welcome Back!</Text>
                <Text style={styles.username}>
                  {firstName} {lastName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationsScreen")}
                style={{ flex: 1 }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={verticalScale(24)}
                  style={{
                    backgroundColor: "#fff",
                    height: verticalScale(44),
                    width: verticalScale(44),
                    borderRadius: 30,
                    marginLeft: "auto",
                    textAlign: "center",
                    textAlignVertical: "center",
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <SearchBar
            // onPressIcon={() => navigation.navigate("AllServicesScreen")}

            onPressIcon={() => getServices()}
          />
        </View>

        {/* Category Icons */}
        <View style={styles.categoryRow}>
          {categories.map((cat, idx) => (
            <CategoryComponent
              cat={cat}
              key={idx}
              onPress={() => bookService(cat)}
            />
          ))}
        </View>

        {/* Coupon Banner */}
        <View style={styles.couponBanner} >
          <SwipeImages bannerImages={images} />
        </View>

        {/* Most Booked Services */}
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
          Most Booked Services
        </Text>
        <ServiceCard
          image={popularServices[0].image}
          bgcolor={popularServices[0].color}
          description={popularServices[0].description}
          title={popularServices[0].name} 
          originalPrice={popularServices[0].basePrice}
          price={popularServices[0].discountPrice}
          rating={popularServices[0].rating}
          id="1"
          onPressBook={() => bookService(popularServices[0])}
          onPressDetail={() => navigation.navigate("ServiceDetailsScreen", {service : popularServices[0]})}
        />

        {/* Quick Picks */}
        <Text style={[styles.sectionTitle, { marginTop: verticalScale(31) }]}>
          Quick Picks
        </Text>
        <View style={styles.dailyGrid}>
          {dailyNeeds.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.dailyItem}
              onPress={() => {
                bookService(item.name);
              }}
            >
              <View style={styles.dailyIcon}>
                <Image source={item.image} />
              </View>
              <Text
                style={{ fontSize: moderateScale(12), textAlign: "center" }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

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
        <View style={styles.dailyGrid}>
          {dailyNeeds.map((item, idx) => (
            <View key={idx} style={styles.dailyItem}>
              <View style={styles.dailyIcon}>
                <Image source={item.image} />
              </View>
              <Text
                style={{ fontSize: moderateScale(12), textAlign: "center" }}
              >
                {item.name}
              </Text>
            </View>
          ))}
        </View>
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
                bookService(services);
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

        <Image
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
        />
        {/* <View style={styles.referralBanner}>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: "#FBBF24",
    height: verticalScale(263),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // borderWidth : 2,
    width: "100%",
    position: "absolute",
  },

  headerContainer: {
    // backgroundColor:'rgba(104, 94, 69, 0.39)',
    // height: 263,
    paddingTop: verticalScale(22),
    paddingHorizontal: scale(20),
    // borderWidth : 2,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,

    width: "100%",
  },
  headerTop: {
    flexDirection: "column",
    // alignItems: "center",
  },
  locationText: {
    fontWeight: "bold",
    marginLeft: scale(5),
    fontSize: moderateScale(14),
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(16),
    height: verticalScale(44),
    // borderWidth : 1
  },
  avatar: {
    width: verticalScale(44),
    height: verticalScale(44),
    borderRadius: 33,
    marginRight: scale(10),
    borderWidth: moderateScale(1.5),
    borderColor: "white",
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: "#000",
  },
  username: { fontSize: moderateScale(15), fontWeight: "600", color: "#000" },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(29),
    height: verticalScale(132),
    backgroundColor: "#FAFAFA",
    borderRadius: 15,
    marginHorizontal: scale(20),
  },

  couponBanner: {
    // backgroundColor: "#1D4ED8",
    // padding: 16,
    borderRadius: 16,
    marginHorizontal: scale(20),
    marginTop: verticalScale(24),
    marginBottom: verticalScale(50),
    // height: 198,
  },
  hotDeal: { color: "orange", marginBottom: verticalScale(5) },

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

  dailyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: verticalScale(12),
    height: verticalScale(232),
    marginHorizontal: scale(20),
    width: scale(350),
    backgroundColor: "white",
    // alignSelf : 'center',
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center",
    // borderWidth : 1
  },
  dailyItem: {
    width: "22%",
    alignItems: "center",
    marginTop: verticalScale(34),
  },
  dailyIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: 20,
    // backgroundColor: "#eee",
    marginBottom: 5,
  },
});
