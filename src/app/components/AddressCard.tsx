import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { AddressCardType } from "../../constants/types";
import { useContext } from "react";
import { AddressContext } from "../../store/AddressContext";
import { useNavigation } from "@react-navigation/native";

export default function AddressCard({ item }: { item: AddressCardType }) {
  const { selectedAddress, setSelectedAddress } = useContext(AddressContext);
  const navigation = useNavigation()

  const addressString = `${item.address.street}, ${item.address.city},${item.address.zipcode}`;

  return (
    <View style={styles.addressCard}>
      <View style={styles.addressLeft}>
        <Icon
          name="home-outline"
          size={22}
          color="#2956A3"
          style={styles.homeIcon}
        />
        <View>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.address}>{addressString}</Text>
          <Text style={styles.phone}>{`Phone number: ${item.phone}`}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="dots-horizontal" size={20} color="#2956A3" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => {setSelectedAddress(item)
            navigation.goBack()
          }}
        >
          <Icon name="send" size={20} color="#2956A3" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  addressCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  addressLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  homeIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  label: {
    fontWeight: "700",
    color: "#2956A3",
    fontSize: 15,
  },
  address: {
    color: "#444",
    marginTop: 2,
    fontSize: 13,
  },
  phone: {
    marginTop: 2,
    fontSize: 13,
    color: "#444",
  },
  cardActions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  iconBtn: {
    marginLeft: 12,
  },

});
