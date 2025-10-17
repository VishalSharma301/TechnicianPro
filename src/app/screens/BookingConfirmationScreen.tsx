// src/app/screens/BookingConfirmationScreen.tsx

import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BookingContext } from "../../store/BookingContext";
import { Ionicons } from "@expo/vector-icons";

export default function BookingConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { lastBookingResult, clearBookingResult } = useContext(BookingContext);

  useEffect(() => {
    // Clear booking result when leaving screen
    return () => {
      clearBookingResult();
    };
  }, []);

  if (!lastBookingResult) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
        <Text style={styles.errorTitle}>No Booking Details</Text>
        <Text style={styles.errorText}>Unable to load booking information</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TabScreens")}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { bookings, summary, assignmentDetails, failedItems } = lastBookingResult;

  return (
    <ScrollView style={styles.container}>
      {/* Success Header */}
      <View style={styles.successHeader}>
        <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successSubtitle}>
          {summary.successfulBookings} service(s) successfully booked
        </Text>
      </View>

      {/* Booking Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Booking Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Services:</Text>
          <Text style={styles.summaryValue}>{summary.totalBookings}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Successful:</Text>
          <Text style={[styles.summaryValue, styles.successText]}>
            {summary.successfulBookings}
          </Text>
        </View>
        {summary.failedBookings > 0 && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Failed:</Text>
            <Text style={[styles.summaryValue, styles.errorText]}>
              {summary.failedBookings}
            </Text>
          </View>
        )}
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>₹{summary.totalAmount}</Text>
        </View>
      </View>

      {/* Booked Services */}
      <View style={styles.servicesCard}>
        <Text style={styles.cardTitle}>Booked Services</Text>
        {bookings.map((booking, index) => (
          <View key={booking._id} style={styles.serviceItem}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>{booking.service?.name}</Text>
              <Text style={styles.serviceAmount}>₹{booking.amount}</Text>
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceStatus}>
                Status: <Text style={styles.statusBooked}>{booking.status}</Text>
              </Text>
              <Text style={styles.serviceDate}>
                {new Date(booking.scheduledDate).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            {assignmentDetails[index] && (
              <View style={styles.providerInfo}>
                <Ionicons name="person" size={16} color="#666" />
                <Text style={styles.providerText}>
                  Provider assigned • Distance: {assignmentDetails[index].distance}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Failed Items (if any) */}
      {failedItems?.length > 0 && (
        <View style={styles.failedCard}>
          <Text style={styles.cardTitle}>Failed Bookings</Text>
          {failedItems.map((item, index) => (
            <View key={index} style={styles.failedItem}>
              <Ionicons name="alert-circle" size={20} color="#ff6b6b" />
              <Text style={styles.failedText}>{item.reason || "Booking failed"}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("OrderHistoryScreen")}
        >
          <Text style={styles.secondaryButtonText}>View Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "TabScreens" }],
            });
          }}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  successHeader: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  successText: {
    color: '#4CAF50',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#153B93',
  },
  servicesCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
  },
  serviceItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16,
    marginBottom: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  serviceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#153B93',
  },
  serviceDetails: {
    marginBottom: 8,
  },
  serviceStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statusBooked: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  serviceDate: {
    fontSize: 14,
    color: '#666',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  failedCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  failedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  failedText: {
    fontSize: 14,
    color: '#ff6b6b',
    marginLeft: 8,
    flex: 1,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  button: {
    backgroundColor: '#153B93',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#153B93',
  },
  secondaryButtonText: {
    color: '#153B93',
    fontSize: 16,
    fontWeight: '600',
  },
});
