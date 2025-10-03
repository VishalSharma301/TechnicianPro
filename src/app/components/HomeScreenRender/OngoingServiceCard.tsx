import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { moderateScale, scale, verticalScale } from "../../../util/scaling";
import { OngoingService } from "../../../constants/types";
import { formatDate } from "../../../util/date";
import { LinearGradient } from "expo-linear-gradient";

type OngoingServiceCardProps = {
  item: OngoingService;
};

export default function OngoingServiceCard({ item }: OngoingServiceCardProps) {
  const {
    _id,
    address,
    user,
    requestSubmittedAt,
    scheduledDate,
    status,
    service,
  } = item;

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={["#F6F6F6", "#ffffff"]}
        style={{
          width: scale(349),
          height: verticalScale(311),
          position: "absolute",
          borderRadius: moderateScale(12),
        }}
      />
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{"User"}</Text>
        </View>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNo}>Order No. {_id}</Text>
        </View>
        <View>
          <Text style={styles.price}>₹ {"100"}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Service Info */}
      <View style={styles.serviceRow}>
        <View style={{ gap: verticalScale(6) }}>
          <Text style={styles.serviceType}>{service?.name}</Text>
          <Text style={styles.serviceLabel}>Type Of Service</Text>
        </View>
        <View style={{ alignItems: "flex-end", gap: 6 }}>
          <Text style={styles.provider}>{"Provider"}</Text>
          <Text style={styles.serviceLabel}>Service Provider</Text>
        </View>
      </View>

      {/* Item + Status */}
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>{service?.name}</Text>
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      {/* Completed Box  */}
      <View
        style={{
          alignSelf: "flex-end",
          marginRight: scale(10),
          // borderWidth : 1,
          marginVertical: verticalScale(13),
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(12),
            fontWeight: 700,
            color: "#828282",
          }}
        >
          COMPLETED
        </Text>
      </View>

      {/* Timeline */}
      <View style={styles.timelineRow}>
        <View style={styles.timeline}>
          <View
            style={[
              styles.circle,
              { backgroundColor: "#795FDA" },
              true && {
                backgroundColor: "#795FDA",
                shadowColor: "gold", // glow color
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 10, // how much it spreads
                elevation: 2,
                borderWidth: 1,
                borderColor: "gold",
              },
            ]}
          />
          <View style={styles.line} />
          <View
            style={[styles.circle, false && { backgroundColor: "#DA5FDA" }]}
          />
          <View style={styles.line} />
          <View
            style={[styles.circle, false && { backgroundColor: "#00C4FF" }]}
          />
          <View style={styles.line} />
          <View
            style={[styles.circle, false && { backgroundColor: "#FF0000" }]}
          />
          <View style={styles.line} />
          <View
            style={[styles.circle, false && { backgroundColor: "#00FF40" }]}
          />
        </View>
      </View>

      {/* Dates */}
      <View style={styles.datesRow}>
        <View>
          <Text style={styles.date}>{formatDate(requestSubmittedAt)}</Text>
          <Text style={styles.dateLabel}>Booked On</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.date}>{formatDate(scheduledDate)}</Text>
          <Text style={styles.dateLabel}>Done By</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(12),
    // padding: moderateScale(12),
    marginVertical: verticalScale(10),
    width: scale(349),
    height: verticalScale(311),
    paddingVertical: verticalScale(25),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,

    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: moderateScale(16),
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(18),
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#9c27b0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: moderateScale(14),
  },
  orderInfo: {
    flex: 1,
    marginLeft: scale(10),
  },
  orderNo: {
    fontSize: moderateScale(13),
    color: "#333",
  },
  price: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#000",
  },
  divider: {
    // height: 1,
    marginVertical: verticalScale(15),
    borderTopWidth: moderateScale(1),
    borderStyle: "dashed",
    borderColor: "#C2C2C2",
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth : 1,
    paddingHorizontal: scale(21),
    // height : verticalScale(33)
  },
  serviceType: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    color: "#000",
  },
  serviceLabel: {
    fontSize: moderateScale(10),
    fontWeight: "500",
    color: "#939393",
  },
  provider: {
    fontSize: moderateScale(14),
    fontWeight: "500",
    color: "#000",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(18),
    alignItems: "center",
    // borderWidth : 1,
    paddingHorizontal: scale(21),
  },
  itemText: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    color: "#333",
    // alignSelf : 'flex-start'
  },
  statusBox: {
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(6),
    backgroundColor: "#FF00000D",
  },
  statusText: {
    color: "red",
    fontWeight: "700",
    fontSize: moderateScale(12),
  },
  timelineRow: {
    alignItems: "center",
  },
  timeline: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: scale(15),
    height: scale(15),
    borderRadius: scale(8),
    backgroundColor: "#828282",
  },
  line: {
    width: scale(51),
    height: scale(1),
    backgroundColor: "#6F6F6F",
    marginHorizontal: scale(5),
  },
  datesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(23),
    paddingHorizontal: scale(21),
    // borderWidth : 1
  },
  date: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    color: "#000",
  },
  dateLabel: {
    fontSize: moderateScale(10),
    fontWeight: 500,
    color: "#939393",
  },
});
