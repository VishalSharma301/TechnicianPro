import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import AuthScreen from "./src/app/screens/AuthScreen/AuthScreen";
import OTPVerificationScreen from "./src/app/screens/AuthScreen/OtpScreen";
import EditProfileScreen from "./src/app/screens/EditProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableIcon from "./src/app/components/PressableIcon";
import CartScreen from "./src/app/screens/CartScreen";
import AddressScreen from "./src/app/screens/AddressScreen";
import ViewOrderScreen from "./src/app/screens/ViewOrderScreen";
import OrderHistoryScreen from "./src/app/screens/OrderHistoryScreen";
import PaymentScreen from "./src/app/screens/PaymentScreen";
import { useContext } from "react";
import { CartContext } from "./src/store/CartContext";
import HomeScreen from "./src/app/screens/HomeScreen";
import SelectServiceScreen from "./src/app/screens/SelectServiceScreen";
import AllServicesScreen from "./src/app/screens/AllServicesScreen";
import NotificationsScreen from "./src/app/screens/NotificationsScreen";
import ProfileScreen from "./src/app/screens/ProfileScreen";
import SettingsScreen from "./src/app/screens/SettingsScreen";
import CalendarScreen from "./src/app/screens/CalendarScreen";
import JobDetailsScreen from "./src/app/screens/JobDetailsScreen";
import IntroScreen1 from "./src/app/screens/IntroScreens/IntroScreen1";
import SelectLocationScreen from "./src/app/screens/SelectLocationScreen";
import ServiceDetailsScreen from "./src/app/screens/ServiceDetailsScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeIcon = require("./assets/tabs/home.png");
const MessageIcon = require("./assets/tabs/msg.png");
const CalendarIcon = require("./assets/tabs/cal.png");
const ProfileIcon = require("./assets/tabs/profile.png");

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff0000ff" />
    </View>
  );
}

export function AuthenticationScreens() {
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
        component={EditProfileScreen}
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

export function HomeScreens() {
  const { emptyCart, cartItems } = useContext(CartContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
        options={{ headerShown: false }}
      />
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
        options={{
          cardStyle: { backgroundColor: "#EFF4FF" },
          headerShown: true,
          title: "Notifications",
        }}
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

export function ProfileStack() {
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
        component={EditProfileScreen}
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

export function TabScreens() {
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

export function IntroScreens() {
  const { emptyCart, cartItems } = useContext(CartContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="IntroScreen1" component={IntroScreen1} />
        <Stack.Screen
          name="JobDetailsScreen"
          component={JobDetailsScreen}
          options={{ headerShown: false }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
