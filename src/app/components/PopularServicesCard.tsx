import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BookNowButton from "../../ui/BookNowButton";
import { useState } from "react";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import { useNavigation } from "@react-navigation/native";
import { ServiceData } from "../../constants/types";
import { iconMap } from "../../util/iconMap";
import { Ionicons } from "@expo/vector-icons";

interface PopularServicesCardProps {
  service: ServiceData;
}

function PopularServicesCard( {service} : PopularServicesCardProps) {
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation<any>()
  return (
    <View style={styles.serviceCard}>
      <View style={[styles.cardImage, { backgroundColor: service.color || "#658CB226" }]}>
        <Image
          source={iconMap[service.icon]}
          style={{
            alignSelf: "center",
            justifyContent: "center",
            height: verticalScale(85),
            width: scale(93),
            resizeMode : 'contain'
          }}
        />
      </View>
      <View style={styles.ratingRow}>
        <Ionicons name="star" color="gold" size={14} />
        <Text style={{ marginLeft: scale(4) }}>{service.rating || 4.5}</Text>
      </View>

      <View style={styles.favourite}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={verticalScale(24)}
            color={liked ? "red" : "#ccc"}
          />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.serviceTitle}>{service.name}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.priceText}>₹{service.basePrice} </Text>
        <Text style={styles.strikePrice}>₹{service.basePrice}</Text>
      </View>

      <BookNowButton
        onPress={()=>{navigation.navigate("SelectServiceScreen",{service: service})}}
        style={{
          height: verticalScale(35),
          width: "100%",
          marginTop: verticalScale(14),
          borderRadius: 10,
          backgroundColor: "#234CAD",
        }}
      />
    </View>
  );
}

export default PopularServicesCard;

const styles = StyleSheet.create({
  serviceCard: {
    width: scale(171),
    height: verticalScale(257),
    backgroundColor: "#fff",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(9),
    borderRadius: 15,
    marginVertical: verticalScale(11),
    elevation: 2,
  },
  cardImage: {
    height: verticalScale(139),
    width: scale(156),
    // aspectRatio : 156/139,
    // backgroundColor: "#658CB226",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(14),
    position: "absolute",
    marginLeft: scale(18),
  },
  favourite: {
    height: verticalScale(35.45),
    width: verticalScale(35.45),
    alignItems: "center",

    position: "absolute",
    right: scale(3),
    backgroundColor: "#F9FBF8",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    top: verticalScale(3),
  },
  serviceTitle: {
    fontWeight: "500",
    marginTop: verticalScale(5),
    color: "#515151",
    fontSize: moderateScale(14),
  },
  priceText: {
    color: "#000",
    marginTop: verticalScale(1),
    fontSize: moderateScale(15),
    fontWeight: "600",
  },
  strikePrice: {
    textDecorationLine: "line-through",
    color: "#00000080",
    fontWeight: "700",
    fontSize: moderateScale(10),
    // marginLeft: 150,
  },
});
