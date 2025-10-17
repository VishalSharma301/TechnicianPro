// src/app/screens/CartScreen.tsx

import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { CartContext } from "../../store/CartContext";
import OrderCardComponent from "../components/OrderCardComponent";
import BookNowButton from "../../ui/BookNowButton";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const {
    cartItems,
    totalPrice,
    totalItems,
    isCartEmpty,
    isLoading,
    fetchCart,
    updateItemQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation()

  // Fetch cart data when component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCart();
    setRefreshing(false);
  };

  // Handle quantity update
  const handleQuantityUpdate = async (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateItemQuantity(itemId, newQuantity);
    }
  };

  // Handle item removal
  const handleRemoveItem = async (itemId: string) => {
    console.log("id :", itemId);

    await removeFromCart(itemId);
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#153B93" />
        <Text style={styles.loadingText}>Loading cart...</Text>
      </View>
    );
  }

  if (isCartEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your Cart Is Empty!</Text>
        <Text style={styles.emptySubtitle}>
          Add some services to get started
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cart Summary Header */}
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryTitle}>Cart Summary</Text>
        <Text style={styles.summaryDetails}>
          {totalItems} item(s) • Total: ₹{totalPrice}
        </Text>
      </View>

      {/* Cart Items List */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.scrollView}
      >
        {cartItems.map((item) => (
          <OrderCardComponent
            item = {item}
            key={item._id}
            itemPrice={item.basePrice}
            itemQuantity={item.quantity}
            serviceName={item.serviceName}
            selectedBrand={item.selectedBrand}
            setItemQuantity={(newQuantity: number) =>
              handleQuantityUpdate(item._id, newQuantity)
            }
            onRemove={() => handleRemoveItem(item._id)}
            inCart={true}
            isLoading={isLoading}
          />
        ))}
      </ScrollView>

      {/* Checkout Section */}
      <View style={styles.checkoutSection}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal ({totalItems} items)</Text>
          <Text style={styles.priceValue}>₹{totalPrice}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{totalPrice}</Text>
        </View>

        <BookNowButton
          text={`Book Services - ₹${totalPrice}`}
          style={styles.payButton}
          textStyle={styles.payButtonText}
          onPress={() => {
            navigation.navigate("BookingScheduleScreen");
          }}
          disabled={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  summaryHeader: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  summaryDetails: {
    fontSize: 14,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  checkoutSection: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666",
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  payButton: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    marginTop: 0,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
