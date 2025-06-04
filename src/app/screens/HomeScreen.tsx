import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SwipeImages from "../components/SwipeImages";
import { useNavigation } from "@react-navigation/native";
import BookNowButton from "../../ui/BookNowButton";
import ServiceCard from "../components/ServiceCard";
import { popularServices } from "../../util/popularServices";
import PopularServicesCard from "../components/PopularServicesCard";
import { ProfileContext } from "../../store/ProfileContext";
import { AddressContext } from "../../store/AddressContext";

const ASSETS_PATH = "../../../assets/";

const categories = [
  { name: "AC Service", icon: require(`${ASSETS_PATH}ac.png`) },
  { name: "Chimney", icon: require(`${ASSETS_PATH}chimney.png`) },
  { name: "Plumbing", icon: require(`${ASSETS_PATH}plumber.png`) },
  { name: "Electrical", icon: require(`${ASSETS_PATH}electric.png`) },
];

const images = [
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
];

export const dailyNeeds = [
  {
    name: "Tap Service",
    image: require(`${ASSETS_PATH}dailyNeeds/5.png`),
    onPress: () => console.log("Tap Service pressed"),
  },
  {
    name: "TDS Checker",
    image: require(`${ASSETS_PATH}dailyNeeds/2.png`),
    onPress: () => console.log("TDS Checker pressed"),
  },
  {
    name: "R.O. Services",
    image: require(`${ASSETS_PATH}dailyNeeds/1.png`),
    onPress: () => console.log("R.O. Services pressed"),
  },
  {
    name: "Fan Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/8.png`),
    onPress: () => console.log("Fan Repair pressed"),
  },
  {
    name: "Washing M. Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/6.png`),
    onPress: () => console.log("Washing Machine Repair pressed"),
  },
  {
    name: "Gyser Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/7.png`),
    onPress: () => console.log("Gyser Repair pressed"),
  },
  {
    name: "Gas Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/3.png`),
    onPress: () => console.log("Gas Repair pressed"),
  },
  {
    name: "Iron Repair",
    image: require(`${ASSETS_PATH}dailyNeeds/4.png`),
    onPress: () => console.log("Iron Repair pressed"),
  },
];

