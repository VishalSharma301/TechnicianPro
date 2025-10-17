import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LocaleConfig } from "react-native-calendars";
import { useContext, useEffect, useRef, useState } from "react";
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
import * as Device from "expo-device";
import Constants from "expo-constants";
import {
  AuthenticationScreens,
  HomePage,
  IntroScreens,
  LoadingScreen,
} from "./Navigation";
import { Platform } from "react-native";
import { EventSubscription } from "expo-modules-core";
import { StatusBar } from "expo-status-bar";
import {
  NotificationsContextProvider,
  useNotifications,
} from "./src/store/NotificationsContext";
import { NotificationData } from "./src/constants/types";
import { useFonts } from "expo-font";
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import BookingContextProvider from "./src/store/BookingContext";

// ✅ Notification handler
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

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Permission not granted for push notifications!");
      return null;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      alert("Project ID not found in app config");
      return null;
    }

    try {
      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log("Expo Push Token:", token);
      return token;
    } catch (err) {
      console.error("Push token fetch error:", err);
      return null;
    }
  } else {
    alert("Must use physical device for push notifications");
    return null;
  }
}

function Navigator() {
  const {
    isAuthenticated,
    isLoading,
    token,
    setToken,
    setIsAuthenticated,
    expoPushToken,
    setExpoPushToken,
  } = useContext(AuthContext);
  const { setEmail, setFirstName, setPhoneNumber, setLastName, setUserId } =
    useContext(ProfileContext);
  const [restoring, setRestoring] = useState(true);
  const { addNotification } = useNotifications();
  const notificationListener = useRef<EventSubscription | null>(null);
  const responseListener = useRef<EventSubscription | null>(null);

  const handleNewNotification = (notification: Notifications.Notification) => {
    const notificationData: NotificationData = {
      id: notification.request.identifier || Date.now().toString(),
      title: notification.request.content.title || "No Title",
      body: notification.request.content.body || "No Content",
      data: notification.request.content.data,
      receivedAt: new Date().toISOString(),
      read: false,
    };

    addNotification(notificationData);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // ✅ Add listeners
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        handleNewNotification(notification);
      });

    // Handle notification interactions (taps)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("User interacted with notification:", response);
        handleNewNotification(response.notification);

        // Navigate to notifications screen or specific content
        // navigation.navigate('NotificationsScreen');
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [setExpoPushToken]);

  
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
          setUserId(profileData._id)
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
 const [fontsLoaded] = useFonts({
    MaterialCommunityIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
    MaterialIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf"),
    Octicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Octicons.ttf"),
    FontAwesome: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf"),
  });

  if (!fontsLoaded) { 
    return <LoadingScreen />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <NotificationsContextProvider>
          <ProfileContextProvider>
            <BookingContextProvider>
            <ServicesContextProvider>
              <ServiceDetailContextProvider>
                <AddressContextProvider>
                  <CartContextProvider>
                    <Navigator />
                    {/* <HomePage /> */}
                  </CartContextProvider>
                </AddressContextProvider>
              </ServiceDetailContextProvider>
            </ServicesContextProvider>
            </BookingContextProvider>
          </ProfileContextProvider>
        </NotificationsContextProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
}
