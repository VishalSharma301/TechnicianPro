import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookNowButton from "../../ui/BookNowButton";

interface ServiceCardProps {
  id: string|number;
  title: string|number;
  rating: string|number;
  description: string;
  price: number;
  originalPrice: number;
  image: any;
  onPressBook: () => void ;
  onPressDetail?: () => void;
  bgcolor : string
}

const CARD_WIDTH = Dimensions.get("window").width - 40;

export default function ServiceCard({
  id,
  title,
  rating,
  description,
  price,
  originalPrice,
  image,
  onPressBook,
  onPressDetail,
  bgcolor
}:ServiceCardProps){
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.card}>
      {/* Rating and Heart */}
      <View style={styles.topRow}>
       
      </View>

      {/* Content Row */}
      <View style={{width : '45%',  borderRadius : 15, justifyContent : 'center', backgroundColor : bgcolor }}>
         <View style={styles.ratingBox}>
          <Ionicons name="star" size={14} color="#facc15" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <TouchableOpacity onPress={() => setLiked(!liked)} style={styles.heartBtn}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={18} color={liked ? "red" : "#ccc"} />
        </TouchableOpacity>
        <Image source={image} style={styles.image} resizeMode="contain" />

      </View>
        <View style={{ flex: 1, marginLeft: 10 , }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>{description}</Text>
          <TouchableOpacity onPress={onPressDetail}>
            <Text style={styles.detailLink}>View Detail &gt;</Text>
          </TouchableOpacity>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{price}</Text>
            <Text style={styles.strikePrice}>₹{originalPrice}</Text>
          </View>

         <BookNowButton onPress={onPressBook} style={{height : 27, width : '50%', borderRadius : 5, padding : 4, marginTop : 12}}/>
        </View>
      </View>
 
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 9,
    paddingHorizontal : 9,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginVertical: 10,
    alignSelf: "center",
    // height : 156,
    flexDirection : 'row'
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    position : 'absolute',
    top : 0,
    left : 5
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  heartBtn: {
   height: 35.45,
    width: 35.45,
    alignItems: "center",

    position: "absolute",
    right:-2,
    backgroundColor: "#F9FBF8",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    top: -5,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth : 1
  },
  image: {
    // width: 80,
    // height: 80,
    borderRadius: 8,
    alignSelf : 'center',
    
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: 12,
    fontWeight : '500',
    color: "#888",
    // marginVertical: 2,
  },
  detailLink: {
    fontSize: 10,
    color: "#153B93",
    fontWeight: "600",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth : 1
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#515151",
  },
  strikePrice: {
    fontSize: 10,
    fontWeight : '700',
    textDecorationLine: "line-through",
    color: "#00000080",
    marginLeft: 8,
  },

});
