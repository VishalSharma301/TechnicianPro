import { useContext, useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Alert } from "react-native";
import BookNowButton from "../../ui/BookNowButton";
import { AuthContext } from "../../store/AuthContext";
import { ProfileContext } from "../../store/ProfileContext";
// import { createUser, userLogin } from "../../util/userLogin";
import { useNavigation } from "@react-navigation/native";
import { saveProfileData } from "../../util/setAsyncStorage";

export default function EditProfileScreen() {
  const {
    firstName,
    phoneNumber,
    lastName,
    setFirstName,
    setLastName,
    email,
    setEmail,
  } = useContext(ProfileContext); // assumes user = { phoneNumber: "..." }
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  //   const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`.trim());
  }, [firstName, lastName]);

  //   useEffect(() => {
  //     if (user?.phoneNumber) {
  //       setPhoneNumber(user.phoneNumber);
  //     }
  //   }, [user]);

    const userProfileData = {
    firstName,
    lastName,
    email,
    phoneNumber
  };


  async function signIn() {
    try {
      //   const res = await createUser(phoneNumber, fullName, email);
      await saveProfileData(userProfileData)
      const res = await userLogin(phoneNumber);

      if (res) {
        setIsAuthenticated(true);
      } else {
        // Optional: show an alert if login fails without an exception
        Alert.alert("Login failed", "Something went wrong while signing in.");
      }
    } catch (err) {
      console.error("Sign in failed:", err);
      Alert.alert("Error", "Something went wrong while signing in.");
    }
  }



  // console.log(userProfileData);
  

  return (
    <View style={styles.container}>
      <Text>First Name</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <Text>Last Name</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { backgroundColor: "#eee" }]}
      />

      <Text>Phone Number</Text>
      <TextInput
        value={phoneNumber}
        editable={false}
        style={[styles.input, { backgroundColor: "#eee" }]}
      />

      <BookNowButton text="Save" onPress={signIn} />
      <BookNowButton text="Skip" onPress={() => setIsAuthenticated(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
});
