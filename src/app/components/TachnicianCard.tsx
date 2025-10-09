import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {Ionicons as Icon} from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "../../util/scaling";

const BookingCard = () => {
  return (
   
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <Image
            source={{ uri: "https://via.placeholder.com/50x50.png" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Mr. Jitender Singh</Text>
            <Text style={styles.role}>Electrician</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.callButton}>
          <Icon name="call-outline" size={moderateScale(20)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Date & Time */}
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Icon name="calendar-outline" size={moderateScale(18)} color="#fff" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>30-09-2025</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Icon name="time-outline" size={moderateScale(18)} color="#fff" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>8PM - 8:30PM</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.reScheduleBtn}>
          <Text style={styles.reScheduleText}>Re-Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn}>
          <Text style={styles.profileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#153B93",
    borderRadius: moderateScale(16),
    padding: scale(16),
    width: scale(350),
    // height : verticalScale(220),
    // alignSelf: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    top : verticalScale(30),
    position : 'absolute'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(22.5),
    marginRight: scale(10),
  },
  name: {
    fontSize: moderateScale(15),
    color: "#fff",
    fontWeight: "600",
  },
  role: {
    fontSize: moderateScale(12),
    color: "#E0E0E0",
    marginTop: verticalScale(2),
  },
  callButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: scale(8),
    borderRadius: moderateScale(20),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: verticalScale(10),
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  infoTextContainer: {
    flexDirection: "column",
  },
  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: moderateScale(11),
  },
  value: {
    color: "#fff",
    fontSize: moderateScale(13),
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: scale(10),
  },
  reScheduleBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: moderateScale(30),
    paddingVertical: verticalScale(8),
    alignItems: "center",
  },
  profileBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: moderateScale(30),
    paddingVertical: verticalScale(8),
    alignItems: "center",
  },
  reScheduleText: {
    color: "#0B4CFF",
    fontWeight: "600",
    fontSize: moderateScale(13),
  },
  profileText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: moderateScale(13),
  },
});

export default BookingCard;
