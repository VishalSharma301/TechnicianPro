import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import BookNowButton from "../../ui/BookNowButton";
import { useState } from "react";
import { popularServiceProps } from "../../util/popularServices";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import { useNavigation } from "@react-navigation/native";

function PopularServicesCard({ service }: popularServiceProps) {
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation<any>()
  return (
    <View style={styles.serviceCard}>
      <View style={[styles.cardImage, { backgroundColor: service.color }]}>
        <Image
          source={service.image}
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
        <Text style={{ marginLeft: scale(4) }}>{service.rating}</Text>
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
        onPress={()=>{navigation.navigate("SelectServiceScreen",{serviceName : service.name})}}
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
