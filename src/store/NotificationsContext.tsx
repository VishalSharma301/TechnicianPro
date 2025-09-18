// src/store/NotificationsContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { NotificationData } from "../constants/types";



interface NotificationsContextType {
  notifications: NotificationData[];
  addNotification: (notification: NotificationData) => void;
  markAsRead: (id: string) => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
}

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
  clearNotification: () => {},
  clearAllNotifications: () => {},
  unreadCount: 0,
});

const STORAGE_KEY = "@notifications_history";

export const NotificationsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Load saved notifications from AsyncStorage on app start
  useEffect(() => {
    loadNotifications();
  }, []);

  // Save notifications to AsyncStorage whenever notifications change
  useEffect(() => {
    saveNotifications();
  }, [notifications]);

  const loadNotifications = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedNotifications = JSON.parse(saved);
        setNotifications(parsedNotifications);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const saveNotifications = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  };

  const addNotification = (notification: NotificationData) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const value: NotificationsContextType = {
    notifications,
    addNotification,
    markAsRead,
    clearNotification,
    clearAllNotifications,
    unreadCount,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationsContextProvider"
    );
  }
  return context;
};
