import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useWindowDimensions,
  Dimensions,
} from "react-native";
// import OrangeButton from "../../ui/OrangeButton";
// import { AuthContext } from "../../store/AuthContext";
// import {} from "../../../util/location";
// import AuthenticatePhoneNumber from "../../../util/localAPIs";
// import { LocalAuthContext } from "../../store/LocalAuthContext";
// import { ProfileContext } from "../../store/ProfileContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import BookNowButton from "../../../ui/BookNowButton";
import { AuthContext } from "../../../store/AuthContext";
import { useNavigation } from "@react-navigation/native";
// import storeUserProfileData from "../../../util/userData";
// import phoneAuthentication, { verifyOtp } from "../../../util/authentication";

export default function AuthScreen() {
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("");
  const [phNumber, setPhNumber] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  // const {confirm,confirmOtp,signInWithPhoneNumber,signOut,user} =useContext(AuthContext)
  //   const { setToken, token } = useContext(LocalAuthContext);
  //   const {
  //     setPhoneNumber,
  //     setFirstName,
  //     setLastName,
  //     setIsNewUser,
  //     setEmail,
  //     setIsProfileCompleted,
  //   } = useContext(ProfileContext);

  const SCREEN_WIDTH = Dimensions.get("screen").width;
  const SCREEN_HEIGHT = Dimensions.get("screen").height;

  useEffect(() => {
    setPhNumber(`${countryCode}${phoneNumberInput}`);
  }, [countryCode, phoneNumberInput]);

  function validatePhoneNumber(countryCode: string, phoneNumber: string) {
    const countryCodeRegex = /^\+\d{2}$/;
    const phoneNumberRegex = /^\d{10}$/;

    if (!countryCodeRegex.test(countryCode)) {
      Alert.alert(
        "Invalid Country Code",
        "Please enter a valid country code starting with + followed by 1 to 3 digits."
      );
      return false;
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid 10-digit phone number."
      );
      return false;
    }

    return true;
  }

  //   async function handelSignIn() {
  //     if (validatePhoneNumber(countryCode, phoneNumberInput)) {
  //       try {
  //         const responseData = await AuthenticatePhoneNumber(
  //           phNumber,
  //           setIsNewUser,
  //           setIsProfileCompleted
  //         );
  //         await storeUserProfileData({
  //           firstName: responseData.user.firstName,
  //           lastName: responseData.user.lastName,
  //           email: responseData.user.email,
  //           phoneNumber: phNumber,
  //         });
  //         const receivedToken = responseData.token;
  //         setToken(receivedToken);
  //         // setPhoneNumber(phNumber);
  //         // setFirstName(responseData.user.firstName);
  //         // setLastName(responseData.user.lastName);
  //         // setEmail(responseData.user.email);
  //         Alert.alert("Logging You In");
  //       } catch (error) {
  //         console.error("Error signing in", error);
  //       }
  //     }
  //   }

  //   async function sendOtpHandler() {
  //     if (validatePhoneNumber(countryCode, phoneNumberInput)) {
  //       try {
  //         await phoneAuthentication(phoneNumberInput).then(() => {
  //           Alert.alert("OTP sent successfully", "Please enter the OTP");
  //           setOtpSent(true);
  //         });
  //       } catch (error) {
  //         console.error("Error sending OTP", error);
  //       }
  //     }
  //   }

  //   const handleConfirmOtp = async () => {
  //     try {
  //       const responseData = await verifyOtp(
  //         phoneNumberInput,
  //         otp,
  //         setIsNewUser,
  //         setIsProfileCompleted
  //       );
  //       await storeUserProfileData({
  //         firstName: responseData.user.firstName,
  //         lastName: responseData.user.lastName,
  //         email: responseData.user.email,
  //         phoneNumber: phNumber,
  //       });
  //       const receivedToken = responseData.token;
  //       setToken(receivedToken);

  //       Alert.alert("Logging You In");
  //     } catch (error) {
  //       console.log("Invalid code. otp");
  //     }
  //   };

  // const handleConfirmOtp = async () => {
  //   try {
  //      confirmOtp(otp);
  //   } catch (error) {
  //     console.log("Invalid code. otp");
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer}>
          <View
            style={{
              height: "38%",
              // borderWidth: 1,
              borderRadius: 60,
              // backgroundColor: "#FBBF24",
              // elevation :  2
            }}
          >
            <Image
              style={styles.image}
              source={require("../../../../assets/Frame 69.png")}
            />
          </View>
          <View style={styles.headerContainer}>
            {/* <Text style={styles.title}>LOGIN</Text> */}
          </View>
          {/* !confirm && !user &&  */}
          {!otpSent && (
            <View style={styles.formContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    width: "25%",
                    height: 0,
                    marginBottom: 5,
                    marginHorizontal: 10,
                    borderColor: "#E6E9EF",
                  }}
                />
                <Text style={styles.label}>Login or sign up</Text>
                <View
                  style={{
                    borderWidth: 1,
                    width: "25%",
                    height: 0,
                    marginBottom: 5,
                    marginHorizontal: 10,
                    borderColor: "#E6E9EF",
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.countryCodeInput}
                  placeholder="+1"
                  keyboardType="phone-pad"
                  maxLength={3}
                  defaultValue="+91"
                  placeholderTextColor={"black"}
                  onChangeText={(text) => setCountryCode(text)}
                />
                <TextInput
                  style={styles.phoneNumberInput}
                  placeholder="+91 Enter Mobile Number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  autoFocus={true}
                  onChangeText={(text) => setPhoneNumberInput(text)}
                  placeholderTextColor={"black"}
                />
              </View>
            </View>
          )}

          {otpSent && (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Enter Your OTP</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.countryCodeInput}
                  placeholder="6 digit OTP here"
                  keyboardType="phone-pad"
                  maxLength={6}
                  onChangeText={(text) => setOtp(text)}
                />
              </View>
              <TouchableOpacity onPress={() => setOtpSent(false)}>
                <Text style={{ color: "blue" }}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          <BookNowButton
            // onPress={() => setOtpSent(true)}
            onPress={() => navigation.navigate("OtpScreen")}
            text="Contiinue"
            textStyle={{
              fontSize: 16,
            }}
            style={{
              height: "6%",
              width: "90%",
              marginHorizontal: 24,
              borderRadius: 15,
              alignSelf: "center",

              // marginTop: 16,
            }}
          />

          <View
            style={{
              height: "20%",
              marginTop: "20%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "500", color: "#596378" }}>
              {" "}
              By Continuing, you agree to our
            </Text>

            <View style={{ flexDirection: "row", marginTop: 8, gap: 24 }}>
              <TouchableOpacity>
                <Text
                  style={{
                    borderStyle: "dotted",
                    borderBottomWidth: 1,
                    color: "#596378",
                    padding: 3,
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  Terms of Service
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    borderStyle: "dotted",
                    borderBottomWidth: 1,
                    color: "#596378",
                    padding: 3,
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    borderStyle: "dotted",
                    borderBottomWidth: 1,
                    color: "#596378",
                    padding: 3,
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  Content Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <OrangeButton
        text={otpSent ? "Verify OTP" : "Send OTP"}
        onPress={otpSent ? handleConfirmOtp : sendOtpHandler}
      /> */}

      {/* {!confirm && !user &&(
        <OrangeButton text={"Send"} onPress={handelSignIn} />
      )}
      {confirm && !user &&(
        <OrangeButton text={"Confirm OTP"} onPress={handleConfirmOtp} />
      )} */}
      {/* {user && (
        <OrangeButton text={"Sign Out"} onPress={handleSignOut} />
      )} */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flexGrow: 1,
    // paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  topContainer: {
    flex: 1,
    borderWidth: 1,

    // justifyContent: 'center',
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
    // position : 'absolute'
  },
  formContainer: {
    // width: "100%",
    marginHorizontal: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
    color: "#596378",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  countryCodeInput: {
    // flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 15,
    elevation: 3,
    backgroundColor: "white",
    marginTop: 5,
    fontSize: 18,
    fontWeight: "500",
    width: 76,
  },
  phoneNumberInput: {
    flex: 4,
    borderRadius: 5,
    padding: 10,
    elevation: 3,
    backgroundColor: "white",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
    tintColor: "#000",
  },
});
