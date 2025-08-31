import React, { useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import { scale } from "../../util/scaling";

// Ask permission at least once in your app (maybe in App.tsx)


const NotificationsScreen = () => {
useEffect(() => {
  (async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission not granted for notifications!");
    }
  })();
}, []);

  const triggerNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello 👋",
        body: "This is an in-app Expo notification!",
      },
      trigger: null, // null = show immediately
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={triggerNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f6fd",
  },
});

export default NotificationsScreen;
