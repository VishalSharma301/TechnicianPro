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

const AC_TYPES = ["Windows AC", "Plumber", "Eklecrecian", "Windows AC", "Windows AC", "Windows AC", "Windows AC", "Windows AC"];

export default function SelectServiceScreen() {
  const [selectedMainType, setSelectedMainType] = useState("Split AC");
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [isMakingNoise, setIsMakingNoise] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

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
    <ScrollView contentContainerStyle={styles.container}>
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
              <Text style={[styles.optionText, selectedSubType === type && styles.selectedText]}>{type}</Text>
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

        <TouchableOpacity style={styles.continueBtn}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
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
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f5f1",
    alignItems: "center",
  },
  optionButtonSmall: {
    width: '31%',
    height : 45,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f5f1",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#FFE6B4",
    borderColor: "#FFBD2F",
  },
  optionText: {
    fontSize: 12,
    color: "#333",
    fontWeight : '500'
  },
  selectedText: {
    fontWeight: "900",
    color: "#000",
  },
  uploadBtn: {
    backgroundColor: "#EAF3EC",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  uploadText: {
    color: "#333",
    fontWeight : '700'
  },
  previewImage: {
    height: 100,
    width: 100,
    marginVertical: 10,
    borderRadius: 8,
  },
  notesInput: {
    backgroundColor: "#F4F8F5",
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  continueBtn: {
    backgroundColor: "#002DE3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
