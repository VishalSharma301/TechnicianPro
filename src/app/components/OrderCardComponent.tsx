import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PressableIcon from "./PressableIcon";
import { useContext } from "react";
import { CartContext } from "../../store/CartContext";

interface OrderCardProps {
  serviceName: string;
  itemQuantity: number;
  setItemQuantity: (quantity: number) => void;
  selectedServices: (string | null)[];
  itemPrice: number;
  inCart: boolean;
  onRemove : ()=>void
}

const BORDER_COLOR = "#D9D9D9";

export default function OrderCardComponent({
  itemPrice,
  itemQuantity,
  selectedServices,
  serviceName,
  setItemQuantity,
  inCart,
  onRemove
}: OrderCardProps) {
  const navigation = useNavigation();
  const { removeFromCart, cartItems } = useContext(CartContext);

  // function removeFromCartAlert() {
  //   Alert.alert(
  //     "Remove from Cart",
  //     "Do you want to remove the item from the cart?",
  //     [
  //       {
  //         text: "Ok",
  //         onPress: () => {
  //           removeFromCart(serviceName);
  //           console.log("removed", cartItems);
  //         },
  //         style: "default",
  //       },
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("cancelled"),
  //         style: "cancel",
  //       },
  //     ]
  //   );
  // }

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        {inCart && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              zIndex: 1,
              borderColor: "#dadadaff",
              width: "20%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../../assets/ac.png")}
              style={{ resizeMode: "contain", height: 50, width: 50 }}
            />
          </View>
        )}
        <View>
          <Text style={styles.serviceTitle}> {serviceName}</Text>
          {!inCart && (
            <TouchableOpacity>
              <Text style={styles.editText}>Edit &gt;</Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          {inCart && (
            <View
              style={[
                styles.counterBox,
                {
                  backgroundColor: "#E8EFE6",
                  borderWidth: 1,
                  borderColor: "#B7C8B6",
                  elevation: 3,
                },
              ]}
            >
              <Text style={[styles.counterBtn, { color: "black" }]}>
                {itemQuantity} Items
              </Text>
            </View>
          )}
          {!inCart && (
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
          <Text style={styles.price}>
            ₹{!inCart ? itemPrice : itemPrice * itemQuantity}
          </Text>
        </View>
      </View>

      {/* Add More Items */}
      {!inCart && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.addMoreText}>+ Add More items</Text>
        </TouchableOpacity>
      )}

      <ScrollView style={styles.tagsRow} horizontal>
        {selectedServices.map((sevice, index) => (
          <Tag key={index} label={sevice} />
        ))}
      </ScrollView>

      {inCart && (
        <PressableIcon
          name="trash-bin"
          height={20}
          containerStyle={{
            backgroundColor: "transparent",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            margin: 0,
            position: "absolute",
            right: 0,
            bottom: 10,
          }}
          color="black"
          onPress={onRemove}
        />
      )}
    </View>
  );
}

function Tag({ label }: { label: any }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#E8EFE6",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    minWidth: 80,
    height: 38,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B7C8B6",
    elevation: 3,
    marginBottom: 20,
  },
  tagText: {
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
  },
  card: {
    // height: "33%",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 30,
    // paddingBottom : 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth : 1
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#153B93",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    // height : '100%'
  },
  counterBtn: {
    color: "#fff",
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  editText: {
    color: "black",
    marginTop: 5,
    fontSize: 12,
    fontWeight: "500",
  },
  price: {
    textAlign: "right",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 7,
    marginRight: 5,
  },
  addMoreText: {
    marginTop: 25,
    // marginLeft: 16,
    fontWeight: "600",
    fontSize: 14,
  },
  tagsRow: {
    // flexDirection: "row",
    // marginHorizontal: 16,
    marginTop: 10,
    gap: 8,
    // borderWidth: 1,
    marginRight: 30,
    // flex: 1,
  },
});
