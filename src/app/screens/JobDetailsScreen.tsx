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
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ItemData } from "../../constants/types";
import { verticalScale, moderateScale, scale } from "../../util/scaling";
import { Ionicons } from "@expo/vector-icons";

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

  // Dynamic step generator function
  const generateDynamicSteps = (jobData: ItemData) => {
    const createdDate = new Date(jobData.createdAt);
    
    // Helper function to format date consistently
    const formatDate = (dateInput: string | Date) => {
      if (!dateInput) return new Date().toLocaleDateString('en-GB');
      const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      return date.toLocaleDateString('en-GB');
    };

    // Helper function to add days to a date and format it
    const addDays = (date: Date, days: number) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toLocaleDateString('en-GB');
    };

    // Get the current status from data
    const status = jobData.status?.toLowerCase() || 'pending';
    
    // Always show all possible steps, but mark them as completed or not based on status
    const allSteps = [
      {
        date: formatDate(jobData.createdAt),
        title: "Request on",
        description: { 
          title: "Request assigned by ", 
          subtitle: jobData.user?.name || "User" 
        },
        completed: true // Always completed since the job exists
      },
      {
        date: jobData.acceptedAt ? formatDate(jobData.acceptedAt) : addDays(createdDate, 1),
        title: "Request Accepted on",
        description: {
          title: "Accepted by",
          subtitle: jobData.serviceProvider?.name || jobData.companyName || "Service Provider",
        },
        completed: ['accepted', 'assigned', 'in_progress', 'ongoing', 'completed'].includes(status)
      },
      {
        date: jobData.assignedAt ? formatDate(jobData.assignedAt) : addDays(createdDate, 2),
        title: "Assigned to technician on",
        description: { 
          title: "Assigned to", 
          subtitle: jobData.assignedTechnician?.name || jobData.technicianName || "Technician" 
        },
        completed: ['assigned', 'in_progress', 'ongoing', 'completed'].includes(status)
      },
      {
        date: jobData.startedAt ? formatDate(jobData.startedAt) : addDays(createdDate, 3),
        title: "On the way",
        description: { 
          title: `${jobData.assignedTechnician?.name || jobData.technicianName || "Technician"} is on the way` 
        },
        completed: ['in_progress', 'ongoing', 'completed'].includes(status)
      },
      {
        date: jobData.workStartedAt ? formatDate(jobData.workStartedAt) : addDays(createdDate, 3),
        title: "Working on request",
        description: { title: "Processing" },
        completed: ['ongoing', 'completed'].includes(status)
      },
      {
        date: jobData.completedAt ? formatDate(jobData.completedAt) : addDays(createdDate, 4),
        title: "Completed",
        description: { title: "Success" },
        completed: status === 'completed'
      }
    ];

    return allSteps;
  };

  // Generate dynamic steps
  const steps = data ? generateDynamicSteps(data) : [];

  const renderStep = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.stepRow}>
      <View style={styles.iconColumn}>
        <View style={[
          styles.iconCircle,
          !item.completed && styles.iconCircleIncomplete
        ]}>
          <Text style={[
            styles.iconText,
            !item.completed && styles.iconTextIncomplete
          ]}>
            {index + 1}
          </Text>
        </View>
        <View style={[
          styles.diamondShape,
          !item.completed && styles.diamondShapeIncomplete
        ]} />
        {index !== steps.length - 1 && (
          <View style={[
            styles.verticalLine,
            !item.completed && styles.verticalLineIncomplete
          ]} />
        )}
      </View>
      <View style={[
        styles.stepContent,
        !item.completed && styles.stepContentIncomplete
      ]}>
        <View style={{ width: "55%" }}>
          <Text style={[
            styles.stepTitle,
            !item.completed && styles.stepTitleIncomplete
          ]}>
            {item.title}
          </Text>
          <Text style={[
            styles.stepDate,
            !item.completed && styles.stepDateIncomplete
          ]}>
            {item.date}
          </Text>
        </View>
        <View style={styles.stepRightBox}>
          <Text style={[
            styles.stepDescription,
            !item.completed && styles.stepDescriptionIncomplete
          ]}>
            --- {item.description.title}
          </Text>
          {item.description.subtitle && (
            <Text style={[
              styles.stepSubtitle,
              !item.completed && styles.stepSubtitleIncomplete
            ]}>
              {item.description.subtitle}
            </Text>
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
        onPress={() => navigation.goBack()}
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
            <Text>
              <Text style={styles.label}>Status</Text> - {data.status || "Pending"}
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
    marginBottom: verticalScale(20), // Add spacing between steps
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
  iconCircleIncomplete: {
    backgroundColor: "#9CA3AF",
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: moderateScale(12),
  },
  iconTextIncomplete: {
    color: "#FFFFFF",
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
  diamondShapeIncomplete: {
    backgroundColor: "#6B7280",
  },
  verticalLine: {
    width: 0,
    height: verticalScale(60),
    borderColor: "#153B93",
    borderStyle: "dashed",
    borderWidth: 1,
    alignSelf: "flex-start",
    marginLeft: scale(9),
    marginTop: verticalScale(5), // Adjust line positioning
  },
  verticalLineIncomplete: {
    borderColor: "#9CA3AF",
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
    minHeight: verticalScale(50), // Ensure consistent height
  },
  stepContentIncomplete: {
    backgroundColor: "#F5F5F5",
    borderColor: "#D1D5DB",
    opacity: 0.7,
  },
  stepTitle: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    marginBottom: verticalScale(4),
    color: "#153B93",
  },
  stepTitleIncomplete: {
    color: "#6B7280",
  },
  stepDate: {
    fontSize: moderateScale(12),
    color: "#000",
    fontWeight: "300",
  },
  stepDateIncomplete: {
    color: "#9CA3AF",
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
  stepDescriptionIncomplete: {
    color: "#9CA3AF",
  },
  stepSubtitle: {
    fontSize: moderateScale(10),
    fontWeight: "300",
    color: "#000",
  },
  stepSubtitleIncomplete: {
    color: "#9CA3AF",
  },
});
