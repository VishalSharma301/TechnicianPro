import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  Animated,
  Dimensions,
  StatusBar,
  KeyboardTypeOptions,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AddressContext } from "../../store/AddressContext";
import AddressCard from "../components/AddressCard";
import { scale, verticalScale, moderateScale } from "../../util/scaling";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get('window');

export default function SelectLocationScreen() {
  const { addresses, setAddresses, selectedAddress, setSelectedAddress } =
    useContext(AddressContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(height));
  const [fadeAnimation] = useState(new Animated.Value(0));

  // split fields properly
  const [newLabel, setNewLabel] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    console.log("selectedAddress", selectedAddress);
  }, [selectedAddress]);

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimation, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible]);

  const resetForm = () => {
    setNewLabel("");
    setStreet("");
    setCity("");
    setStateName("");
    setZipCode("");
    setNewPhone("");
  };

  const handleAddAddress = () => {
    if (!newLabel || !street || !city || !stateName || !zipCode || !newPhone) {
      Alert.alert("Missing Fields", "Please fill all the fields.", [
        { text: "OK", style: "default" }
      ], { 
        cancelable: true,
      });
      return;
    }

    // keep address as a STRING for compatibility with AddressCard
    const addressString = `${street}, ${city}, ${stateName} ${zipCode}`;

    const newEntry = {
      label: newLabel,
      address: addressString,
      phone: newPhone,
      // static for now; make dynamic when you wire location later
      coordinates: {
        lat: 30.7046,
        lng: 76.7179,
      },
    };

    setAddresses((prev) => [newEntry, ...prev]);
    closeModal();
    Alert.alert("Success!", "Address has been added successfully.", [
      { text: "OK", style: "default" }
    ], { 
      cancelable: true,
    });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    resetForm();
    setModalVisible(false);
  };

  const renderInput = (placeholder : string, value : string, onChangeText : any, keyboardType : KeyboardTypeOptions = "default", icon : keyof typeof Icon.glyphMap) => (
    <View style={styles.inputContainer}>
      {icon && <Icon name={icon} size={20} color="#6B7280" style={styles.inputIcon} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={[styles.modalInput, icon && styles.inputWithIcon]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={moderateScale(24)} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a Location</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="magnify" size={moderateScale(20)} color="#6B7280" />
        <TextInput
          placeholder="Search For Services"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Icon name="tune" size={moderateScale(20)} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Add Address */}
      <TouchableOpacity style={styles.addAddress} onPress={openModal}>
        <View style={styles.addAddressIcon}>
          <Icon name="plus" size={moderateScale(25)} color="#153B93" />
        </View>
        <Text style={styles.addAddressText}>Add New Address</Text>
        <Icon name="chevron-right" size={moderateScale(18)} color="#6B7280" />
      </TouchableOpacity>

      {/* Current Location */}
      <View style={styles.currentLocationCard}>
        <View style={styles.currentLocationIcon}>
          <Icon name="crosshairs-gps" size={moderateScale(20)} color="#3B82F6" />
        </View>
        <View style={styles.currentLocationInfo}>
          <Text style={styles.currentTitle}>Use Current Location</Text>
          <Text style={styles.currentSubtitle}>Cheema Colony, Bassi Pathana</Text>
        </View>
      </View>

      {/* Saved Address Title */}
      <Text style={styles.savedTitle}>SAVED ADDRESSES</Text>

      <FlatList
        data={addresses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <AddressCard item={item} />}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
        showsVerticalScrollIndicator={false}
      />

      {/* Enhanced Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalBackdrop,
              {
                opacity: fadeAnimation,
              },
            ]}
          >
            <TouchableOpacity
              style={StyleSheet.absoluteFillObject}
              activeOpacity={1}
              onPress={closeModal}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: slideAnimation }],
              },
            ]}
          >
                <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    enableOnAndroid={true}
    extraScrollHeight={20}
    keyboardShouldPersistTaps="handled"
  >

            <View style={styles.modalHandle} />
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Address</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              {renderInput("Address Label (e.g., Home, Office)", newLabel, setNewLabel, "default", "tag-outline")}
              {renderInput("Street Address", street, setStreet, "default", "road")}
              {renderInput("City", city, setCity, "default", "city")}
              {renderInput("State", stateName, setStateName, "default", "map-marker")}
              {renderInput("ZIP Code", zipCode, setZipCode, "numeric", "mailbox")}
              {renderInput("Phone Number", newPhone, setNewPhone, "phone-pad", "phone")}
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
                <Icon name="plus" size={20} color="#FFFFFF" style={styles.addButtonIcon} />
                <Text style={styles.addButtonText}>Add Address</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: scale(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginLeft: scale(8),
    color: "#1F2937",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    // paddingVertical: verticalScale(8),
    height: verticalScale(50),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: verticalScale(15),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#1F2937",
    marginLeft: scale(12),
  },
  filterIcon: {
    padding: 4,
  },
  addAddress: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: moderateScale(16),
    // borderRadius: scale(12),
    height: verticalScale(56),
     borderWidth : 1,
    borderColor : '#fff',
    borderBottomColor : '#0000001A',
    // marginBottom: verticalScale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  addAddressIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  addAddressText: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#1F2937",
  },
  currentLocationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: moderateScale(16),
    // borderRadius: scale(12),
    marginBottom: verticalScale(20),
    height: verticalScale(67),
    borderWidth : 1,
    borderColor : '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  currentLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(12),
  },
  currentLocationInfo: {
    flex: 1,
  },
  currentTitle: {
    fontWeight: "600",
    fontSize: moderateScale(16),
    color: "#1F2937",
    marginBottom: 2,
  },
  currentSubtitle: {
    fontSize: moderateScale(14),
    color: "#6B7280",
  },
  savedTitle: {
    fontSize: moderateScale(12),
    color: "#9CA3AF",
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: verticalScale(12),
  },

  // Enhanced Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    maxHeight: height * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: "#1F2937",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  modalInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#1F2937",
    paddingVertical: 14,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  modalFooter: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 20,
    paddingBottom: 32,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#6B7280",
  },
  addButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
