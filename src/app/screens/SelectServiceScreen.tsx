import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ServiceDetailContext } from "../../store/ServiceTypeContext";
import { moderateScale, scale, verticalScale } from "../../util/scaling";
import { Asset } from "react-native-image-picker";
import ACServiceCard from "../components/AcServiceCard";
import { CartContext } from "../../store/CartContext";

// const AC_TYPES = ["Windows AC", "Plumber", "Eklecrecian", "Windows AC", "Windows AC", "Windows AC", "Windows AC", "Windows AC"];
const AC_TYPES = ["Windows AC", "Plumber", "Eklecrecian"];

const OPTION_COLOR = "#F1F6F0";
const OPTION_BORDER_COLOR = "#B7C8B6";

export default function SelectServiceScreen() {
  const [selectedMainType, setSelectedMainType] = useState("Split AC");
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [isMakingNoise, setIsMakingNoise] = useState<boolean | null>(null);
  const [image, setImage] = useState<Asset | null>(null);
  const [notes, setNotes] = useState("");
  const navigation = useNavigation<any>();
  const { setServiceDetails} = useContext(ServiceDetailContext);
  const route = useRoute<any>().params;
  const service = useRoute<any>().params.service;
  const serviceName = route.service.name;
    const screenName : string  = serviceName.trim().split(" ")[0]
    const {cartItems} = useContext(CartContext)

  useEffect(() => {
   console.log(screenName);
    
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = {uri : result.assets[0].uri, 
        type : result.assets[0].type,
        name : result.assets[0].fileName || "image.jpg"
      };
      setImage(selectedImage);
      setServiceDetails((prev) => ({
        ...prev,
        image: selectedImage,
      }));
    }
  };

  return (
    <ScrollView style={{
      backgroundColor : '#f2eeeeff',
      padding : scale(20),
    }}>
      <View style={{
        flex : 1,
        alignItems : 'center',
        // marginTop : 50,
        height : verticalScale(700),
        backgroundColor : '#fff',
        elevation : 4
      }}>

      <ACServiceCard service={service}/>
      </View>
      {/* <LinearGradient colors={["#F2F2F2", "#FFFFFF"]} style={styles.container}>
        <Text style={styles.header}>Select Your {screenName} Type</Text>

        <View style={styles.card}>
          <Text style={styles.subHeader}>Select Your AC Type</Text>
          <View style={styles.row}>
            {["Split AC", "Windows AC"].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => {
                  setSelectedMainType(type);
                  setServiceDetails((prev) => ({ ...prev, mainType: type }));
                }}
                style={[
                  styles.optionButton,
                  selectedMainType === type && styles.selectedButton,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedMainType === type && styles.selectedText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subHeader}>Select Your AC Type</Text>
          <View style={styles.grid}>
            {AC_TYPES.map((type, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  setSelectedSubType(type),
                    setServiceDetails((prev) => ({ ...prev, subType: type }));
                }}
                style={[
                  styles.optionButtonSmall,
                  selectedSubType === type && styles.selectedButton,
                ]}
              >
                <Text
                  style={[
                    styles.smallOptionText,
                    selectedSubType === type && styles.selectedText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subHeader}>Is AC making noise</Text>
          <View style={styles.row}>
            {["Yes", "No"].map((answer) => (
              <TouchableOpacity
                key={answer}
                onPress={() => {
                  setIsMakingNoise(answer === "Yes");
                  setServiceDetails((prev) => ({ ...prev, isMakingNoise: answer }));
                }}
                style={[
                  styles.optionButton,
                  isMakingNoise === (answer === "Yes") && styles.selectedButton,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    isMakingNoise === (answer === "Yes") && styles.selectedText,
                  ]}
                >
                  {answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subHeader}>Upload Your Images</Text>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Text style={styles.uploadText}>📎 upload Photo</Text>
          </TouchableOpacity>
          {image && (
            <Image source={{ uri: image.uri }} style={styles.previewImage} />
          )}

          <Text style={styles.subHeader}>Additional Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Description"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={(text) => {
              setNotes(text);
              setServiceDetails((prev) => ({ ...prev, notes: text }));
            }}
          />

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() =>
              navigation.navigate("ViewOrderScreen", { service })
            }
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient> */}
      {cartItems.length > 0 && (
              <View style={styles.cartBar}>
                <Text style={styles.cartText}>
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
                  cart
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
                  <Text style={styles.viewCartText}>View Cart</Text>
                </TouchableOpacity>
              </View>
            )}
    </ScrollView>
  );
}

 const shadowStyle = {
  shadowColor: '#ADADAD',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.09,   // approx '17' in hex
  shadowRadius: 5,  
  elevation: 5, // Android

};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingBottom: 32,
    paddingTop: verticalScale(15),
    // backgroundColor: "red",
  },
  header: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: verticalScale(8),
    marginLeft: scale(3),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: scale(15),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
    paddingBottom : verticalScale(31)
  },
  subHeader: {
    fontSize: moderateScale(15),
    fontWeight: "700",
    marginTop: verticalScale(24),
    marginBottom: verticalScale(12),
    // borderWidth : 1
  },
  row: {
    flexDirection: "row",
    gap: scale(10),
    marginBottom: 8,
    // borderWidth : 1
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
    // borderWidth : 1
  },
  optionButton: {
    // flex: 1,
    width: scale(100),
    // aspectRatio: 100 / 41,
    // height: 41,
    // width : 100,
    paddingVertical: verticalScale(11),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: OPTION_BORDER_COLOR,
    backgroundColor: OPTION_COLOR,
    alignItems: "center",
    ...shadowStyle,
    
  },
  optionButtonSmall: {
    width: scale(99),
    // aspectRatio: 100 / 41,
    // height: 41,
    paddingVertical: verticalScale(12),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: OPTION_BORDER_COLOR,
    backgroundColor: OPTION_COLOR,
    alignItems: "center",
    justifyContent: "center",
     ...shadowStyle,
  },
  selectedButton: {
    backgroundColor: "#FFEDBD",
    borderColor: "#FBD163",
  },
  optionText: {
    fontSize: moderateScale(14),
    color: "#333",
    fontWeight: "500",
  },
  smallOptionText: {
    fontSize: moderateScale(12),
    color: "#333",
    fontWeight: "500",
  },
  selectedText: {
    fontWeight: "900",
    color: "#000",
  },
  uploadBtn: {
    backgroundColor: OPTION_COLOR,
    borderColor: OPTION_BORDER_COLOR,
    borderWidth: 1,
    paddingVertical: verticalScale(9),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(12),
    width: scale(151),
    // aspectRatio: 151 / 37,
    paddingLeft: scale(16),
    paddingRight: scale(18),
    // alignSelf: "flex-start",
     ...shadowStyle,
  },
  uploadText: {
    color: "#333",
    fontWeight: "500",
    fontSize: moderateScale(14),
  },
  previewImage: {
    height: 100,
    width: 100,
    marginVertical: 10,
    borderRadius: 8,
  },
  notesInput: {
    backgroundColor: OPTION_COLOR,
    borderColor: OPTION_BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 8,
    padding: scale(10),
    height: verticalScale(109),
    width: scale(303),
    textAlignVertical: "top",
    marginBottom: verticalScale(16),
     ...shadowStyle,
  },
  continueBtn: {
    backgroundColor: "#153B93",
    padding: verticalScale(10),
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
    width: scale(156),
    aspectRatio: 156 / 45,
    justifyContent: "center",
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: moderateScale(16),
  },
  cartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#795FDA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 10, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  viewCartText: {
    color: "gold",
    fontSize: 16,
    fontWeight: "700",
  },
});
