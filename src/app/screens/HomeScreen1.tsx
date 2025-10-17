import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import HomeCategories from "../components/HomeScreenRender/HomeCategories";
import { serviceOptions } from "../../util/serviceOptions";
import HomeQuickPick from "../components/HomeScreenRender/HomeQuickPicks";
import ServiceGrid from "../components/HomeScreenRender/ServiceGrid";
import { iconMap, IconName } from "../../util/iconMap";
import Index from "../components/test";
import BookingCard from "../components/TachnicianCard";
import CarouselTest from "../components/CarasoulTest";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BookNowButton from "../../ui/BookNowButton";

const categories = [
  { name: "AC Service", icon: "snow-outline" },
  { name: "Chimney", icon: "flame-outline" },
  { name: "Plumbing", icon: "water-outline" },
  { name: "Electrical", icon: "flash-outline" },
];

const recommended = [
  {
    id: 1,
    subtitle: "Near me",
    title: "Plumber Services",
    price: "₹300",
    rating: 4.1,
    icon: "plumbing", // 🧰 plumbing tools icon
    backgroundColor: "#F5E6E0",
  },
  {
    id: 2,
    subtitle: "Near me",
    title: "Split Ac Services",
    price: "₹300",
    rating: 4.3,
    icon: "ac-unit", // ❄️ AC cooling unit
    backgroundColor: "#F0E6D6",
  },
  {
    id: 3,
    subtitle: "Near me",
    title: "Chimney Repair",
    price: "₹300",
    rating: 4.6,
    icon: "chimney", // chimney maintenance icon
    backgroundColor: "#E0F0F5",
  },
  {
    id: 4,
    subtitle: "Near me",
    title: "Electrician Services",
    price: "₹300",
    rating: 4.6,
    icon: "electric", // ⚡ electrical work
    backgroundColor: "#E8E0F5",
  },
  {
    id: 5,
    subtitle: "Near me",
    title: "Sealing Fan Repair",
    price: "₹300",
    rating: 4.2,
    icon: "ceiling-fan", // 🌀 ceiling fan
    backgroundColor: "#F0E6D6",
  },
  {
    id: 6,
    subtitle: "Near me",
    title: "Geyser Repair",
    price: "₹300",
    rating: 4.7,
    icon: "hot-water", // alternate electrician/power icon
    backgroundColor: "#E8E0F5",
  },
];
// const recommended = [
//   { name: "Plumber Services", price: "₹300", rating: "4.1" },
//   { name: "Split Ac Services", price: "₹300", rating: "4.3" },
//   { name: "Chimney Repair", price: "₹300", rating: "4.8" },
//   { name: "Electrician Services", price: "₹300", rating: "4.6" },
//   { name: "Sealing Fan Repair", price: "₹300", rating: "4.2" },
//   { name: "Electrician Services", price: "₹300", rating: "4.7" },
// ];

const quickPick = [
  {
    name: "Tap Service",
    icon: "Tap Service",
  },
  {
    name: "TDS Checker",
    icon: "TDS Checker",
  },
  {
    name: "R.O. Services",
    icon: "R.O. Services",
  },
  {
    name: "Fan Repair",
    icon: "fan",
  },
  {
    name: "Washing M. Repair",
    icon: "washing-machine",
  },
  {
    name: "Gyser Repair",
    icon: "hot-water",
  },
  {
    name: "Gas Repair",
    icon: "gas",
  },
  {
    name: "Iron Repair",
    icon: "iron-repair",
  },
];

