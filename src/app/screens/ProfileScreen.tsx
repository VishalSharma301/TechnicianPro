import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Text
} from "react-native";
import { Icon, Card } from "@rneui/base";
import {launchImageLibrary} from 'react-native-image-picker';
// import { FIREBASE_AUTH } from "../../../firebaseconfig";
// import { signOut } from "firebase/auth";

import CustomImage from "../components/Image";
import PressableIcon from "../components/PressableIcon";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import {ProfileContext} from "../../store/ProfileContext"
// import CalenderComponent from "../../components/Calander";
// import { HabitContext } from "../../Store/HabitContext";
// import { SpaceContext } from "../../Store/SpaceContext";
import ScreenHeader from "../components/ScreenHeader";

const { height, width } = Dimensions.get("screen");
const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation<any>()
  const {firstName, lastName} = useContext(ProfileContext)

const name = " Vishal Sharma"
  const handleProfileImage = () => {
    const options: any = {
      mediaType: "photo", // This is required
      maxWidth: 300,
      maxHeight: 300, 
      quality: 0.8, 
      includeBase64: false, 
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorCode);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source.uri);
      }
    });
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {/* Header */}
      <Image
        style={styles.image}
        source={require("../../../assets/images/Rectangle 1.png")}
      />
      
      <View style={styles.header}>
        <PressableIcon
          name="arrow-back"
          height={24}
          width={24}
          onPress={() => {navigation.goBack()}}
          color="black"
          containerStyle={styles.icon}
        />
        <PressableIcon
          name="menu"
          height={24}
          width={24}
          onPress={()=>{navigation.navigate("Edit Profile")}}
          color="black"
          containerStyle={styles.icon}
        />
      </View>
     
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <CustomImage
          height={80}
          width={80}
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../../assets/images/tony.jpg")
          }
          style={{ borderWidth: 1, borderColor: "#fff" }}
        />

       
      </View>
      <Text style={styles.name}>
        {name}
      </Text>
      
      

      {/* Settings Section */}
     
      <View style={styles.settings}>
        <Text  style={styles.settingsTitle}>
          Settings
        </Text>
      {renderSettingsOption("FAQ", "help-outline", true)}
{renderSettingsOption("Invite a friend", "person-add")}
{renderSettingsOption("Share feedback", "feedback")}
{renderSettingsOption("Signout", "logout", false, false, () => console.log("Sign out"))}
{renderSettingsOption("Delete account", "delete", false, true)}

      </View>
    </View>
      </ScrollView>
  );
};

const renderSettingsOption = (
  title,
  icon = null,
  external = false,
  isDanger = false,
  onPress = null
) => (
  <TouchableOpacity
    style={[styles.settingsOption, isDanger && styles.deleteOption]}
    onPress={onPress}
  >
    <Text style={[styles.settingsText, isDanger && styles.deleteText]}>
      {title}
    </Text>
    {external && icon && <Icon name={icon} type="material" size={18} />}
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  scrollContainer: {
  flexGrow: 1,
},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  icon : {
    width : 44,
    height : 44,
    borderRadius : 16,
    backgroundColor : colors.primary.Primary50,
    alignItems :'center' ,
    justifyContent : 'center'

  },
  image: {
    width: width,
    position: "absolute",
    overflow: "hidden",
    height: 232,
    // elevation: -1,
    top: -12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems : 'center' ,
    padding: 4,
    marginBottom: 32,
    marginTop: 34,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 16,
    flexDirection: "row",
    height: 80,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    fontWeight : 'bold',
    fontStyle : 'italic'
  },
  info: {
    flexDirection: "row",
    marginVertical: 8,
  },
  infoItem: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  infoNumber: {
    fontSize: 20,
  },
  infoLabel: {
    fontSize: 14,
  },
  calendarSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  month: {
    fontSize: 18,
  },
  calendarArrows: {
    flexDirection: "row",
  },
  settings: {
    padding: 16,
    marginTop : 100
  },
  settingsTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  settingsOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingsText: {
    fontSize: 16,
  },
  deleteOption: {
    marginTop: 16,
  },
  deleteText: {
    color: "red",
  },
});

export default ProfileScreen;
