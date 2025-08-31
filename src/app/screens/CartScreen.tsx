import { useContext, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { CartContext } from "../../store/CartContext";
import OrderCardComponent from "../components/OrderCardComponent";
import { ServiceData } from "../../constants/types";
import { getServiceTags } from "../../util/getServiceTags";
import BookNowButton from "../../ui/BookNowButton";

export default function CartScreen() {
  const { cartItems, isCartEmpty } = useContext(CartContext);
  return (
    <View style={{ flex: 1 }}>
      {isCartEmpty && (
        <Text style={{ fontSize: 16, fontWeight: 500, alignSelf: "center" }}>
          Your Cart Is Empty !
        </Text>
      )}
      <ScrollView>
        {cartItems.map((service, idx) => {
          const selectedServicesxxx: ServiceData = {
            image: service.image ? "Image Added" : "No Image",
            isMakingNoise:
              service.isMakingNoise !== null
                ? service.isMakingNoise == "No"
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
              key={idx}
              inCart
            />
          );
        })}
      </ScrollView>
      {!isCartEmpty && (
        <BookNowButton
          text="Pay Now"
          style={{
            width: "90%",
            alignSelf: "center",
            height: "8%",
            borderRadius: 15,
            marginTop: 10,
            paddingVertical: 0,
            marginBottom: 10,
          }}
          textStyle={{
            fontSize: 20,
            lineHeight: 22,
          }}
          onPress={() => {}}
        />
      )}
    </View>
  );
}
