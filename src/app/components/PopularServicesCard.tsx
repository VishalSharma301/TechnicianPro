import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import BookNowButton from "../../ui/BookNowButton";
import { useState } from "react";
import { popularServiceProps } from "../../util/popularServices";

function PopularServicesCard({service}: popularServiceProps) {
      const [liked, setLiked] = useState(false);
  return (
    <View  style={styles.serviceCard}>
                  <View
                    style={[styles.cardImage, { backgroundColor: service.color }]}
                  >
                    <Image
                      source={service.image}
                      style={{ alignSelf: "center", justifyContent: "center" }}
                    />
                  </View>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" color="gold" size={14} />
                    <Text style={{ marginLeft: 4 }}>{service.rating}</Text>
                  </View>
    
                  <View style={styles.favourite}>
                    <TouchableOpacity onPress={() => setLiked(!liked)} >
                              <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color={liked ? "red" : "#ccc"} />
                            </TouchableOpacity>
                  </View>
                  <Text style={styles.serviceTitle}>{service.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.priceText}>₹{service.discountPrice} </Text>
                    <Text style={styles.strikePrice}>₹{service.mrp}</Text>
                  </View>
    
                  <BookNowButton
                    onPress={service.onPress}
                    style={{
                      height: 35,
                      width: "100%",
                      marginTop: 14,
                      borderRadius: 10,
                      backgroundColor: "#234CAD",
                    }}
                  />
                </View>
  );
};

export default PopularServicesCard;

const styles = StyleSheet.create({
  
    serviceCard: {
    width: "44%",
    height: 257,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 15,
    marginVertical: 11,
    elevation: 2,
  },
  cardImage: {
    height: 139,
    width: "100%",
    // backgroundColor: "#658CB226",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    position: "absolute",
    marginLeft: 18,
  },
  favourite: {
    height: 35.45,
    width: 35.45,
    alignItems: "center",

    position: "absolute",
    right: 3,
    backgroundColor: "#F9FBF8",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    top: 3,
  },
  serviceTitle: {
    fontWeight: "500",
    marginTop: 5,
    color: "#515151",
    fontSize: 14,
  },
  priceText: {
    color: "#000",
    marginTop: 1,
    fontSize: 15,
    fontWeight: "600",
  },
  strikePrice: {
    textDecorationLine: "line-through",
    color: "#00000080",
    fontWeight: "700",
    fontSize: 10,
    // marginLeft: 150,
  },
  
  
});
