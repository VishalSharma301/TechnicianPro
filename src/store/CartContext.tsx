import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { ItemData, ServiceData } from "../constants/types";
import { Alert } from "react-native";
import {
  addToCart as addToCartAPI,
  getCart as getCartAPI,
  removeCartItem as removeCartItemAPI,
  clearCart as clearCartAPI,
  updateCartItemQuantity as updateCartItemQuantityAPI,
  handleCartApiError,
  CartItem,
  AddToCartPayload,
} from "../util/cartApis";

interface CartContextProps {
  cartItems: ServiceData[];
  cartData: CartItem[];
  totalPrice: number;
  totalItems: number;
  isLoading: boolean;
  addToCart: (
    item: ServiceData,
    userId: string,
    zipcode: string,
    quantity: number
  ) => Promise<void>;
  isItemInTheCart: (currentItemName: string) => boolean;
  removeFromCart: (itemName: string, userId: string) => Promise<void>;
  emptyCart: (userId: string) => void;
  updateItemQuantity: (
    itemId: string,
    quantity: number,
    userId: string
  ) => Promise<void>;
  fetchCart: (userId: string) => Promise<void>;
  isCartEmpty: boolean;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  cartData: [],
  totalPrice: 0,
  totalItems: 0,
  isLoading: false,
  addToCart: async () => {},
  isItemInTheCart: () => false,
  removeFromCart: async () => {},
  emptyCart: () => {},
  updateItemQuantity: async () => {},
  fetchCart: async () => {},
  isCartEmpty: true,
});

export default function CartContextProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<ServiceData[]>([]);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isCartEmpty = cartItems.length === 0 && cartData.length === 0;

  // Fetch cart data from API
  async function fetchCart(userId: string) {
    try {
      setIsLoading(true);
      const response = await getCartAPI(userId);

      if (response.success && response.data) {
        setCartData(response.data.items);
        setTotalPrice(response.data.totalPrice);
        setTotalItems(response.data.totalItems);

        // Convert API cart items to local ItemData format for backward compatibility
        const localCartItems: ItemData[] = response.data.items.map(
          (item: CartItem) => ({
            name: item.service.name,
            price: item.itemTotal,
            quantity: item.quantity,
            image: item.service.icon,
            mainType: "", // You may need to map these from your service data
            subType: "",
            isMakingNoise: null,
            notes: "",
          })
        );

        setCartItems(localCartItems);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      Alert.alert("Error", handleCartApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  function emptyCart(userId: string) {
    Alert.alert("Empty Cart", "Do you wish to empty your cart?", [
      {
        text: "OK",
        style: "destructive",
        onPress: async () => {
          try {
            setIsLoading(true);
            const response = await clearCartAPI(userId);

            if (response.success) {
              setCartItems([]);
              setCartData([]);
              setTotalPrice(0);
              setTotalItems(0);
              Alert.alert("Success", "Cart cleared successfully");
            }
          } catch (error) {
            console.error("Error clearing cart:", error);
            Alert.alert("Error", handleCartApiError(error));
          } finally {
            setIsLoading(false);
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  async function addToCart(
    item: ServiceData,
    userId: string,
    zipcode: string,
    quantity: number
  ) {
    try {
      setIsLoading(true);

      const payload: AddToCartPayload = {
        userId: userId,
        serviceId: item._id || "", // You'll need to add serviceId to ItemData type
        zipcode: zipcode,
        quantity: quantity,
        // Add other optional fields based on your item data
        // selectedOption: item.selectedOption,
        // selectedSubServices: item.selectedSubServices,
        // selectedBrand: item.selectedBrand
      };

      const response = await addToCartAPI(payload);

      if (response.success) {
        // Update local state
        setCartItems((prev) => [...prev, item]);

        // Refresh cart data from server
        await fetchCart(userId);

        Alert.alert("Success", "Item added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", handleCartApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromCart(itemName: string, userId: string) {
    try {
      setIsLoading(true);

      // Find the cart item by name
      const cartItem = cartData.find((item) => item.service.name === itemName);

      if (cartItem) {
        const response = await removeCartItemAPI(userId, cartItem.id);

        if (response.success) {
          // Update local state
          setCartItems((prev) => prev.filter((item) => item.name !== itemName));

          // Refresh cart data from server
          await fetchCart(userId);

          Alert.alert("Success", "Item removed from cart");
        }
      } else {
        Alert.alert("Error", "Item not found in cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      Alert.alert("Error", handleCartApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function updateItemQuantity(
    itemId: string,
    quantity: number,
    userId: string
  ) {
    try {
      setIsLoading(true);

      const response = await updateCartItemQuantityAPI(userId, itemId, {
        quantity,
      });

      if (response.success) {
        // Refresh cart data from server
        await fetchCart(userId);

        Alert.alert("Success", "Quantity updated successfully");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      Alert.alert("Error", handleCartApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  function isItemInTheCart(currentItemName: string) {
    const isItemInCart = cartItems.some(
      (item) => item.name === currentItemName
    );
    return isItemInCart;
  }

  const value = {
    cartItems,
    cartData,
    totalPrice,
    totalItems,
    isLoading,
    addToCart,
    isItemInTheCart,
    removeFromCart,
    emptyCart,
    updateItemQuantity,
    fetchCart,
    isCartEmpty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
