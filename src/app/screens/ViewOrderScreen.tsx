import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BORDER_COLOR = "#D9D9D9";

export default function ViewOrderScreen() {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Order</Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Service Summary */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.serviceTitle}>AC Servicing</Text>
              <TouchableOpacity>
                <Text style={styles.editText}>Edit &gt;</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.counterBox}>
                <Text style={styles.counterBtn}>+</Text>
                <Text style={styles.counterBtn}>1</Text>
                <Text style={styles.counterBtn}>-</Text>
              </View>
              <Text style={styles.price}>₹30</Text>
            </View>
          </View>

          {/* Add More Items */}
          <Text style={styles.addMoreText}>+ Add More items</Text>
          <ScrollView style={styles.tagsRow} horizontal>
            <Tag label="Windows AC" />
            <Tag label="Plumber" />
            <Tag label="Eklectrecian" />
            <Tag label="adsad AC" />
            <Tag label="Plumber" />
            <Tag label="Eklectrecian" />
          </ScrollView>
        </View>

        {/* Coupon View */}
        <TouchableOpacity style={styles.couponBox}>
          <Text style={styles.couponText}>
            <MaterialIcons name="local-offer" />
            View All coupon
          </Text>
          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        {/* Delivery Info */}
        <View style={styles.deliveryCard}>
       
          <View style={{flexDirection : 'row', alignItems : 'center'}}>
          <Octicons
            name="stopwatch"
            size={14}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.deliveryTitle}>Delivery in 96 Hour</Text>
          </View>
          <Text style={styles.scheduleText}>Want this later? Schedule it</Text>
         
           <View style={{flexDirection : 'row', alignItems : 'center'}}>
          <Octicons
            name="home"
            size={14}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.deliveryTitle}>Delivery at home</Text>
          </View>
          <Text style={styles.addressText}>
            Gameland -old city, Bassi Pathana, India{"\n"}
            Phone number: +91-9041624576
          </Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btn}>
              <MaterialCommunityIcons name="dots-horizontal" size={15} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="send" size={15} color="#000" />
            </TouchableOpacity>
            </View>
         
           
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.payLabel}>Pay Using Cash</Text>
            <Text style={styles.orText}>Or</Text>
            <Text style={styles.payLabel}>Card</Text>
          </View>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => navigation.navigate("OrderHistoryScreen")}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.totalText}>₹300</Text>
              <Text style={{ fontSize: 10, fontWeight: "500", color: "#fff" }}>
                TOTAL
              </Text>
            </View>
            <Text style={styles.placeOrderText}>Place Order &gt;</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF3FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    height: "35%",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 30,
    marginTop: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    flex : 1
  },
  tag: {
    backgroundColor: "#E8EFE6",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    // width: 100,
    height: 38,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B7C8B6",
    elevation: 3,
  },
  tagText: {
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
  },
  couponBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 20,
    marginTop: "3%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  couponText: {
    fontSize: 12,
    color: "#00000080",
    fontWeight: "500",
  },
  deliveryCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginTop: "3%",
    height: "32%",
    // paddingBottom : 29,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  deliveryTitle: {
    fontWeight: "500",
    fontSize: 12,
    
  },
  scheduleText: {
    fontSize: 12,
      fontWeight: "500",
    color: "#000000B2",
    marginTop : 3,
    marginLeft : 22,
    borderBottomWidth : 1,
    borderStyle : 'dashed',
    paddingBottom : 10,
    marginRight: 100,
    marginBottom : 15
  
  },
  separator: {
    height: 1,
    // backgroundColor: "#ccc",
    marginTop: 8,
    marginBottom : 15,
    borderWidth : 0.5,
    borderStyle : 'dashed',
      marginLeft : 22,
      marginRight : '35%'
  },
  addressText: {
  fontSize: 12,
      fontWeight: "500",
    color: "#000000B2",
    marginTop: 4,
    marginLeft : 22
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    marginLeft : 22,
      borderBottomWidth : 1,
    borderStyle : 'dashed',
    paddingBottom : 7,
    // marginRight: 100,
  },
  btn : {
    height : 24,
    width : 24,
    backgroundColor : '#7494CE1A',
    borderWidth : 1,
    borderColor : '#576F9B47',
    borderRadius : 5,
    alignItems : 'center',
    justifyContent : 'center',
    
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: "3%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  payLabel: {
    fontSize: 12,
    color: "#000",
  },
  orText: {
    fontSize: 10,
    color: "#999",
  },
  orderButton: {
    backgroundColor: "#153B93",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    gap: "5%",
  },
  totalText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  placeOrderText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
