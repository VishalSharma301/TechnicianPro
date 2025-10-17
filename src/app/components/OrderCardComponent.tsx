// src/app/components/OrderCardComponent.tsx

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PressableIcon from "./PressableIcon";
import { CartItemLocal } from "../../constants/types";

interface OrderCardProps {
  item : CartItemLocal
  serviceName: string;
  itemQuantity: number;
  setItemQuantity: (quantity: number) => void;
  selectedBrand?: string;
  itemPrice: number;
  inCart: boolean;
  onRemove: () => void;
  isLoading?: boolean;
}

const BORDER_COLOR = "#D9D9D9";

export default function OrderCardComponent({
  item,
  itemPrice,
  itemQuantity,
  selectedBrand,
  serviceName,
  setItemQuantity,
  inCart,
  onRemove,
  isLoading = false,
}: OrderCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        {/* Service Icon - only show in cart */}
        {inCart && (
          <View style={styles.iconContainer}>
            <Image
              source={require("../../../assets/ac.png")}
              style={styles.serviceIcon}
            />
          </View>
        )}

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>{serviceName}</Text>
          {selectedBrand && (
            <Text style={styles.brandText}>Brand: {selectedBrand}</Text>
          )}
          {!inCart && <Text style={styles.editText}>Edit {">"} </Text>}
        </View>

        {/* Quantity Controls */}
        <View style={styles.quantitySection}>
          {inCart ? (
            // Cart view - show editable quantity
            <View style={styles.cartQuantityContainer}>
              <TouchableOpacity
                style={[styles.quantityButton, styles.decreaseButton]}
                onPress={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                disabled={itemQuantity <= 1 || isLoading}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{itemQuantity} Items</Text>

              <TouchableOpacity
                style={[styles.quantityButton, styles.increaseButton]}
                onPress={() => setItemQuantity(itemQuantity + 1)}
                disabled={itemQuantity >= 8 || isLoading}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            // Non-cart view - show quantity controls
            <View style={styles.counterBox}>
              <TouchableOpacity
                disabled={itemQuantity > 8}
                onPress={() => setItemQuantity(itemQuantity + 1)}
              >
                <Text style={styles.counterBtn}>+</Text>
              </TouchableOpacity>

              <Text style={styles.counterBtn}>{itemQuantity}</Text>

              <TouchableOpacity
                onPress={() => setItemQuantity(itemQuantity - 1)}
                disabled={itemQuantity < 2}
              >
                <Text style={styles.counterBtn}>-</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Price */}
        <Text style={styles.price}>
          ₹{inCart ? item.totalPrice : itemPrice}
        </Text>
      </View>

      {/* Add More Items - only show when not in cart */}
      {!inCart && (
        <TouchableOpacity style={styles.addMoreContainer}>
          <Text style={styles.addMoreText}>+ Add More items</Text>
        </TouchableOpacity>
      )}

      {/* Remove Button - only show in cart */}
      {inCart && (
        <PressableIcon
          name="trash-bin"
          height={20}
          containerStyle={styles.removeButton}
          color="black"
          onPress={onRemove}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    position: "relative",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadadaff",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  serviceIcon: {
    resizeMode: "contain",
    height: 40,
    width: 40,
  },
  serviceInfo: {
    flex: 1,
    marginRight: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  brandText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  editText: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },
  quantitySection: {
    alignItems: "center",
    marginRight: 12,
  },
  cartQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8EFE6",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#B7C8B6",
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  decreaseButton: {
    backgroundColor: "#fff",
  },
  increaseButton: {
    backgroundColor: "#fff",
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  quantityText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    paddingHorizontal: 8,
    minWidth: 60,
    textAlign: "center",
  },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#153B93",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  counterBtn: {
    color: "#fff",
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  price: {
    textAlign: "right",
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },
  addMoreContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  addMoreText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#153B93",
  },
  removeButton: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 16,
    bottom: 16,
    padding: 4,
  },
});
