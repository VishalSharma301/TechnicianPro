import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LocaleConfig } from "react-native-calendars";
import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./src/store/AuthContext";
import AddressContextProvider from "./src/store/AddressContext";
import ServiceDetailContextProvider from "./src/store/ServiceTypeContext";
import CartContextProvider, { CartContext } from "./src/store/CartContext";
import ProfileContextProvider, {
  ProfileContext,
} from "./src/store/ProfileContext";
import ServicesContextProvider from "./src/store/ServicesContext";
import { getProfileData, getToken } from "./src/util/setAsyncStorage";
import * as Notifications from "expo-notifications";
import {
  AuthenticationScreens,
  IntroScreens,
  LoadingScreen,
} from "./Navigation";

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

function Navigator() {
  const { isAuthenticated, isLoading, token, setToken, setIsAuthenticated } =
    useContext(AuthContext);
  const { setEmail, setFirstName, setPhoneNumber, setLastName } =
    useContext(ProfileContext);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    async function fetchingToken() {
      const storedToken = await getToken();
      const profileData = await getProfileData();

      if (storedToken) {
        setToken(storedToken);
        if (profileData) {
          setEmail(profileData.email);
          setFirstName(profileData.firstName);
          setLastName(profileData.lastName);
          setPhoneNumber(profileData.phoneNumber);
        }
        setIsAuthenticated(true);
      }
      setRestoring(false); // ✅ finished restoring
    }

    fetchingToken();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {isLoading || restoring ? (
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