const popular = [
  {
    id: 1,
    subtitle: "Near me",
    title: "Plumber Services",
    price: "₹300",
    rating: 4.1,
    icon: "plumbing", // 🧰 plumbing tools icon
    backgroundColor: "#F5E6E0",
  },
  {
    id: 2,
    subtitle: "Near me",
    title: "Split Ac Services",
    price: "₹300",
    rating: 4.3,
    icon: "ac-unit", // ❄️ AC cooling unit
    backgroundColor: "#F0E6D6",
  },
  {
    id: 3,
    subtitle: "Near me",
    title: "Chimney Repair",
    price: "₹300",
    rating: 4.6,
    icon: "chimney", // chimney maintenance icon
    backgroundColor: "#E0F0F5",
  },
  {
    id: 4,
    subtitle: "Near me",
    title: "Electrician Services",
    price: "₹300",
    rating: 4.6,
    icon: "electric", // ⚡ electrical work
    backgroundColor: "#E8E0F5",
  },
  {
    id: 5,
    subtitle: "Near me",
    title: "Sealing Fan Repair",
    price: "₹300",
    rating: 4.2,
    icon: "ceiling-fan", // 🌀 ceiling fan
    backgroundColor: "#F0E6D6",
  },
  {
    id: 6,
    subtitle: "Near me",
    title: "Geyser Repair",
    price: "₹300",
    rating: 4.7,
    icon: "hot-water", // alternate electrician/power icon
    backgroundColor: "#E8E0F5",
  },
];