const serviceOptions = [
  {
    name: "AC Services",
    borderColor: "#89ACFF",
    color: "#E4ECFF",
    onPress: () => console.log("Tap Service pressed"),
  },
  {
    name: "Chimney",
    borderColor: "#EDD8A1",
    color: "#FFFBF0",
    onPress: () => console.log("TDS Checker pressed"),
  },
  {
    name: "Electrical Services",
    borderColor: "#CCEDC1",
    color: "#F7FAF6",
    onPress: () => console.log("R.O. Services pressed"),
  },
  {
    name: "Electrical Services ",
    borderColor: "#F2CBC2",
    color: "#F9EDEA",
    onPress: () => console.log("Fan Repair pressed"),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
const {picture, firstName, lastName} =   useContext(ProfileContext)
const {selectedAddress} = useContext(AddressContext)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF4FF" }}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerCard}></View>
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={20} color="#000" />
              <TouchableOpacity onPress={()=>navigation.navigate('AddressScreen')}>
                <Text style={styles.locationText}>{selectedAddress.label ? `${selectedAddress.label}` : "Allow Location"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.welcomeContainer} onPress={()=>navigation.navigate('ProfileScreen')}>
              <Image
                source={{ uri: picture }}
                style={styles.avatar}
              />

              <View>
                <Text style={styles.welcomeText}>Welcome Back!</Text>
                <Text style={styles.username}>{firstName} {lastName}</Text>
              </View>
              <Ionicons
                name="notifications-outline"
                size={24}
                style={{
                  backgroundColor: "#fff",
                  height: 44,
                  width: 44,
                  borderRadius: 22,
                  marginLeft: "auto",
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#888" />
            <TextInput
              placeholder="Search For Services"
              style={{ flex: 1, marginLeft: 10 }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("AllServicesScreen")}
            >
              <Ionicons name="options-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Icons */}
        <View style={styles.categoryRow}>
          {categories.map((cat, idx) => (
            <View key={idx} style={styles.categoryItem}>
              <Pressable
                onPress={() => navigation.navigate("SelectServiceScreen")}
              >
                <View style={styles.iconPlaceholder}>
                  <Image source={cat.icon} />
                </View>
                <Text style={{ fontSize: 11, fontWeight: "500" }}>
                  {cat.name}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        {/* Coupon Banner */}
        <View style={styles.couponBanner}>
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
          originalPrice={popularServices[0].mrp}
          price={popularServices[0].discountPrice}
          rating={popularServices[0].rating}
          id="1"
          onPressBook={()=>{navigation.navigate('SelectServiceScreen')
             console.log('pressed')}
          }
        />

        {/* Quick Picks */}
        <Text style={[styles.sectionTitle, { marginTop: 31 }]}>
          Quick Picks
        </Text>
        <View style={styles.dailyGrid}>
          {dailyNeeds.map((item, idx) => (
            <View key={idx} style={styles.dailyItem}>
              <View style={styles.dailyIcon}>
                <Image source={item.image} />
              </View>
              <Text style={{ fontSize: 12, textAlign: "center" }}>
                {item.name}
              </Text>
            </View>
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
          />
          <Image
            source={require("../../../assets/popular_services/specs/Frame 5.png")}
          />
        </View>

        <Text style={styles.sectionTitle}>Daily Need</Text>
        <View style={styles.dailyGrid}>
          {dailyNeeds.map((item, idx) => (
            <View key={idx} style={styles.dailyItem}>
              <View style={styles.dailyIcon}>
                <Image source={item.image} />
              </View>
              <Text style={{ fontSize: 12, textAlign: "center" }}>
                {item.name}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 43,
            marginHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            width: "92%",
            // borderWidth : 1,
            overflow: "hidden",
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <Image
            source={require(`${ASSETS_PATH}/popular_services/Frame 7.png`)}
            style={{ width: '57%', aspectRatio : 2.10, borderRadius : 10 }}
          />
          <Image
            source={require(`${ASSETS_PATH}/popular_services/Frame 8.png`)}
            style={{width: '40%', aspectRatio : 1.5 , borderRadius : 10}}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            marginHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            width: "92%",
            // borderWidth : 1,
            overflow: "hidden",
            alignSelf: "center",
            borderRadius: 10,
          }}
        >
          <Image
            source={require(`${ASSETS_PATH}/5000s.png`)}
            style={{width: '40%', aspectRatio : 1.5 , borderRadius : 10}}
          />
          <Image
            source={require(`${ASSETS_PATH}/check.png`)}
            style={{  width: '57%', aspectRatio : 2.10 ,  borderRadius : 10 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 24,
            gap: 10,
          }}
        >
          {serviceOptions.map((services, idx) => (
            <View
              key={idx}
              style={{
                height: 46,
                width: "45%",
                borderRadius: 11,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: services.color,
                borderColor: services.borderColor,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                {services.name}
              </Text>
            </View>
          ))}
        </View>

        <Image
          source={require(`${ASSETS_PATH}/bookNow.png`)}
          style={{
            height: 144,
            width: "92%",
            marginHorizontal: 20,
            alignSelf: "center",
            marginTop: 24,
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
    height: 263,
    padding: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    width: "100%",
    position: "absolute",
  },

  headerContainer: {
    // backgroundColor:'rgba(104, 94, 69, 0.39)',
    // height: 263,
    padding: 16,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,

    width: "100%",
  },
  headerTop: {
    flexDirection: "column",
    // alignItems: "center",
  },
  locationText: { fontWeight: "bold", marginLeft: 5 },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    height: 44,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  welcomeText: { fontSize: 14, fontWeight: "400", color: "#000" },
  username: { fontSize: 15, fontWeight: "600", color: "#000" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 13,
    height: 50,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    height: 132,
    backgroundColor: "#FAFAFA",
    borderRadius: 15,
    marginHorizontal: 20,
  },
  categoryItem: { alignItems: "center", justifyContent: "center" },
  iconPlaceholder: {
    width: 62,
    height: 62,
    // backgroundColor:'rgba(61, 52, 52, 0.05)',
    backgroundColor: "#FAFAFA",
    borderRadius: 31,
    marginBottom: 12,
    // elevation : 5,?
    borderColor: "white",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  couponBanner: {
    // backgroundColor: "#1D4ED8",
    // padding: 16,
    borderRadius: 16,
    margin: 16,
    marginBottom : 50
    // height: 198,
  },
  hotDeal: { color: "orange", marginBottom: 5 },
  couponText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  bookBtn: {
    marginTop: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bookBtnText: { color: "#1D4ED8", fontWeight: "bold" },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 43,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  serviceCard: {
    width: "44%",
    height: 257,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 15,
    marginVertical: 11,
    elevation: 2,
  },
  cardImage: {
    height: 139,
    width: "100%",
    // backgroundColor: "#658CB226",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    position: "absolute",
    marginLeft: 18,
  },
  favourite: {
    height: 35.45,
    width: 35.45,
    alignItems: "center",

    position: "absolute",
    right: 3,
    backgroundColor: "#F9FBF8",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    top: 3,
  },
  serviceTitle: {
    fontWeight: "500",
    marginTop: 5,
    color: "#515151",
    fontSize: 14,
  },
  priceText: {
    color: "#000",
    marginTop: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  strikePrice: {
    textDecorationLine: "line-through",
    color: "#00000080",
    fontWeight: "700",
    fontSize: 10,
    // marginLeft: 150,
  },
  bookNow: {
    backgroundColor: "#1D4ED8",
    padding: 6,
    borderRadius: 6,
    marginTop: 8,
  },
  bookNowText: { color: "#fff", textAlign: "center" },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  badge: {
    backgroundColor: "#facc15",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    textAlign: "center",
  },
  dailyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
    height: 232,
    marginHorizontal: 20,
    width: "92%",
    backgroundColor: "white",
    // alignSelf : 'center',
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center",
  },
  dailyItem: { width: "22%", alignItems: "center", marginTop: 40 },
  dailyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: "#eee",
    marginBottom: 5,
  },
  bannerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  banner: {
    backgroundColor: "#1D4ED8",
    color: "#fff",
    padding: 16,
    borderRadius: 10,
    width: "45%",
    textAlign: "center",
  },
  referralBanner: {
    // backgroundColor: "#1D4ED8",
    // padding: 16,
    // margin: 16,
    // borderRadius: 16,
    // alignItems: "center",
  },
  referralText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
});
