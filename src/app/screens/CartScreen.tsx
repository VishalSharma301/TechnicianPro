import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator, RefreshControl } from "react-native";
import { CartContext } from "../../store/CartContext";
import OrderCardComponent from "../components/OrderCardComponent";
import { ServiceData } from "../../constants/types";
import { getServiceTags } from "../../util/getServiceTags";
import BookNowButton from "../../ui/BookNowButton";
import { ProfileContext } from "../../store/ProfileContext";
import { AddressContext } from "../../store/AddressContext";

interface CartScreenProps {
  userId: string; // You'll need to pass this from your navigation or user context
  zipcode: string; // You'll need to pass this from your location context
}

export default function CartScreen() {
  const { 
    cartItems, 
    cartData, 
    totalPrice, 
    totalItems, 
    isCartEmpty, 
    isLoading, 
    fetchCart, 
    updateItemQuantity, 
    removeFromCart 
  } = useContext(CartContext);
  const {userId} = useContext(ProfileContext)
  const {selectedAddress} = useContext(AddressContext)
  
  const [refreshing, setRefreshing] = useState(false);

  const zipcode = selectedAddress.address.zipcode

  // Fetch cart data when component mounts
  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    if (userId) {
      await fetchCart(userId);
    }
    setRefreshing(false);
  };

  // Handle quantity update
  const handleQuantityUpdate = async (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateItemQuantity(itemId, newQuantity, userId);
    }
  };

  // Handle item removal
  const handleRemoveItem = async (itemName: string) => {
    await removeFromCart(itemName, userId);
  };

  if (isLoading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Loading cart...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isCartEmpty && !isLoading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#666' }}>
            Your Cart Is Empty!
          </Text>
          <Text style={{ fontSize: 14, color: '#999', marginTop: 8 }}>
            Add some services to get started
          </Text>
        </View>
      )}

      {!isCartEmpty && (
        <>
          {/* Cart Summary Header */}
          <View style={{ 
            padding: 16, 
            backgroundColor: '#f8f9fa', 
            borderBottomWidth: 1, 
            borderBottomColor: '#e9ecef' 
          }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
              Cart Summary
            </Text>
            <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
              {totalItems} item(s) • Total: ₹{totalPrice}
            </Text>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ flex: 1 }}
          >
            {/* Render items from API data (cartData) for more accurate information */}
            {cartData.map((cartItem, idx) => {
              // Map API cart item to your existing ServiceData format
              const selectedServicesxxx: ServiceData = {
                image: cartItem.service.icon ? "Image Added" : "No Image",
                isMakingNoise: null, // You may need to add this to API response
                mainType: cartItem.service.category.name,
                subType: cartItem.service.name,
                notes: "No Notes", // You may need to add this to API response
              };

              const selectedServices = getServiceTags(selectedServicesxxx);

              return (
                <OrderCardComponent
                  itemPrice={cartItem.itemTotal}
                  itemQuantity={cartItem.quantity}
                  serviceName={cartItem.service.name}
                  selectedServices={selectedServices}
                  setItemQuantity={(newQuantity: number) => 
                    handleQuantityUpdate(cartItem.id, newQuantity)
                  }
                  onRemove={() => handleRemoveItem(cartItem.service.name)}
                  key={cartItem.id}
                  inCart
                  isLoading={isLoading}
                />
              );
            })}

            {/* Fallback to local cartItems if cartData is empty but cartItems has data */}
            {cartData.length === 0 && cartItems.map((service, idx) => {
              const selectedServicesxxx: ServiceData = {
                image: service.image ? "Image Added" : "No Image",
                isMakingNoise:
                  service.isMakingNoise !== null
                    ? service.isMakingNoise === "No"
                      ? "No Noise"
                      : "Making Noise"
                    : null,
                mainType: service.mainType,
                subType: service.subType,
                notes: service.notes ? "Note Added" : "No Notes",
              };

              const selectedServices = getServiceTags(selectedServicesxxx);

              return (
                <OrderCardComponent
                  itemPrice={service.price}
                  itemQuantity={service.quantity}
                  serviceName={service.name}
                  selectedServices={selectedServices}
                  setItemQuantity={() => {}}
                  onRemove={() => handleRemoveItem(service.name)}
                  key={idx}
                  inCart
                />
              );
            })}
          </ScrollView>

          {/* Total and Checkout Section */}
          <View style={{ 
            padding: 16, 
            backgroundColor: '#fff', 
            borderTopWidth: 1, 
            borderTopColor: '#e9ecef',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}>
            {/* Price Breakdown */}
            <View style={{ marginBottom: 16 }}>
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                marginBottom: 8 
              }}>
                <Text style={{ fontSize: 16, color: '#666' }}>
                  Subtotal ({totalItems} items)
                </Text>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>
                  ₹{totalPrice}
                </Text>
              </View>
              
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                paddingTop: 8,
                borderTopWidth: 1,
                borderTopColor: '#e9ecef'
              }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>
                  Total
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#0066cc' }}>
                  ₹{totalPrice}
                </Text>
              </View>
            </View>

            <BookNowButton
              text={`Pay ₹${totalPrice}`}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 12,
                marginTop: 0,
                paddingVertical: 0,
              }}
              textStyle={{
                fontSize: 18,
                fontWeight: '600',
              }}
              onPress={() => {
                // Handle payment/checkout
                console.log('Proceed to payment with total:', totalPrice);
              }}
              disabled={isLoading}
            />
          </View>
        </>
      )}
    </View>
  );
}

// Alternative version if you want to use hooks for userId and zipcode
export function CartScreenWithHooks() {
  // You can use your existing user context or auth context here
  const userId = "66f8ac7b15cd72a1a4e51a6a"; // Get from your user context
  const zipcode = "140802"; // Get from your location context
  
  return <CartScreen userId={userId} zipcode={zipcode} />;
}