import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ItemData } from "../../constants/types";
import { AuthContext } from "../../store/AuthContext";
import { fetchMyBookedServices } from "../../util/bookServiceAPI";

type RootStackParamList = {
  ViewOrderScreen: {
    data: ItemData;
  };
};

const OrderHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "ViewOrderScreen">>();
  const data = route.params?.data;
  const [currentOrder, setCurrentOrder] = useState<boolean>(true);
  const {token} = useContext(AuthContext)

  useEffect(() => {
    async function fetchBooked() {
      console.log("fetching current order");
      
      try{

        const res = await fetchMyBookedServices(token)
        console.log("resssss ::", res);
        
      }catch(e){
        console.error("error :", e);
        
      }
    }

    fetchBooked()
  },[currentOrder]);


  useEffect(() => {
    async function fetchBooked() {
      console.log("fetching history");
      
      try{

        const res = await fetchMyBookedServices(token)
        console.log("res00 ::", res);
        
      }catch(e){
        console.error("error :", e);
        
      }
    }

    fetchBooked()
  },[!currentOrder]);

//   const steps = useMemo(() => {
//     if (!data) return [];

//     const baseSteps = [
//       {
//         date: data.createdAt,
//         title: "Request on",
//         description: { title: "Request assigned by ", subtitle: "User" },
//       },
//       {
//         date: data. || "25-05-2025",
//         title: "Request Accepted on",
//         description: { title: "Accepted by ", subtitle: data.providerName || "Guarmit Enterprises" },
//       },
//     ];

//     // Add technician assignment step only if technician is assigned
//     if (data.technicianAssignedAt) {
//       baseSteps.push({
//         date: data.technicianAssignedAt,
//         title: "Assigned to technician on",
//         description: { title: "Assigned to ", subtitle: data.technicianName || "Tejinder" },
//       });
//     }

//     // Add "on the way" step only if job is started
//     if (data.status === 'in_progress' || data.status === 'completed') {
//       baseSteps.push({
//         date: data.startedAt || "27-05-2025",
//         title: "On the way",
//         description: { title: `${data.technicianName || "Raja"} is on the way` },
//       });

//       baseSteps.push({
//         date: data.startedAt || "28-05-2025",
//         title: "Working on request",
//         description: { title: "Processing" },
//       });
//     }

//     // Add completion step only if completed
//     if (data.status === 'completed') {
//       baseSteps.push({
//         date: data.completedAt || "28-05-2025",
//         title: "Completed",
//         description: { title: "Success" },
//       });
//     }

//     return baseSteps;
//   }, [data]);

//   // ... rest of your component
// };
  

const steps = useMemo(()=>{ 
  if (!data) return[]
  
  const basesteps = [
    {
      date: data.createdAt,
      title: "Request on",
      description: { title: "Request assigned by ", subtitle: "User" },
    },
    {
      date: "25-05-2025",
      title: "Request Accepted on",
      description: { title: "Accepted by  ", subtitle: "Guarmit Enterprises" },
    },
    {
      date: "26-05-2025",
      title: "Assigned to technician on",
      description: { title: "Assigned to ", subtitle: "Tejinder" },
    },
    {
      date: "27-05-2025",
      title: "On the way",
      description: { title: "Raja is on the way " },
    },
    {
      date: "28-05-2025",
      title: "Working on request",
      description: { title: "Processing " },
    },
    {
      date: "28-05-2025",
      title: "Completed",

      description: { title: "Success " },
    },
  ]
    return basesteps
  }, [data])

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Order History</Text>

      <View style={styles.tabContainer}>
        <Pressable style={[styles.tab, currentOrder && styles.activeTab]} onPress={()=> setCurrentOrder(true)}>
          <Text >
            Current
          </Text>
        </Pressable>
        <Pressable style={[styles.tab, !currentOrder && styles.activeTab]} onPress={()=> setCurrentOrder(false)}>
          <Text >
            Completed
          </Text>
        </Pressable>
      </View>
      {currentOrder &&<>
      {!data &&
        <View style={styles.detailsBox}>
          <Text style={[styles.detailTitle, {alignSelf : 'center'}]}> No Orders Ongoing Currently </Text>
        </View>
      }

      { data &&<>
      <View style={styles.detailsBox}>
        <Text style={styles.detailTitle}>{data.name}</Text>
        <Text>
          <Text style={styles.label}>Service Type</Text> - {data.name}
        </Text>
        <Text>
          <Text style={styles.label}>Price</Text> - {data.price}/-
        </Text>
        <Text>
          <Text style={styles.label}>Address</Text> - {data.address}
        </Text>
        <Text>
          <Text style={styles.label}>Payment Mode</Text> - Cash on Delivery
        </Text>
        <Text>
          <Text style={styles.label}>Pin after job done</Text> - 1234
        </Text>
      </View>

      <View style={styles.timelineBox}>
        <Text style={styles.timelineTitle}>Timeline</Text>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <View style={styles.iconColumn}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>01</Text>
              </View>
              <View
                style={{
                  height: 30,
                  width: 50,
                  backgroundColor: "#001E63",
                  position: "absolute",
                  top: "27%",
                  left: "9%",
                  transform: [{ rotate: "45deg" }],
                }}
              ></View>
              {index !== steps.length - 1 && (
                <View style={styles.verticalLine} />
              )}
            </View>
            <View style={styles.stepContent}>
              <View style={{ width: "50%" }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#000",
                    fontWeight: 300,
                  }}
                >
                  {step.date}
                </Text>
              </View>
              <View style={{ marginLeft: 10, paddingTop: 8, width: "50%" }}>
                <Text style={styles.stepDescription}>
                  --- {step.description.title}
                </Text>
                {step.description.subtitle && (
                  <Text style={styles.stepSubtitle}>
                    {" "}
                    {step.description.subtitle}
                  </Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
      </>}
      </>}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fd",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#e4eefe",
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 8,
    fontWeight: "600",
    color: "gray",
    alignItems : 'center'
  },
  activeTab: {
    backgroundColor: "white",
    color: "black",
  },
  detailsBox: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
  },
  timelineTitle: {
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#153B93",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    // paddingVertical: 8,
    borderRadius: 10,
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    height: "8%",
    top: "-5%",
  },
  timelineBox: {
    backgroundColor: "white",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingLeft: 8,
    paddingVertical: 50,
    marginTop: "10%",
  },
  stepRow: {
    flexDirection: "row",
    // height : '15%',
    // borderWidth : 2
    // marginBottom: 24,
  },
  iconColumn: {
    alignItems: "center",
    // paddingBottom : 0
    // marginRight: 16,
  },
  iconCircle: {
    backgroundColor: "#153B93",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    zIndex: 1,
    borderBottomLeftRadius: 3,
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  verticalLine: {
    width: 0,
    height: 60,
    borderColor: "#153B93",
    borderStyle: "dashed",
    borderWidth: 1,
    alignSelf: "flex-start",
    marginLeft: 9,
  },
  stepContent: {
    flex: 1,
    backgroundColor: "#F1F6F0",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B7C8B6",
    position: "absolute",
    left: "6%",
    // elevation : -8,
    top: "10%",
    paddingLeft: 26,
    // marginBottom : 5
    // margin : 5
    flexDirection: "row",
    width: "90%",
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
    color: "#153B93",
  },
  stepDescription: {
    fontSize: 10,
    fontWeight: "500",
    color: "#000",
  },
  stepSubtitle: {
    fontSize: 10,
    fontWeight: "300",
    color: "#000",
  },
});

export default OrderHistoryScreen;
