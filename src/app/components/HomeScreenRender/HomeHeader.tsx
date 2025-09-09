import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProfileContext } from "../../../store/ProfileContext";
import { AddressContext } from "../../../store/AddressContext";
import { moderateScale, scale, verticalScale } from "../../../util/scaling";
import { useNavigation } from "@react-navigation/native";

export default function HomeHeader() {
  const navigation = useNavigation<any>();
  const { picture, firstName, lastName } = useContext(ProfileContext);
  const { selectedAddress } = useContext(AddressContext);

  return (
    <View>
      <View style={styles.headerTop}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="location-outline" size={moderateScale(18)} color="#000" />
          <TouchableOpacity onPress={() => navigation.navigate("AddressScreen")}>
            <Text style={styles.locationText}>
              {selectedAddress.label || "Allow Location"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.welcomeContainer}
          onPress={() => navigation.navigate("ProfileStack")}
        >
          <Image source={{ uri: picture }} style={styles.avatar} />
          <View>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.username}>{firstName} {lastName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationsScreen")}
            style={{ flex: 1 }}
          >
            <Ionicons
              name="notifications-outline"
              size={verticalScale(24)}
              style={{
                backgroundColor: "#fff",
                height: verticalScale(44),
                width: verticalScale(44),
                borderRadius: 30,
                marginLeft: "auto",
                textAlign: "center",
                textAlignVertical: "center",
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTop: { flexDirection: "column" },
  locationText: { fontWeight: "bold", marginLeft: scale(5), fontSize: moderateScale(14) },
  welcomeContainer: { flexDirection: "row", alignItems: "center", marginTop: verticalScale(16), height: verticalScale(44) },
  avatar: { width: verticalScale(44), height: verticalScale(44), borderRadius: 33, marginRight: scale(10), borderWidth: moderateScale(1.5), borderColor: "white", resizeMode: "contain" },
  welcomeText: { fontSize: moderateScale(14), fontWeight: "400", color: "#000" },
  username: { fontSize: moderateScale(15), fontWeight: "600", color: "#000" },
});
