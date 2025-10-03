import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "../../../util/scaling";
import BookNowButton from "../../../ui/BookNowButton";

export default function MostBookedServicesCard({
  icon,
  category,
  price,
  serviceType,
  bookingTime,
  previewImage,
  tags = [],
  amount,
  onBookNow,
  onWishlist,
}: any) {
  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: verticalScale(40),
            width: scale(40),
            borderRadius: scale(6.15),
            backgroundColor: "#FFEDBD",
            borderWidth: 1,
            borderColor: "#FBD163",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: verticalScale(2) },
            shadowRadius: moderateScale(6),
            elevation: 2,
          }}
        >
          <Image
            source={require("../../../../assets/imageIcons/power.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>₹{amount}</Text>
        </View>
      </View>

      {/* Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{category}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.value}>₹{price}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Service Type</Text>
          <Text style={styles.value}>{serviceType}</Text>
        </View>
      </View>

      {/* Booking Row */}
      <View style={styles.bookingRow}>
        <View>
          <Text style={styles.label}>Book in</Text>
          <Text style={styles.timer}>{bookingTime}</Text>
        </View>
        <Image
          source={require("../../../../assets/map.png")}
          style={styles.preview}
        />
      </View>

      {/* Tags */}
      <View style={styles.tagsRow}>
        {tags.map((tag: any, index: number) => (
          <View
            key={index}
            style={[styles.amountBox, { height: verticalScale(34) }]}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.bookBtn} onPress={onBookNow}>
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wishlistBtn} onPress={onWishlist}>
          <Text style={styles.wishlistText}>Wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: scale(349),
    // height : verticalScale(306),
    backgroundColor: "#fff",
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(14),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: moderateScale(6),
    elevation: 2,
    marginVertical: verticalScale(10),
    alignSelf: "center",
    borderWidth : moderateScale(1.4),
    borderColor : '#DEDEDE',
    overflow : 'hidden'
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(19),
  },
  icon: {
    width: scale(25),
    height: scale(26),
    resizeMode: "contain",
  },
  amountBox: {
    backgroundColor: "#F1F6F0",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: "#B7C8B6",
    height: verticalScale(35),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: moderateScale(6),
    elevation: 2,
  },
  amountText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#444",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(15),
    borderBottomWidth: 1,
    paddingBottom: verticalScale(15),
    borderStyle: "dashed",
    borderColor: "#CFCFCF",
    paddingHorizontal: scale(19),
  },
  infoBlock: {
    alignItems: "flex-start",
  },
  label: {
    fontSize: moderateScale(10),
    color: "#777",
    fontWeight : 400
  },
  value: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#333",
  },
  bookingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(8),
    paddingHorizontal: scale(19),
  },
  timer: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: "#222",
    marginTop: verticalScale(4),
  },
  preview: {
    width: scale(155),
    height: verticalScale(57),
    borderRadius: moderateScale(8),
    resizeMode: "contain",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: verticalScale(13),
    justifyContent: "space-between",
    // gap : scale(6),
    paddingHorizontal: scale(15),
  },
  tag: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(8),
    marginRight: scale(8),
    marginBottom: verticalScale(8),
  },
  tagText: {
    fontSize: moderateScale(10),
    fontWeight: "500",
    color: "#333",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(15),
    paddingHorizontal: scale(15),
    marginBottom : verticalScale(5)
  },
  bookBtn: {
    height: verticalScale(38),
    width: scale(154),
    backgroundColor: "#003399",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#234CAD",
  },
  wishlistBtn: {
    height: verticalScale(38),
    width: scale(154),
    backgroundColor: "#EBF2FF",
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#234CAD",
  },
  bookText: {
    fontSize: moderateScale(14),
    color: "#fff",
    fontWeight: "600",
  },
  wishlistText: {
    fontSize: moderateScale(14),
    color: "#153B93",
    fontWeight: "600",
  },
});
