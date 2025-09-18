import React, { useContext, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Notifications from "expo-notifications";
import { scale } from "../../util/scaling";
import { AuthContext } from "../../store/AuthContext";
import { useNotifications } from "../../store/NotificationsContext";

// Ask permission at least once in your app (maybe in App.tsx)

const NotificationsScreen = () => {
  const { expoPushToken } = useContext(AuthContext);
  const {
    notifications,
    markAsRead,
    clearNotification,
    clearAllNotifications,
    unreadCount,
  } = useNotifications();

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission not granted for notifications!");
      }
    })();
  }, []);

  async function sendPushNotification() {
    // Validate token
    if (!expoPushToken) {
      Alert.alert("Error", "No push token available!");
      return;
    }

    if (!expoPushToken.startsWith("ExponentPushToken[")) {
      Alert.alert("Error", "Invalid token format!");
      console.error("Invalid token:", expoPushToken);
      return;
    }

    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Test Notification",
      body: "This is a test notification 🚀",
      data: { someData: "goes here" },
    };

    console.log("Sending notification to token:", expoPushToken);

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error response:", result);
        Alert.alert(
          "Error",
          `Failed to send: ${result.errors?.[0]?.message || "Unknown error"}`
        );
        return;
      }

      console.log("Notification sent successfully:", result);
      Alert.alert("Success", "Notification sent!");
    } catch (error) {
      console.error("Network error:", error);
      Alert.alert("Error", "Network error occurred!");
    }
  }

  useEffect(() => {
    // Mark all notifications as read when screen is viewed
    notifications.forEach((notif) => {
      if (!notif.read) {
        markAsRead(notif.id);
      }
    });
  }, []);

  const handleDeleteNotification = (id: string) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => clearNotification(id),
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to clear all notifications?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: clearAllNotifications,
        },
      ]
    );
  };

  const renderNotificationItem = ({ item }: { item: any }) => (
    <View style={[styles.notificationItem, !item.read && styles.unreadItem]}>
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.receivedAt).toLocaleString()}
        </Text>
        {item.data && Object.keys(item.data).length > 0 && (
          <Text style={styles.data}>Data: {JSON.stringify(item.data)}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(item.id)}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No notifications yet</Text>
        <Button title="Send Notification" onPress={sendPushNotification} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Notifications ({notifications.length})
        </Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        showsVerticalScrollIndicator={false}
      />
      <Button title="Send Notification" onPress={sendPushNotification} />
    </View>
    
  );
};
{
  /* <View style={styles.container}>
          
        </View> */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fd",
    padding: scale(16),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  headerTitle: {
    fontSize: scale(24),
    fontWeight: "bold",
    color: "#333",
  },
  clearButton: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    backgroundColor: "#ff4444",
    borderRadius: scale(6),
  },
  clearButtonText: {
    color: "white",
    fontSize: scale(14),
    fontWeight: "600",
  },
  notificationItem: {
    backgroundColor: "white",
    borderRadius: scale(8),
    padding: scale(16),
    marginBottom: scale(12),
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unreadItem: {
    borderLeftWidth: scale(4),
    borderLeftColor: "#007bff",
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#333",
    marginBottom: scale(4),
  },
  body: {
    fontSize: scale(16),
    color: "#666",
    marginBottom: scale(8),
  },
  timestamp: {
    fontSize: scale(12),
    color: "#999",
    marginBottom: scale(4),
  },
  data: {
    fontSize: scale(12),
    color: "#007bff",
    fontStyle: "italic",
  },
  deleteButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(8),
  },
  deleteButtonText: {
    color: "white",
    fontSize: scale(20),
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f6fd",
  },
  emptyText: {
    fontSize: scale(18),
    color: "#666",
  },
});

export default NotificationsScreen;
