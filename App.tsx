import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IntroScreen1 from "./src/app/screens/IntroScreens/IntroScreen1";
import IntroScreen3 from "./src/app/screens/IntroScreens/IntroScreen3";
import IntroScreen2 from "./src/app/screens/IntroScreens/IntroScreen2";

import HomeScreen from "./src/app/screens/HomeScreen";
import MessageScreen from "./src/app/screens/MessageScreen";
import CalendarScreen from "./src/app/screens/CalendarScreen";
// import ProfileScreen from './src/app/screens/ProfileScreen';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { LocaleConfig } from "react-native-calendars";
import SelectServiceScreen from "./src/app/screens/SelectServiceScreen";
import AllServicesScreen from "./src/app/screens/AllServicesScreen";
import ServiceDetailsScreen from "./src/app/screens/ServiceDetailsScreen";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "./src/store/AuthContext";
import AuthScreen from "./src/app/screens/AuthScreen/AuthScreen";
import OTPVerificationScreen from "./src/app/screens/AuthScreen/OtpScreen";
import AddressScreen from "./src/app/screens/AddressScreen";
import ViewOrderScreen from "./src/app/screens/ViewOrderScreen";
import OrderHistoryScreen from "./src/app/screens/OrderHistoryScreen";
import ProfileScreen from "./src/app/screens/ProfileScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

LocaleConfig.locales["en"] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  // numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] // number localization example
};
LocaleConfig.defaultLocale = "en";

const HomeIcon = require("./assets/tabs/home.png");
const MessageIcon = require("./assets/tabs/msg.png");
const CalendarIcon = require("./assets/tabs/cal.png");
const ProfileIcon = require("./assets/tabs/profile.png");

function AuthenticationScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthScreen" component={AuthScreen} options={{
        headerShown : false
      }} />
      <Stack.Screen name="OtpScreen" component={OTPVerificationScreen} options={{
        title : 'OTP Verification',
        headerTitleStyle : {
          marginLeft : 100        }
      }}/>
    </Stack.Navigator>
  );
}

function HomeScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectServiceScreen"
        component={SelectServiceScreen}
         options={{ headerShown: false, cardStyle : {backgroundColor : '#fff'} }}
      />
      <Stack.Screen
        name="AllServicesScreen"
        component={AllServicesScreen}
        options={{ cardStyle: { backgroundColor: "#EFF4FF" } }}
      />
      <Stack.Screen
        name="ServiceDetailsScreen"
        component={ServiceDetailsScreen}
        options={{ cardStyle: { backgroundColor: "#EFF4FF" } }}
      />
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{ cardStyle: { backgroundColor: "#EFF4FF" } ,  title : "Select a Location"}}
      />
      <Stack.Screen
        name="ViewOrderScreen"
        component={ViewOrderScreen}
        options={{ cardStyle: { backgroundColor: "#EFF4FF" } }}
      />
      <Stack.Screen
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
        options={{ cardStyle: { backgroundColor: "#EFF4FF" } }}
      />
      
    </Stack.Navigator>
  );
}

function TabScreens() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
        tabBarStyle: {
          height: 60, // ⬅️ Increase height here
          paddingBottom: 7, // optional: move icons/text upward
          paddingTop: 7, // optional: space out from top
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreens"
        component={HomeScreens}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={HomeIcon}
              style={{
                width: 24,
                height: 24,
                // tintColor: focused ? '#1D4ED8' : '#999'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ focused }) => (
            <Image
              source={MessageIcon}
              style={{
                width: 24,
                height: 24,
                // tintColor: focused ? '#1D4ED8' : '#999'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ focused }) => (
            <Image
              source={CalendarIcon}
              style={{
                width: 24,
                height: 24,
                // tintColor: focused ? '#1D4ED8' : '#999'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Image
              source={ProfileIcon}
              style={{
                width: 24,
                height: 24,
                // tintColor: focused ? '#1D4ED8' : '#999'
              }}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function IntroScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="IntroScreen1" component={IntroScreen1} />
      <Stack.Screen name="IntroScreen2" component={IntroScreen2} />
      <Stack.Screen name="IntroScreen3" component={IntroScreen3} />
      <Stack.Screen name="TabScreens" component={TabScreens} />
    </Stack.Navigator>
  );
}

function Navigator() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {/* <AuthenticationScreens /> */}
      {!isAuthenticated ? <AuthenticationScreens /> : <IntroScreens />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
        <GestureHandlerRootView>
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContextProvider>
          <Navigator />
      </AuthContextProvider>
    </SafeAreaView>
        </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
