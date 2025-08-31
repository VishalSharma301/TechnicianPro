import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import ScreenHeader from "../components/ScreenHeader";

const needConfig: Record<string, { icon: any; bg: string; border: string }> = {
  ladder: {
    icon: require("../../../assets/description/ladder.png"),
    bg: "#E4ECFF",
    border: "#89ACFF",
  },
  bucket: {
    icon: require("../../../assets/description/bucket.png"),
    bg: "#FFFBF0",
    border: "#EDD8A1",
  },
  socket: {
    icon: require("../../../assets/description/socket.png"),
    bg: "#F7FAF6",
    border: "#CCEDC1",
  },
};
const ServicesDetailsScreen = () => {
  const renderProcessStep = (number: number, text: string) => (
    <View style={styles.processStep} key={number}>
      <View style={styles.processContent}>
        <Text style={styles.processText}>{text}</Text>
      </View>
      <View style={styles.processNumber}>
        <Text style={styles.processNumberText}>{number}</Text>
      </View>
    </View>
  );

  const renderNeedItem = (key: string, label: string) => {
    const { icon, bg, border } = needConfig[key];

    return (
      <View
        style={[styles.needItem, { backgroundColor: bg, borderColor: border }]}
        key={label}
      >
        <View style={[styles.needIcon]}>
          <Image
            source={icon}
            style={{ width: scale(55), height: scale(55) }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.needLabel}>{label}</Text>
      </View>
    );
  };

  const renderPromiseItem = (icon: string, text: string) => (
    <View style={styles.promiseItem} key={text}>
      <Ionicons name={icon as any} size={20} color="#333" />
      <Text style={styles.promiseText}>{text}</Text>
    </View>
  );

  const renderRatingBar = (stars: number, count: string) => (
    <View style={styles.ratingRow} key={stars}>
      <View style={styles.starsContainer}>
        <Text style={styles.starIcon}>★</Text>
        <Text style={styles.ratingNumber}>{stars}</Text>
      </View>
      <View style={styles.ratingBarContainer}>
        <View
          style={[
            styles.ratingBar,
            {
              width:
                stars === 5
                  ? "90%"
                  : stars === 4
                  ? "30%"
                  : stars === 3
                  ? "20%"
                  : stars === 2
                  ? "10%"
                  : "5%",
            },
          ]}
        />
      </View>
      <Text style={styles.ratingCount}>{count}</Text>
    </View>
  );

  return (
 
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader name="" rightIcon={false} style={{  }} />
      {/* Item Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Item Description</Text>
        <Text style={styles.description}>
          Let me structure this into main categories with subcategories. Ensure
          each is clear and covers all aspects of AC services. Let me structure
          this into main categories with subcategories. Ensure each is clear and
          covers all aspects of AC services.
        </Text>
      </View>

      {/* Our Process */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Process</Text>
        <View style={styles.processContainer}>
          {renderProcessStep(
            1,
            "Let me structure this into main categories with subcategories. Ensure each is clear and covers all"
          )}
          {renderProcessStep(
            2,
            "Let me structure this into main categories with subcategories. Ensure each is clear and covers all"
          )}
          {renderProcessStep(
            3,
            "Let me structure this into main categories with subcategories. Ensure each is clear and covers all"
          )}
        </View>
      </View>

      {/* What we need from you */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What we need from you</Text>
        <View style={styles.needsContainer}>
          {renderNeedItem("ladder", "Ladder")}
          {renderNeedItem("bucket", "Bucket")}
          {renderNeedItem("socket", "Socket")}
        </View>
      </View>

      {/* Company Promise */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company promise</Text>
        <View style={styles.promiseContainer}>
          {renderPromiseItem(
            "shield-checkmark-outline",
            "Upto 10 Days Warranty"
          )}
          {renderPromiseItem("umbrella-outline", "Upto to 1000 damage cover")}
          {renderPromiseItem("card-outline", "Fixed Rate")}
          {renderPromiseItem(
            "call-outline",
            "On Call repair route verification"
          )}
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <Text style={styles.reviewsCount}>1.5M Reviews</Text>

        <View style={styles.ratingsContainer}>
          {renderRatingBar(5, "1.4M")}
          {renderRatingBar(4, "44K")}
          {renderRatingBar(3, "18K")}
          {renderRatingBar(2, "13K")}
          {renderRatingBar(1, "4K")}
        </View>
      </View>

      {/* All Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All reviews</Text>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
            <Text style={[styles.filterText, styles.activeFilterText]}>
              Most detailed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>In my area</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Frequent users</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewItem}>
          <Text style={styles.reviewerName}>Tejinder Singh</Text>
          <Text style={styles.reviewDate}>May 21, 2025</Text>
          <Text style={styles.reviewText}>
            Let me structure this into main categories with subcategories.
            Ensure each is clear and covers all aspects of AC services. Let me
            structure this into main categories with subcategories. Ensure each
            is clear and covers all aspects of AC services.
          </Text>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: scale(16),
    // paddingTop: verticalScale(16),
  },
  section: {
    marginBottom: verticalScale(24),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#000",
    marginBottom: verticalScale(12),
  },
  description: {
    fontSize: moderateScale(14),
    color: "#666",
    lineHeight: verticalScale(20),
  },
  processContainer: {
    gap: verticalScale(12),
  },
  processStep: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E4ECFF",
    borderRadius: scale(16),
    padding: scale(16),
    position: "relative",
    borderWidth: scale(1),
    borderColor: "#89ACFF",
  },
  processContent: {
    flex: 1,
    paddingRight: scale(50),
  },
  processText: {
    fontSize: moderateScale(14),
    color: "#515151B2",
    lineHeight: verticalScale(18),
  },
  processNumber: {
    position: "absolute",
    right: scale(16),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: "#094AE2",
    justifyContent: "center",
    alignItems: "center",
  },
  processNumberText: {
    color: "#FFFFFF",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  needsContainer: {
    flexDirection: "row",
    gap: scale(14),
  },
  needItem: {
    flex: 1,
    alignItems: "center",
    borderRadius: scale(12),
    padding: scale(16),
    borderWidth: scale(1),
    elevation: 2,
    height: verticalScale(105),
    width: scale(93),
  },
  needIcon: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  needLabel: {
    fontSize: moderateScale(14),
    fontWeight: "500",
    color: "#333",
  },
  promiseContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: scale(12),
    padding: scale(16),
    gap: verticalScale(12),
  },
  promiseItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  promiseText: {
    fontSize: moderateScale(14),
    color: "#333",
    flex: 1,
  },
  reviewsCount: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#153B93",
    marginBottom: verticalScale(16),
  },
  ratingsContainer: {
    gap: verticalScale(8),
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: scale(32),
  },
  starIcon: {
    color: "#000000",
    fontSize: moderateScale(16),
    marginRight: scale(4),
  },
  ratingNumber: {
    fontSize: moderateScale(14),
    color: "#333",
  },
  ratingBarContainer: {
    flex: 1,
    height: verticalScale(8),
    backgroundColor: "#E0E0E0",
    borderRadius: scale(4),
    overflow: "hidden",
  },
  ratingBar: {
    height: "100%",
    backgroundColor: "#153B93",
    borderRadius: scale(4),
  },
  ratingCount: {
    fontSize: moderateScale(14),
    color: "#666",
    width: scale(40),
    textAlign: "right",
  },
  filterContainer: {
    flexDirection: "row",
    gap: scale(8),
    marginBottom: verticalScale(16),
  },
  filterButton: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderRadius: scale(16),
    backgroundColor: "#F0F0F0",
  },
  activeFilter: {
    backgroundColor: "#153B93",
  },
  filterText: {
    fontSize: moderateScale(12),
    color: "#666",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  reviewItem: {
    backgroundColor: "#F8F9FA",
    borderRadius: scale(12),
    padding: scale(16),
  },
  reviewerName: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#333",
    marginBottom: verticalScale(4),
  },
  reviewDate: {
    fontSize: moderateScale(12),
    color: "#999",
    marginBottom: verticalScale(8),
  },
  reviewText: {
    fontSize: moderateScale(14),
    color: "#666",
    lineHeight: verticalScale(20),
  },
});

export default ServicesDetailsScreen;
