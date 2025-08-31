import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AddressContext } from "../../store/AddressContext";
import { ServiceDetailContext } from "../../store/ServiceTypeContext";
import { CartContext } from "../../store/CartContext";
import OrderCardComponent from "../components/OrderCardComponent";
import { getServiceTags } from "../../util/getServiceTags";
import { bookService, bookServiceAPI } from "../../util/bookServiceAPI";
import { ItemData } from "../../constants/types";
import { AuthContext } from "../../store/AuthContext";

const BORDER_COLOR = "#D9D9D9";

export default function ViewOrderScreen() {
  const navigation = useNavigation<any>();
  const { selectedAddress } = useContext(AddressContext);
  const { token, fetchToken } = useContext(AuthContext);
  const { serviceDetails } = useContext(ServiceDetailContext);

  const { addToCart, cartItems, isItemInTheCart, removeFromCart } =
    useContext(CartContext);
  const [itemQuantity, setItemQuantity] = useState(1);
  const route = useRoute<any>().params;
  const serviceName = route.service.name;
  const itemPrice = route.service.basePrice;
  const description = route.service.description
  const [isItemInCart, setIsItemInCart] = useState(false);
  const formData = new FormData();
  const now = new Date();
  // const serviceName = useRoute<any>().params.serviceName
  // const [itemData, setItemData] = useState<ItemData>();

  const itemData = {
    name: serviceName,
    quantity: itemQuantity,
    price: itemPrice,
    description : description,
    image: serviceDetails.image ? "Image Added" : "No Image",
    isMakingNoise:
      serviceDetails.isMakingNoise !== null
        ? serviceDetails.isMakingNoise == "No"
          ? "No Noise"
          : "Making Noise"
        : null,
    mainType: serviceDetails.mainType,
    subType: serviceDetails.subType,
    notes: serviceDetails.notes ? "Note Added" : "No Notes",
    address: selectedAddress.address,
    phone: selectedAddress.phone,
    createdAt: "",
  }

  

  useEffect(() => {
    console.log("cartItems", cartItems);
  });

  useEffect(() => {
    const isItemInCart = isItemInTheCart(serviceName);
    isItemInCart && setIsItemInCart(true);
    console.log(isItemInTheCart(serviceName));
  }, [cartItems]);

  function removeFromCartAlert() {
    Alert.alert(
      "Remove from Cart",
      "Do you want to remove the item from the cart?",
      [
        {
          text: "Ok",
          onPress: () => {
            removeFromCart(serviceName);
            console.log("removed", cartItems);
            setIsItemInCart(false);
          },
          style: "default",
        },
        {
          text: "Cancel",
          onPress: () => console.log("cancelled"),
          style: "cancel",
        },
      ]
    );
  }

  const selectedServices = getServiceTags(serviceDetails);

  function addToCarttt() {
    console.log("addedToCart", itemData);
    addToCart(itemData);
    console.log("newcart", cartItems);
  }

  formData.append("name", serviceName);
  formData.append("quantity", itemQuantity.toString());
  formData.append("price", itemPrice.toString());
  formData.append(
    "isMakingNoise",
    serviceDetails.isMakingNoise ? serviceDetails.isMakingNoise : ""
  );
  formData.append("mainType", serviceDetails.mainType);
  formData.append("subType", serviceDetails.subType ? serviceDetails.subType : "");
  formData.append("notes", serviceDetails.notes ? serviceDetails.notes : "");
  formData.append("address", selectedAddress.address);
  formData.append("phone", selectedAddress.phone);

  if (serviceDetails.image?.uri && serviceDetails.image?.type) {
    formData.append("image", {
      uri: serviceDetails.image.uri,
      type: serviceDetails.image.type,
      name: serviceDetails.image.fileName || "image.jpg",
    } as unknown as Blob);
  } else {
    console.warn("Image is missing or invalid");
  }

  useEffect(() => {
    console.log("formData", formData);
  });

  async function bookNow() {
    if(!token){
      await fetchToken()
    }
    if (selectedAddress.address && selectedAddress.phone) {
      const finalData = {
        ...itemData,
        createdAt: now.toDateString(),
      };
      formData.append("createdAt", now.toLocaleString());
      console.log('tokenisHERE', token);
      
      try {
        // await bookService(serviceName, formData);
       const response =  await bookServiceAPI(token)

       const pin = response.serviceRequest.completionPin || 'Pin not available';
       navigation.navigate("JobDetailsScreen", { data: finalData , pin : pin});
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
      } catch (error) {
        console.error("Booking failed:", error);
      
      }
    } else {
      Alert.alert(
        "Invalid Address or phone",
        "Please select a valid address and Phone number"
      );
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View Order</Text>
        <TouchableOpacity
          onPress={!isItemInCart ? addToCarttt : removeFromCartAlert}
        >
          <Ionicons
            name={!isItemInCart ? "cart-outline" : "cart"}
            size={21}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* Service Summary */}

      <OrderCardComponent
        inCart={false}
        itemPrice={itemPrice}
        itemQuantity={itemQuantity}
        selectedServices={selectedServices}
        serviceName={serviceName}
        setItemQuantity={setItemQuantity}
      />

      {/* Coupon View */}
      <TouchableOpacity style={styles.couponBox}>
        <Text style={styles.couponText}>
          <MaterialIcons name="local-offer" />
          View All coupon
        </Text>
        <Ionicons name="chevron-forward" size={18} color="#000" />
      </TouchableOpacity>

      {/* Delivery Info */}
      <View style={styles.deliveryCard}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Octicons name="stopwatch" size={14} style={{ marginRight: 10 }} />
          <Text style={styles.deliveryTitle}>Delivery in 96 Hour</Text>
        </View>
        <Text style={styles.scheduleText}>Want this later? Schedule it</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Octicons name="home" size={14} style={{ marginRight: 10 }} />
          <Text style={styles.deliveryTitle}>
            Delivery at {selectedAddress.label}
          </Text>
        </View>

        {selectedAddress.label ? (
          <>
            <Text style={styles.addressText}>
              {selectedAddress.address}
              {"\n"}
              Phone number: {selectedAddress.phone}
            </Text>
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("AddressScreen")}
              >
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={15}
                  color="#000"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Ionicons name="send" size={15} color="#000" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("AddressScreen")}
          >
            <Text style={{ color: "blue", margin: 8 }}>Select Location</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.payLabel}>Pay Using Cash</Text>
          <Text style={styles.orText}>Or</Text>
          <Text style={styles.payLabel}>Card</Text>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={() => bookNow()}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.totalText}>₹{itemPrice * itemQuantity}</Text>
            <Text style={{ fontSize: 10, fontWeight: "500", color: "#fff" }}>
              TOTAL
            </Text>
          </View>
          <Text style={styles.placeOrderText}>Place Order &gt;</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,'
    paddingBottom: 50,
    backgroundColor: "#EEF3FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  couponBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 20,
    marginTop: "3%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  couponText: {
    fontSize: 12,
    color: "#00000080",
    fontWeight: "500",
  },
  deliveryCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginTop: "3%",
    height: "32%",
    // paddingBottom : 29,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  deliveryTitle: {
    fontWeight: "500",
    fontSize: 12,
  },
  scheduleText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000000B2",
    marginTop: 3,
    marginLeft: 22,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    paddingBottom: 10,
    marginRight: 100,
    marginBottom: 15,
  },
  separator: {
    height: 1,
    // backgroundColor: "#ccc",
    marginTop: 8,
    marginBottom: 15,
    borderWidth: 0.5,
    borderStyle: "dashed",
    marginLeft: 22,
    marginRight: "35%",
  },
  addressText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000000B2",
    marginTop: 4,
    marginLeft: 22,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    marginLeft: 22,
    borderBottomWidth: 1,
    borderStyle: "dashed",
    paddingBottom: 7,
    // marginRight: 100,
  },
  btn: {
    height: 24,
    width: 24,
    backgroundColor: "#7494CE1A",
    borderWidth: 1,
    borderColor: "#576F9B47",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: "3%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  payLabel: {
    fontSize: 12,
    color: "#000",
  },
  orText: {
    fontSize: 10,
    color: "#999",
  },
  orderButton: {
    backgroundColor: "#153B93",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    gap: "5%",
  },
  totalText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  placeOrderText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
