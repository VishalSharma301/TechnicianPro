import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
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
import { useContext, useEffect } from "react";
import AuthContextProvider, { AuthContext } from "./src/store/AuthContext";
import AuthScreen from "./src/app/screens/AuthScreen/AuthScreen";
import OTPVerificationScreen from "./src/app/screens/AuthScreen/OtpScreen";
import AddressScreen from "./src/app/screens/AddressScreen";
import ViewOrderScreen from "./src/app/screens/ViewOrderScreen";
import OrderHistoryScreen from "./src/app/screens/OrderHistoryScreen";
// import ProfileScreen from "./src/app/screens/ProfileScreen";
import AddressContextProvider from "./src/store/AddressContext";
import ServiceDetailContextProvider from "./src/store/ServiceTypeContext";
import CartScreen from "./src/app/screens/CartScreen";
import CartContextProvider, { CartContext } from "./src/store/CartContext";
import PressableIcon from "./src/app/components/PressableIcon";
import PaymentScreen from "./src/app/screens/PaymentScreen";
import ProfileContextProvider, {
  ProfileContext,
} from "./src/store/ProfileContext";
import EditProfileDataScreen from "./src/app/screens/EditProfileScreen";
// import { fetchToken } from "./src/util/setAsyncStorage";
import ServicesContextProvider from "./src/store/ServicesContext";
import { getProfileData, getToken } from "./src/util/setAsyncStorage";
import ProfileScreen from "./src/app/screens/ProfileScreen";
import SettingsScreen from "./src/app/screens/SettingsScreen";
import JobDetailsScreen from "./src/app/screens/JobDetailsScreen";
import NotificationsScreen from "./src/app/screens/NotificationsScreen";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff0000ff" />
    </View>
  );
}

function AuthenticationScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OTPVerificationScreen}
        options={{
          title: "OTP Verification",
          headerTitleStyle: {
            marginLeft: 100,
          },
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileDataScreen}
        options={{
          title: "Edit Profile",
          headerTitleStyle: {
            marginLeft: 100,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function HomeScreens() {
  const { emptyCart, cartItems } = useContext(CartContext);
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
        options={{ headerShown: false, cardStyle: { backgroundColor: "#fff" } }}
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
        options={{
          cardStyle: { backgroundColor: "#EFF4FF" },
          title: "Select a Location",
        }}
      />
      <Stack.Screen
        name="ViewOrderScreen"
        component={ViewOrderScreen}
        options={{ cardStyle: { backgroundColor: "#EFF4FF" } }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{ cardStyle: { backgroundColor: "#EFF4FF" } }}
      />
      <Stack.Screen
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
        options={{ cardStyle: { backgroundColor: "#EFF4FF" } }}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{  cardStyle: { backgroundColor: "#EFF4FF" } , headerShown : true , title : "Notifications"}}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: true,
          cardStyle: { backgroundColor: "#EFF4FF" },
          headerRight: () => (
            <PressableIcon
              name="trash-bin"
              height={20}
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
              color="black"
              onPress={emptyCart}
              disabled={cartItems.length == 0}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen}/> */}
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileDataScreen}
        options={{
          title: "Edit Profile",
          headerTitleStyle: {
            marginLeft: 100,
          },
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerTitleStyle: {
            marginLeft: 100,
          },
          headerShown: false,
        }}
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
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
        options={{
          tabBarLabel: "Orders",
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
        name="ProfileStack"
        component={ProfileStack}
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
   const { emptyCart, cartItems } = useContext(CartContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IntroScreen1" component={IntroScreen1} />
        <Stack.Screen name="IntroScreen2" component={IntroScreen2} />
        <Stack.Screen name="IntroScreen3" component={IntroScreen3} />
        <Stack.Screen
          name="JobDetailsScreen"
          component={JobDetailsScreen}
          options={{ headerShown : false}}
        />
         <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: true,
          cardStyle: { backgroundColor: "#EFF4FF" },
          headerRight: () => (
            <PressableIcon
              name="trash-bin"
              height={20}
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
              color="black"
              onPress={emptyCart}
              disabled={cartItems.length == 0}
            />
          ),
        }}
      />
        <Stack.Screen name="TabScreens" component={TabScreens} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

function Navigator() {
  const { isAuthenticated, isLoading, token, setToken, setIsAuthenticated } =
    useContext(AuthContext);
  const { setEmail, setFirstName, setPhoneNumber, setLastName } =
    useContext(ProfileContext);
  useEffect(() => {
    async function fetchingToken() {
      const storedToken = await getToken();
      const profileData = await getProfileData();
      if (storedToken) {
        setToken(storedToken);
        if (profileData != null) {
          setEmail(profileData.email);
          setFirstName(profileData.firstName);
          setLastName(profileData.lastName);
          setPhoneNumber(profileData.phoneNumber);
          // setId(profileData._id)
        } else {
          console.log("No profile data loaded");
        }
        setIsAuthenticated(true);
      }
    }

    fetchingToken();
  }, [token]);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {isLoading ? (
        <LoadingScreen />
      ) : !isAuthenticated ? (
        <AuthenticationScreens />
      ) : (
        <IntroScreens />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
        <ProfileContextProvider>
          <ServicesContextProvider>
            <ServiceDetailContextProvider>
              <AddressContextProvider>
                <CartContextProvider>
                  <Navigator />
                </CartContextProvider>
              </AddressContextProvider>
            </ServiceDetailContextProvider>
          </ServicesContextProvider>
        </ProfileContextProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
