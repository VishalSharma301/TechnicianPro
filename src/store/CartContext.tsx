import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { CartItemData } from "../constants/types";
import { Alert } from "react-native";

interface CartContextProps {
  cartItems: CartItemData[];
  addToCart: (item: CartItemData) => void;
  isItemInTheCart: (currentItemName: string) => boolean;
  removeFromCart : (itemName : string)=>void;
  emptyCart : ()=>void
  isCartEmpty : boolean
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  isItemInTheCart: () => false,
  removeFromCart : () => {},
  emptyCart : ()=>{},
  isCartEmpty : true
});

export default function CartContextProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);

  const isCartEmpty = cartItems.length == 0

  function emptyCart(){
    Alert.alert("Empty Cart", "Do you wish to empty your cart ?",[
      {text : 'OK', style : 'destructive', onPress: ()=>setCartItems([])},
      {text : "Cancel", style : 'cancel'}
    ])
  }

  function addToCart(item: CartItemData) {
    setCartItems((prev) => [...prev, item]);
  }

  

  function removeFromCart(itemName: string) {
    setCartItems((prev) => prev.filter((item) => item.name !== itemName));
  }

  function isItemInTheCart(currentItemName: string) {
    const isItemInCart = cartItems.some(
      (item) => item.name === currentItemName
    );

    return isItemInCart;
  }

  const value = { cartItems, addToCart, isItemInTheCart,removeFromCart, emptyCart, isCartEmpty };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
