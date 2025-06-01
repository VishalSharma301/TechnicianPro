import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// const AC_TYPES = ["Windows AC", "Plumber", "Eklecrecian", "Windows AC", "Windows AC", "Windows AC", "Windows AC", "Windows AC"];
const AC_TYPES = ["Windows AC", "Plumber", "Eklecrecian"];


const OPTION_COLOR = '#F1F6F0'
const OPTION_BORDER_COLOR = '#B7C8B6'

export default function SelectServiceScreen() {
  const [selectedMainType, setSelectedMainType] = useState("Split AC");
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [isMakingNoise, setIsMakingNoise] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const navigation = useNavigation<any>()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView >
      <LinearGradient colors={['#F2F2F2', '#FFFFFF']} style={styles.container}> 
      <Text style={styles.header}>Select Your AC Type</Text>

      <View style={styles.card}>
        <Text style={styles.subHeader}>Select Your AC Type</Text>
        <View style={styles.row}>
          {['Split AC', 'Windows AC'].map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => setSelectedMainType(type)}
              style={[styles.optionButton, selectedMainType === type && styles.selectedButton]}
            >
              <Text style={[styles.optionText, selectedMainType === type && styles.selectedText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subHeader}>Select Your AC Type</Text>
        <View style={styles.grid}>
          {AC_TYPES.map((type, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedSubType(type)}
              style={[styles.optionButtonSmall, selectedSubType === type && styles.selectedButton]}
            >
              <Text style={[styles.smallOptionText, selectedSubType === type && styles.selectedText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subHeader}>Is AC making noise</Text>
        <View style={styles.row}>
          {['Yes', 'No'].map(answer => (
            <TouchableOpacity
              key={answer}
              onPress={() => setIsMakingNoise(answer === 'Yes')}
              style={[styles.optionButton, (isMakingNoise === (answer === 'Yes')) && styles.selectedButton]}
            >
              <Text style={[styles.optionText, (isMakingNoise === (answer === 'Yes')) && styles.selectedText]}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subHeader}>Upload Your Images</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
          <Text style={styles.uploadText}>📎 upload Photo</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}

        <Text style={styles.subHeader}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />

        <TouchableOpacity style={styles.continueBtn} onPress={()=> navigation.navigate('ViewOrderScreen')}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 32,
    // backgroundColor: "red",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    marginLeft : 3
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  subHeader: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionButton: {
    // flex: 1,
    width : '35%',
     height : 41,
    // width : 100,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: OPTION_BORDER_COLOR,
    backgroundColor: OPTION_COLOR,
    alignItems: "center",
  },
  optionButtonSmall: {
    width: '30.6%',
    height : 41,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: OPTION_BORDER_COLOR,
    backgroundColor: OPTION_COLOR,
    alignItems: "center",
    justifyContent : 'center'
  },
  selectedButton: {
    backgroundColor: "#FFEDBD",
    borderColor: "#FBD163",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
    fontWeight : '500'
  },
  smallOptionText: {
    fontSize: 12,
    color: "#333",
    fontWeight : '500'
  },
  selectedText: {
    fontWeight: "900",
    color: "#000",
  },
  uploadBtn: {
    backgroundColor: OPTION_COLOR,
      borderColor: OPTION_BORDER_COLOR,
      borderWidth : 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: "center",
    justifyContent : 'center',
    marginBottom: 12,
    // width : '40%',
    paddingHorizontal : 19,
    alignSelf : 'flex-start'
  },
  uploadText: {
    color: "#333",
    fontWeight : '500',
    fontSize : 14,
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
      borderWidth : 1,
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 16,
    marginRight : 32
  },
  continueBtn: {
    backgroundColor: "#153B93",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    alignSelf : 'flex-start',
    width : '50%'
  },
  continueText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
