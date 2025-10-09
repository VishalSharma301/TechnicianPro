import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import BookNowButton from "../../ui/BookNowButton";
import { CartContext } from "../../store/CartContext";
import {
  Address,
  ItemData,
  ServiceBrand,
  ServiceData,
} from "../../constants/types";
import { AddressContext } from "../../store/AddressContext";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import { ServicesContext } from "../../store/ServicesContext";

interface ServiceType {
  id: string;
  name: string;
  price: number;
  acCount: number;
}

interface BrandSelection {
  [key: number]: string; // index -> brand name
}

const colors = {
  primary: "#795FDA",
  secondry: "#F7F7F7",
};

const ACServiceCard = ({ service }: { service: ServiceData }) => {
  const [acType, setAcType] = useState<string>("");
  const [selectedServiceType, setSelectedServiceType] =
    useState<string>("single");
  const [currentSelectedBrand, setCurrentSelectedBrand] = useState<string>("");
  const [showBrandDropdown, setShowBrandDropdown] = useState<boolean>(false);
  const [currentBrandIndex, setCurrentBrandIndex] = useState<number>(0);
  const [addMoreQuantity, setAddMoreQuantity] = useState<number>(0);
  const { addToCart, isItemInTheCart } = useContext(CartContext);
  const { selectedAddress } = useContext(AddressContext);
  // const { brands } = useContext(ServicesContext);

  let a = service.name; // example
  let b = "";

  if (a.toLowerCase().includes("machine")) {
    b = "Mach..";
  } else if (a.toLowerCase().includes("ac")) {
    b = "AC";
  }

  // Static data
  const serviceTypes: ServiceType[] = [
    { id: "single", name: `Single ${b}`, price: 590, acCount: 1 },
    { id: "double", name: `Double ${b}`, price: 850, acCount: 2 },
    { id: "triple", name: `Triple ${b}`, price: 1600, acCount: 3 },
  ];

  const getCurrentServiceType = (): ServiceType => {
    return (
      serviceTypes.find((service) => service.id === selectedServiceType) ||
      serviceTypes[0]
    );
  };

  const getTotalACCount = (): number => {
    const currentService = getCurrentServiceType();
    return currentService.acCount + addMoreQuantity;
  };

  const calculateTotalPrice = (): number => {
    const currentService = getCurrentServiceType();
    const totalACs = getTotalACCount();
    // Base price for the service type + additional ACs charged at single AC rate
    const additionalACPrice = addMoreQuantity * 590; // Charge single AC rate for additional units
    return currentService.price + additionalACPrice;
  };

  const handleAddMoreQuantity = (increment: boolean): void => {
    if (increment) {
      setAddMoreQuantity((prev) => prev + 1);
    } else {
      setAddMoreQuantity((prev) => Math.max(0, prev - 1));
    }
  };

  const openBrandSelection = () => {
    setShowBrandDropdown(true);
  };

  const renderBrandSelections = () => {
    return (
      <TouchableOpacity
        style={[styles.selectBrandButton, styles.brandButtonSpacing]}
        onPress={() => openBrandSelection()}
      >
        <View style={styles.selectBrandContent}>
          <View style={styles.plusIcon}>
            <Text style={styles.plusText}>+</Text>
          </View>
          <Text style={styles.selectBrandText}>
            {currentSelectedBrand || "Select Brand"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  function handleBrandSelect(item: string) {
    setCurrentSelectedBrand(item);
    setShowBrandDropdown(false);
  }

  const renderBrandItem = ({ item }: { item: ServiceBrand }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleBrandSelect(item.name)}
    >
      <Text style={styles.dropdownItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const createCartItemFromACService = (): ItemData => {
    const currentService = getCurrentServiceType();
    const totalACs = getTotalACCount();
    const selectedBrandNames = Object.values(currentSelectedBrand);
    const totalPrice = calculateTotalPrice();

    // Create service name based on selection
    const serviceName = `${
      acType.charAt(0).toUpperCase() + acType.slice(1)
    } AC - ${currentService.name}`;

    // Create description with all details
    const brandsList =
      selectedBrandNames.length > 0
        ? selectedBrandNames.join(", ")
        : "No brands selected";

    const description = `Gas Filling Service for ${totalACs} ${acType} AC unit${
      totalACs > 1 ? "s" : ""
    }. 
Service Type: ${currentService.name}
Brands: ${brandsList}
Base Service: ${currentService.name} (₹${currentService.price})
${addMoreQuantity > 0 ? `Additional ACs: ${addMoreQuantity} x ₹590` : ""}`;

    // Dummy address and phone (you can replace with user's actual data)

    const cartItem: ItemData = {
      name: `${serviceName} - ${totalACs} Unit${totalACs > 1 ? "s" : ""}`,
      mainType: "AC Service",
      subType: "Gas Filling",
      isMakingNoise: null, // Not applicable for gas filling
      image: null, // You can add AC service image URL here
      notes:
        selectedBrandNames.length > 0 ? `Selected Brands: ${brandsList}` : null,
      price: totalPrice,
      description: description,
      // quantity: totalACs,
      quantity: 1,
      address: selectedAddress.address,
      phone: "+91-9876543210", // Dummy phone
      createdAt: new Date().toISOString(),
    };

    return cartItem;
  };

  // Function to handle add to cart
  const handleAddToCart = () => {
    try {
      // Validate that at least basic selection is made
      if (!selectedServiceType) {
        Alert.alert(
          "Selection Required",
          "Please select a service type first."
        );
        return;
      }

      // Check if all ACs have brands selected (optional validation)
      const totalACs = getTotalACCount();
      // const selectedBrandCount = Object.keys(currentSelectedBrand).length;

      if (!currentSelectedBrand || currentSelectedBrand == "") {
        Alert.alert(
          "Incomplete Selection",
          `Please select a brands for AC unit${totalACs > 1 ? "s" : ""}.`,
          [
            { text: "Add Anyway", onPress: () => proceedWithAddToCart() },
            { text: "Cancel", style: "cancel" },
          ]
        );
        return;
      }

      proceedWithAddToCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add item to cart. Please try again.");
    }
  };

  const proceedWithAddToCart = () => {
    const cartItem = createCartItemFromACService();
    const itemName = cartItem.name;

    // Check if item already exists in cart
    if (isItemInTheCart(itemName)) {
      Alert.alert(
        "Item Already in Cart",
        "This AC service configuration is already in your cart. Do you want to add it again?",
        [
          {
            text: "Add Again",
            onPress: () => {
              // Modify name to make it unique
              cartItem.name = `${itemName} (${Date.now()})`;
              addToCart(cartItem);
              showSuccessAlert();
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } else {
      addToCart(cartItem);
      showSuccessAlert();
    }
  };

  const showSuccessAlert = () => {
    const totalACs = getTotalACCount();
    const totalPrice = calculateTotalPrice();

    Alert.alert(
      "Added to Cart!",
      `${
        acType.charAt(0).toUpperCase() + acType.slice(1)
      } AC Gas Filling service for ${totalACs} unit${
        totalACs > 1 ? "s" : ""
      } has been added to your cart.\n\nTotal: ₹${totalPrice}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.card}>
      {/* Gas Filling Tag */}
      <View style={styles.tagContainer}>
        <View style={styles.gasFillTag}>
          <Text style={styles.tagText}>
            {service ? service.name : " SERVICE NAME"}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {/* Window/Split Toggle */}
        <View style={styles.toggleContainer}>
      {service.options.map((option) => (
        <TouchableOpacity
          key={option._id}
          style={[
            styles.toggleButton,
            acType === option.name
              ? styles.activeToggle
              : styles.inactiveToggle,
          ]}
          onPress={() => setAcType(option.name)}
        >
          <Text
            style={[
              styles.toggleText,
              acType === option.name
                ? styles.activeToggleText
                : styles.inactiveToggleText,
            ]}
          >
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
          {/* Price and AC Count Display */}
          <View style={styles.priceSection}>
            <View>
              <Text style={styles.priceAmount}>₹{calculateTotalPrice()}</Text>
              <Text style={styles.priceLabel}>Service Price</Text>
            </View>

            {/* AC Count Display (Read-only) */}
            <View style={styles.quantityDisplayContainer}>
              <Text style={styles.priceAmount}>{getTotalACCount()}</Text>
              <Text style={styles.quantityLabel}>Total Items</Text>
            </View>
          </View>

          {/* Brand Selections */}
          <ScrollView
            style={styles.brandSelectionsContainer}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {renderBrandSelections()}
          </ScrollView>
          <BookNowButton
            style={{
              height: verticalScale(29),
              width: scale(102),
              borderRadius: moderateScale(8),
              marginTop: verticalScale(12),
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
            text="Add to Cart"
            onPress={handleAddToCart}
          />
        </View>
        {/* Right Section */}
        <View style={styles.rightSection}>
          {/* Service Type Options */}
          <View style={styles.serviceOptions}>
            {serviceTypes.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceOption,
                  selectedServiceType === service.id &&
                    styles.selectedServiceOption,
                ]}
                onPress={() => setSelectedServiceType(service.id)}
              >
                <Text
                  style={[
                    styles.serviceName,
                    selectedServiceType === service.id &&
                      styles.selectedServiceName,
                  ]}
                >
                  {service.name}
                </Text>
                <Text
                  style={[
                    styles.servicePrice,
                    selectedServiceType === service.id &&
                      styles.selectedServicePrice,
                  ]}
                >
                  {service.price}/-
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add More Section */}
          <View style={styles.addMoreSection}>
            <Text style={styles.addMoreLabel}>Add More</Text>
            <View style={styles.addMoreControls}>
              <TouchableOpacity
                style={[
                  styles.addMoreButton,
                  {
                    borderRightWidth: moderateScale(0.5),
                    borderStyle: "dashed",
                    borderColor: "#B4B4B4",
                  },
                ]}
                onPress={() => handleAddMoreQuantity(false)}
              >
                <Text style={styles.addMoreButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={() => handleAddMoreQuantity(true)}
              >
                <Text style={styles.addMoreButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Brand Selection Modal */}
      <Modal
        visible={showBrandDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowBrandDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowBrandDropdown(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.dropdownContainer}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownHeaderText}>
                  Select Brand for AC {currentBrandIndex + 1}
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowBrandDropdown(false)}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={service.brands}
                renderItem={renderBrandItem}
                keyExtractor={(item) => item._id}
                style={styles.dropdownList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderLeftWidth: moderateScale(5), // 6 → 5
    borderColor: colors.primary,
    backgroundColor: "#fff",
    padding: moderateScale(14), // 16 → 14
    shadowColor: "#000",
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(3),
    width: scale(350),
  },
  tagContainer: {
    alignItems: "flex-end",
    marginBottom: verticalScale(12),
  },
  gasFillTag: {
    backgroundColor: "#FF0000",
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(4),
  },
  tagText: {
    color: "#fff",
    fontSize: moderateScale(12),
    fontWeight: "bold",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "center",
  },
  leftSection: {
    width: scale(159), // 175 → 159
    borderRightWidth: 0.5,
    borderStyle: "dashed",
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: verticalScale(16),
  },
  toggleButton: {
    borderRadius: moderateScale(3),
    marginRight: moderateScale(8),
    height: verticalScale(22), // 24 → 22
    width: scale(71), // 79 → 71
    alignItems: "center",
    justifyContent: "center",
  },
  activeToggle: {
    backgroundColor: colors.secondry,
    borderColor: colors.primary,
    borderWidth: moderateScale(1),
  },
  inactiveToggle: {
    backgroundColor: "#fff",
    borderColor: "#939393",
    borderWidth: moderateScale(1),
  },
  toggleText: {
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  activeToggleText: {
    color: colors.primary,
  },
  inactiveToggleText: {
    color: "#939393",
  },
  priceSection: {
    marginBottom: verticalScale(16),
    flexDirection: "row",
  },
  priceAmount: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: colors.primary,
  },
  priceLabel: {
    fontSize: moderateScale(12),
    color: "#666",
    marginBottom: verticalScale(8),
  },
  quantityDisplayContainer: {
    marginLeft: scale(13), // 15 → 13
    alignItems: "flex-start",
    marginBottom: verticalScale(4),
  },
  quantityDisplay: {
    backgroundColor: "#F0F8FF",
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(2),
    borderColor: "#6B73FF",
  },
  quantityLabel: {
    fontSize: moderateScale(12),
    color: "#666",
  },
  brandSelectionsContainer: {
    maxHeight: verticalScale(120),
  },
  selectBrandButton: {
    marginTop: verticalScale(8),
  },
  brandButtonSpacing: {
    marginBottom: verticalScale(8),
  },
  selectBrandContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  plusIcon: {
    width: scale(22), // 24 → 22
    height: scale(22), // 24 → 22
    borderRadius: scale(11), // 12 → 11
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
  },
  plusText: {
    fontSize: moderateScale(16),
    color: "#666",
  },
  selectBrandText: {
    fontSize: moderateScale(14),
    color: "#666",
  },
  rightSection: {
    width: scale(158), // 175 → 158
    paddingLeft: scale(16), // 18 → 16
  },
  serviceOptions: {
    marginBottom: verticalScale(16),
    gap: verticalScale(7),
  },
  serviceOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(4),
    backgroundColor: "#fff",
    height: verticalScale(31), // 35 → 31
    width: scale(139), // 155 → 139
    borderWidth: 1,
    borderColor: "#DEDEDE",
  },
  selectedServiceOption: {
    backgroundColor: "#F7F7F7",
    borderColor: colors.primary,
    borderWidth: moderateScale(1),
  },
  serviceName: {
    fontSize: moderateScale(14),
    color: "#333",
  },
  selectedServiceName: {
    color: colors.primary,
    fontWeight: "500",
  },
  servicePrice: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#333",
  },
  selectedServicePrice: {
    color: colors.primary,
  },
  addMoreSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(12),
    borderTopWidth: moderateScale(1),
    borderTopColor: "#E0E0E0",
  },
  addMoreLabel: {
    fontSize: moderateScale(14),
    color: "#939393",
    fontWeight: "600",
  },
  addMoreControls: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(5),
    backgroundColor: colors.secondry,
    paddingVertical: moderateScale(5),
    height: verticalScale(28), // 31 → 28
  },
  addMoreButton: {
    width: scale(30), // 33 → 30
    justifyContent: "center",
    alignItems: "center",
  },
  addMoreButtonText: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: "#333",
  },
  addMoreQuantity: {
    fontSize: moderateScale(14),
    fontWeight: "bold",
    marginHorizontal: scale(12),
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(12),
    width: "80%",
    maxHeight: "60%",
    overflow: "hidden",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#E0E0E0",
  },
  dropdownHeaderText: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    width: scale(30),
    height: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: moderateScale(24),
    color: "#666",
  },
  dropdownList: {
    maxHeight: verticalScale(300),
  },
  dropdownItem: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: moderateScale(16),
    color: "#333",
  },
});

export default ACServiceCard;
