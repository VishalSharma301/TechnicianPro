import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ItemData } from "../../constants/types";
import { AuthContext } from "../../store/AuthContext";
import {
  fetchMyBookedServices,
  fetchMyHistory,
} from "../../util/bookServiceAPI";
import { ServicesContext } from "../../store/ServicesContext";
import { verticalScale, moderateScale, scale } from "../../util/scaling";
import PressableIcon from "../components/PressableIcon";
import { RefreshControl } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type RootStackParamList = {
  ViewOrderScreen: {
    data: ItemData;
    pin: string | number | null;
  };
};

const OrderHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "ViewOrderScreen">>();
const [refreshing, setRefreshing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<boolean>(true);
  const { token } = useContext(AuthContext);
  const {
    setOngoingServices,
    ongoingServices,
    completedServices,
    setCompletedServices,
    fetchOngoingServices,
    fetchCompletedServices
  } = useContext(ServicesContext);
  const isFocused = useIsFocused();

  // Fetch ongoing services when screen is focused
  useEffect(() => {
    if (isFocused) {
     
      fetchOngoingServices();
    }
  }, [isFocused, token, setOngoingServices]);

  // Fetch completed services once
  useEffect(() => {
   
    fetchCompletedServices();
  }, [token, setCompletedServices]);


  const onRefresh = async () => {
  setRefreshing(true);
  try {
    // ✅ Fetch services again
    const newServices = await fetchOngoingServices() // make sure you import fetchServices

  } catch (error) {
    console.error("Failed to refresh services:", error);
  } finally {
    setRefreshing(false);
  }
};


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderServiceItem = ({ item }: { item: any }) => {
    const pin = item.completionPin || null;

    const data: ItemData = {
      name: item.service?.name || "Service",
      createdAt: formatDate(item.createdAt),
      description: item.notes || "No description",
      price: item.service?.price || "unavailable",
      subType: item.service?.subType || "General",
      notes: item.notes || "No additional notes",
      image: item.service?.image || "https://via.placeholder.com/150",
      isMakingNoise: item.isMakingNoise || false,
      mainType: item.service?.mainType || "General",
      phone: item.user?.phone || "N/A",
      address: item.address
       ,
      quantity: item.quantity || 1,
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("JobDetailsScreen", { data: data, pin: pin })
        }
        style={styles.serviceCard}
      >
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceTitle}>
            {item.service?.name || "Service"}
          </Text>
          <View
            style={[
              styles.statusBadge,
              item.status === "pending"
                ? styles.pendingStatus
                : item.status === "completed"
                ? styles.completedStatus
                : styles.defaultStatus,
            ]}
          >
            <Text style={styles.statusText}>{item.status?.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.serviceDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              Scheduled: {formatDate(item.scheduledDate)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              Zipcode: {item.address?.zipcode || "N/A"}
            </Text>
          </View>

          {item.completionPin && (
            <View style={styles.detailRow}>
              <Ionicons name="key-outline" size={16} color="#666" />
              <Text style={styles.detailText}>
                Completion PIN: {item.completionPin}
              </Text>
            </View>
          )}

          {item.notes && (
            <View style={styles.detailRow}>
              <Ionicons name="document-text-outline" size={16} color="#666" />
              <Text style={styles.detailText}>Notes: {item.notes}</Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.detailText}>
              Created: {formatDate(item.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Decide which list to show based on tab
  const dataToRender = currentOrder ? ongoingServices : completedServices;
  const isEmpty = !dataToRender || dataToRender.length === 0;

  return (
    <ScrollView style={styles.container} refreshControl={
  <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={["#007AFF"]}
      tintColor="#007AFF"
    />
    }>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: verticalScale(6),
        }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <PressableIcon
          containerStyle={{ flexDirection: "row", alignItems: "center" }}
          text="Cart"
          name="cart"
          height={moderateScale(26)}
          color="black"
          onPress={() => navigation.navigate("CartScreen")}
        />
      </View>

      <Text style={styles.header}>Order History</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, currentOrder && styles.activeTab]}
          onPress={() => setCurrentOrder(true)}
        >
          <Text style={[styles.tabText, currentOrder && styles.activeTabText]}>
            Current
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, !currentOrder && styles.activeTab]}
          onPress={() => setCurrentOrder(false)}
        >
          <Text style={[styles.tabText, !currentOrder && styles.activeTabText]}>
            Completed
          </Text>
        </Pressable>
      </View>

      {/* List */}
      {isEmpty ? (
        <View style={styles.detailsBox}>
          <Ionicons
            name={currentOrder ? "clipboard-outline" : "checkmark-circle-outline"}
            size={48}
            color="#ccc"
            style={styles.emptyIcon}
          />
          <Text style={[styles.detailTitle, { alignSelf: "center" }]}>
            {currentOrder
              ? "No Orders Ongoing Currently"
              : "No Completed Orders"}
          </Text>
          <Text style={styles.emptySubtext}>
            {currentOrder
              ? "Your active service requests will appear here"
              : "Your completed service history will appear here"}
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>
            {currentOrder
              ? `Active Services (${dataToRender.length})`
              : `Completed Services (${dataToRender.length})`}
          </Text>
          <FlatList
            data={dataToRender}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            renderItem={renderServiceItem}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fd",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
  },
  backButton: {
    flexDirection: "row",
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#e4eefe",
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(16),
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontWeight: "600",
    color: "gray",
    fontSize: moderateScale(14),
  },
  activeTabText: {
    color: "black",
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: verticalScale(12),
    color: "#333",
  },
  detailsBox: {
    backgroundColor: "white",
    borderRadius: moderateScale(16),
    padding: moderateScale(24),
    marginBottom: verticalScale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(1) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(2),
    elevation: 2,
    alignItems: "center",
  },
  detailTitle: {
    fontWeight: "600",
    fontSize: moderateScale(16),
    marginBottom: verticalScale(8),
    textAlign: "center",
  },
  emptyIcon: {
    marginBottom: verticalScale(12),
  },
  emptySubtext: {
    color: "#666",
    textAlign: "center",
    fontSize: moderateScale(14),
  },
  serviceCard: {
    backgroundColor: "white",
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    marginBottom: verticalScale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(1) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(2),
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  serviceTitle: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
    marginLeft: scale(8),
  },
  pendingStatus: {
    backgroundColor: "#fff3cd",
  },
  completedStatus: {
    backgroundColor: "#d4edda", // light green
  },
  defaultStatus: {
    backgroundColor: "#d1ecf1",
  },
  statusText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#333",
  },
  serviceDetails: {
    gap: verticalScale(8),
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  detailText: {
    fontSize: moderateScale(14),
    color: "#666",
    flex: 1,
  },
});

export default OrderHistoryScreen;
