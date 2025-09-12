import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ItemData } from "../../constants/types";
import { verticalScale, moderateScale, scale } from "../../util/scaling";

type RootStackParamList = {
  ViewOrderScreen: {
    data: ItemData;
    pin: string | number | null;
  };
};

export default function JobDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "ViewOrderScreen">>();
  const data = route.params?.data;
  const pin = route.params?.pin;

   const addressString = `${data.address.street}, ${data.address.city},${data.address.zipcode}`;

  useEffect(() => {
    console.log("Data received in JobDetailsScreen:", data, pin);
    
  }, []);

  //  useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       if (route.name === "ViewOrderScreen") {   // 👈 only when on this screen
  //         navigation.reset({
  //           index: 0,
  //           routes: [{ name: "TabsScreen" }], // or "HomeScreen"
  //         });
  //         return true; // we handled it
  //       }
  //       return false; // let default work
  //     };

  //     const subscription = BackHandler.addEventListener(
  //       "hardwareBackPress",
  //       onBackPress
  //     );

  //     return () => subscription.remove();
  //   }, [navigation, route.name])
  // );

  // Define steps statically and inject dynamic date
  const steps = data
    ? [
        {
          date: data.createdAt,
          title: "Request on",
          description: { title: "Request assigned by ", subtitle: "User" },
        },
        {
          date: "25-05-2025",
          title: "Request Accepted on",
          description: {
            title: "Accepted by",
            subtitle: "Guarmit Enterprises",
          },
        },
        {
          date: "26-05-2025",
          title: "Assigned to technician on",
          description: { title: "Assigned to", subtitle: "Tejinder" },
        },
        {
          date: "27-05-2025",
          title: "On the way",
          description: { title: "Raja is on the way" },
        },
        {
          date: "28-05-2025",
          title: "Working on request",
          description: { title: "Processing" },
        },
        {
          date: "28-05-2025",
          title: "Completed",
          description: { title: "Success" },
        },
      ]
    : [];

  const renderStep = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.stepRow}>
      <View style={styles.iconColumn}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>{index + 1}</Text>
        </View>
        <View style={styles.diamondShape} />
        {index !== steps.length - 1 && <View style={styles.verticalLine} />}
      </View>
      <View style={styles.stepContent}>
        <View style={{ width: "55%" }}>
          <Text style={styles.stepTitle}>{item.title}</Text>
          <Text style={styles.stepDate}>{item.date}</Text>
        </View>
        <View style={styles.stepRightBox}>
          <Text style={styles.stepDescription}>
            --- {item.description.title}
          </Text>
          {item.description.subtitle && (
            <Text style={styles.stepSubtitle}>{item.description.subtitle}</Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          navigation.goBack()
        }
      >
        <Ionicons name="chevron-back" size={scale(24)} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Order History</Text>

      {data && (
        <>
          {/* Order Details */}
          <View style={styles.detailsBox}>
            <Text style={styles.detailTitle}>{data.name}</Text>
            <Text>
              <Text style={styles.label}>Service Type</Text> - {data.name}
            </Text>
            <Text>
              <Text style={styles.label}>Price</Text> - {data.price}/-
            </Text>
            <Text>
              <Text style={styles.label}>Address</Text> - {addressString}
            </Text>
            <Text>
              <Text style={styles.label}>Payment Mode</Text> - Cash on Delivery
            </Text>
            <Text>
              <Text style={styles.label}>Pin after job done</Text> -{" "}
              {pin ? pin : "N/A"}
            </Text>
          </View>

          {/* Timeline */}
          <View style={styles.timelineBox}>
            <Text style={styles.timelineTitle}>Timeline</Text>
            <FlatList
              data={steps}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderStep}
              scrollEnabled={false}
            />
          </View>
        </>
      )}

      <View style={{ height: verticalScale(80) }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fd",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  backText: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    marginLeft: scale(4),
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    marginBottom: verticalScale(8),
  },
  detailsBox: {
    backgroundColor: "white",
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: verticalScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(1) },
    shadowOpacity: 0.1,
    shadowRadius: scale(2),
    elevation: 2,
  },
  detailTitle: {
    fontWeight: "600",
    fontSize: moderateScale(16),
    marginBottom: verticalScale(4),
  },
  label: {
    fontWeight: "600",
    fontSize: moderateScale(12),
  },
  timelineTitle: {
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#153B93",
    color: "white",
    fontSize: moderateScale(18),
    fontWeight: "600",
    borderRadius: scale(10),
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    height: verticalScale(40),
    top: "-5%",
  },
  timelineBox: {
    backgroundColor: "white",
    borderBottomLeftRadius: scale(16),
    borderBottomRightRadius: scale(16),
    paddingLeft: scale(8),
    paddingVertical: verticalScale(50),
    marginTop: "10%",
    height: verticalScale(650),
  },
  stepRow: {
    flexDirection: "row",
    // height: verticalScale(80),
    // borderWidth : 1
  },
  iconColumn: {
    alignItems: "center",
  },
  iconCircle: {
    backgroundColor: "#153B93",
    borderTopRightRadius: scale(10),
    borderBottomRightRadius: scale(10),
    width: scale(35),
    height: scale(35),
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    zIndex: 1,
    borderBottomLeftRadius: scale(3),
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: moderateScale(12),
  },
  diamondShape: {
    height: verticalScale(30),
    width: scale(50),
    backgroundColor: "#001E63",
    position: "absolute",
    top: "27%",
    left: "9%",
    transform: [{ rotate: "45deg" }],
  },
  verticalLine: {
    width: 0,
    height: verticalScale(60),
    borderColor: "#153B93",
    borderStyle: "dashed",
    borderWidth: 1,
    alignSelf: "flex-start",
    marginLeft: scale(9),
  },
  stepContent: {
    flex: 1,
    backgroundColor: "#F1F6F0",
    padding: scale(12),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#B7C8B6",
    position: "absolute",
    left: "6%",
    top: "10%",
    paddingLeft: scale(26),
    flexDirection: "row",
    width: "90%",
  },
  stepTitle: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    marginBottom: verticalScale(4),
    color: "#153B93",
  },
  stepDate: {
    fontSize: moderateScale(12),
    color: "#000",
    fontWeight: "300",
  },
  stepRightBox: {
    marginLeft: scale(10),
    paddingTop: verticalScale(8),
    width: "50%",
  },
  stepDescription: {
    fontSize: moderateScale(10),
    fontWeight: "500",
    color: "#000",
  },
  stepSubtitle: {
    fontSize: moderateScale(10),
    fontWeight: "300",
    color: "#000",
  },
});