export default function HomeScreen1() {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  
  const [currentPinCode, setCurrentPinCode] = useState("140604");

  const snapPoints = useMemo(() => ["56%","70%", "90%"],[]);
// const snapPoints = ["10%", "70%", "90%"]

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Open bottom sheet when pin code is clicked
  const handlePinCodePress = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0); // Open to first snap point (40%)
  }, []);

  // Render backdrop
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(80) }}
      >
        {/* <View style={styles.container}> */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              // gap: scale(8),
              // borderWidth: 1,
              // paddingBottom: verticalScale(18),
              borderColor: "#FFFFFF4F",
              paddingLeft: scale(20),
              marginRight: scale(21),
            }}
          >
            <TouchableOpacity
              style={styles.pinContainer}
              onPress={handlePinCodePress}
              activeOpacity={0.7}
            >
              <Icon name="location" size={moderateScale(20)} color="#ffff" />
              <Text style={styles.pinText}>Pin code | {currentPinCode}</Text>
              <Icon name="pencil-sharp" size={moderateScale(16)} color="#fff" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: scale(6) }}>
              <Icon
                name="notifications"
                size={moderateScale(18)}
                color="#fff"
              />
              <Icon name="cart" size={moderateScale(18)} color="#fff" />
            </View>
          </View>
          <View
            style={{
              paddingLeft: scale(20),
              flexDirection: "row",
              marginTop: verticalScale(10),
              gap: scale(10),
            }}
          >
            <View style={styles.searchBar}>
              <Icon
                name="search-outline"
                size={moderateScale(20)}
                color="#717A7E"
              />
              <TextInput
                placeholder="Search For Services"
                placeholderTextColor="#717A7E"
                style={styles.searchInput}
              />
            </View>
            <View
              style={{
                width: scale(47),
                height: verticalScale(42),
                backgroundColor: "#F6F6F6",
                borderRadius: moderateScale(10),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="options-sharp"
                style={{ fontWeight: "bold" }}
                size={moderateScale(22)}
                color={"#153B93"}
              />
            </View>
          </View>
          <HomeCategories
            categories={serviceOptions}
            onPressCategory={(cat) => navigation.navigate("ServicesScreen")}
          />
        </View>
        <View style={{ marginTop: verticalScale(55 + 22) }}>
          <CarouselTest />
        </View>
        {/* Recommended */}
        <Text style={styles.sectionTitle}>Recommended For You</Text>
        <View style={styles.cardGrid}>
          {recommended.map((item, index) => (
            <View key={index} style={styles.serviceCard}>
              <View
                style={{
                  height: verticalScale(80.6),
                  backgroundColor: item.backgroundColor,
                  borderRadius: moderateScale(8),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={iconMap[item.icon as IconName] ?? iconMap["default"]}
                  style={{
                    maxHeight: verticalScale(52),
                    maxWidth: scale(53),
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#153B93",
                  width: 40,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: scale(4.7),
                  paddingVertical: verticalScale(2.7),
                  borderWidth: moderateScale(2.5),
                  borderColor: "#fff",
                  position: "absolute",
                  bottom: verticalScale(36),
                }}
              >
                <Icon name="star" color={"white"} size={scale(5.5)} />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.servicePrice}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Quick Pick */}
        <Text style={styles.sectionTitle}>Quick Pick</Text>

        <HomeQuickPick quickPickServices={quickPick} onPressItem={() => {}} />

        {/* Most Popular */}
        <Text style={styles.sectionTitle}>Most Popular Services</Text>
        <View style={styles.popularCardGrid}>
          {popular.map((item, index) => (
            <View
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#fff",
                height: verticalScale(127),
                width: scale(102),
                backgroundColor: item.backgroundColor,
                paddingHorizontal: scale(8),
                borderRadius: moderateScale(12),
                paddingVertical: verticalScale(8),
              }}
            >
              <Image
                source={iconMap[item.icon as IconName] ?? iconMap["default"]}
                style={styles.serviceImage}
              />
              <Text
                style={[styles.serviceTitle, { marginTop: verticalScale(5) }]}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(8),
                  fontWeight: "500",
                  color: "#3D3D3D99",
                }}
              >
                {item.subtitle}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.servicePrice, { marginLeft: 0 }]}>
                  ₹300
                </Text>
                <Icon name="cart-outline" color={"#1d4fc5ff"} />
              </View>
            </View>
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

        <Image
          source={require(`../../../assets/bookNow.png`)}
          style={{
            height: verticalScale(144),
            width: scale(350),
            marginHorizontal: scale(20),
            alignSelf: "center",
            marginTop: verticalScale(24),
            borderRadius: 10,
            marginBottom: 12,
          }}
        />

        {/* </View> */}
      </ScrollView>
      {/* Bottom Sheet for Pin Code Edit */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start closed
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} // Enable slide down to close
        backdropComponent={renderBackdrop}
        keyboardBehavior="extend" // pushes sheet above keyboard
        keyboardBlurBehavior="restore"
        
      >
          <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={{ flex: 1 }}
  >
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>Change Location</Text>
            <View style={styles.handleBar} />
          </View>

          <View style={styles.pinCodeInputContainer}>
            <Icon name="location" size={moderateScale(24)} color="#153B93" />
            <TextInput
              placeholder="Enter Pin Code"
              placeholderTextColor="#717A7E"
              style={styles.pinCodeInput}
              keyboardType="numeric"
              maxLength={6}
              defaultValue={currentPinCode}
              onChangeText={setCurrentPinCode}
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => bottomSheetRef.current?.close()}
          >
            <Text style={styles.saveButtonText}>Save Location</Text>
          </TouchableOpacity>

          {/* Recent Locations (optional) */}
          <View style={styles.recentLocations}>
            <Text style={styles.recentTitle}>Recent Locations</Text>
            <TouchableOpacity style={styles.recentItem}>
              <Icon
                name="time-outline"
                size={moderateScale(20)}
                color="#717A7E"
              />
              <Text style={styles.recentText}>140604 - Mohali</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentItem}>
              <Icon
                name="time-outline"
                size={moderateScale(20)}
                color="#717A7E"
              />
              <Text style={styles.recentText}>160055 - Chandigarh</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
        </KeyboardAvoidingView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F1F5FD" },
  header: {
    backgroundColor: "#153B93",
    height: verticalScale(184),
    // paddingRight : scale(22),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(15),
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(10),
    height: verticalScale(42),
    width: scale(293),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(14),
    marginHorizontal: scale(8),
  },
  pinContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pinText: {
    marginHorizontal: scale(2),
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: verticalScale(15),
  },
  categoryItem: { alignItems: "center" },
  categoryIcon: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(50),
    padding: scale(10),
  },
  categoryText: {
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
    color: "#000",
  },
  scrollArea: { flex: 1, paddingHorizontal: scale(10) },
  bookingCard: {
    backgroundColor: "#003366",
    borderRadius: moderateScale(15),
    padding: scale(15),
    marginTop: verticalScale(80),
    height: verticalScale(201),
  },
  bookingHeader: { flexDirection: "row", alignItems: "center" },
  profileImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(20),
    marginRight: scale(10),
  },
  bookingName: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontWeight: "600",
  },
  bookingRole: { color: "#ccc", fontSize: moderateScale(12) },
  bookingBottom: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  bookingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(10),
  },
  bookingText: {
    color: "#fff",
    marginLeft: scale(5),
    fontSize: moderateScale(12),
  },
  reSchedule: {
    backgroundColor: "#fff",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(10),
    marginRight: scale(8),
  },
  reScheduleText: { fontSize: moderateScale(12), fontWeight: "500" },
  viewProfile: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(10),
  },
  viewProfileText: { fontSize: moderateScale(12), color: "#fff" },
  sectionTitle: {
    marginTop: verticalScale(20),
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#828282",
    marginBottom: verticalScale(11),
    marginLeft: scale(21),
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginHorizontal: scale(20),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(10),
    height: verticalScale(305),
    paddingVertical: verticalScale(20),
    borderColor: "#EAEAEA",
    borderWidth: 1,
  },
  serviceCard: {
    width: scale(103.68),
    height: verticalScale(128),
    backgroundColor: "#fff",
    // borderRadius: moderateScale(10),
    // padding: scale(10),
    marginBottom: verticalScale(10),
    // borderWidth: 1,
  },
  popularCardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
    // justifyContent: "space-between",
    backgroundColor: "#F8F9FB",
    marginHorizontal: scale(20),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(10),
    height: verticalScale(305),
    paddingVertical: verticalScale(20),
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  serviceImage: {
    maxWidth: scale(52),
    maxHeight: verticalScale(55),
    resizeMode: "contain",
    // marginBottom: verticalScale(5),
    marginTop: verticalScale(10),
    alignSelf: "center",
    // borderWidth : 1
  },
  serviceTitle: {
    fontSize: moderateScale(10),
    fontWeight: "500",
    color: "#515151",
    marginTop: verticalScale(16),
  },
  servicePrice: {
    fontSize: moderateScale(10),
    fontWeight: "600",
    color: "#555",
    marginTop: verticalScale(2),
    marginLeft: 2,
  },
  rating: {
    fontSize: moderateScale(6.5),
    color: "#ffffff",
    // marginBottom: verticalScale(3),
  },
  quickPickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickItem: {
    width: "23%",
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    alignItems: "center",
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  quickIcon: {
    width: scale(40),
    height: scale(40),
    marginBottom: verticalScale(5),
  },
  quickText: {
    fontSize: moderateScale(11),
    textAlign: "center",
    color: "#000",
  },
  badgesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    marginHorizontal: scale(55),
  },
  badgeIcon: { width: scale(73), height: scale(73), resizeMode: "contain" },
  ctaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
    marginHorizontal: scale(20),
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
  },
  bottomSheetHeader: {
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  handleBar: {
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: "#D1D5DB",
    borderRadius: moderateScale(2),
    marginTop: verticalScale(8),
  },
  bottomSheetTitle: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#1F2937",
  },
  pinCodeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(20),
  },
  pinCodeInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#1F2937",
    marginLeft: scale(12),
  },
  saveButton: {
    backgroundColor: "#153B93",
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    alignItems: "center",
    marginBottom: verticalScale(24),
  },
  saveButtonText: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  recentLocations: {
    marginTop: verticalScale(10),
  },
  recentTitle: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: verticalScale(12),
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  recentText: {
    fontSize: moderateScale(15),
    color: "#1F2937",
    marginLeft: scale(12),
  },
});
