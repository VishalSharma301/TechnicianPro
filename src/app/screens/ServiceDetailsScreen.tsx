import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';

const ASSETS_PATH = "../../../assets/";

interface serviceProps {
    name : string,
    description : string
}

type ServiceRouteProp = RouteProp<{ params: serviceProps }, 'params'>;

const images = [
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
  require(`${ASSETS_PATH}coupon.png`),
];

export default function ServiceDetailsScreen () {
    const service = useRoute<ServiceRouteProp>().params
   
    
useEffect(() => {
  console.log('route : ', service,);
  
}, []);

  return (
    <ScrollView style={styles.container}>
      {/* Item Description */}
      <Text style={styles.sectionTitle}>{service.name}</Text>
      <Text style={styles.descriptionText}>
        {service.description}
      </Text>

      {/* Our Process */}
      <Text style={styles.sectionTitle}>Our Process</Text>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.processBox}>
          <Text style={styles.processText}>
           Process
          </Text>
          <View style={styles.stepNumber}><Text style={styles.stepText}>{step}</Text></View>
        </View>
      ))}

      {/* What we need from you */}
      <Text style={styles.sectionTitle}>What we need from you</Text>
      <View style={styles.neededRow}>
        {images.map((img, i) => (
          <View key={i} style={styles.neededItem}>
            <Image source={img} style={styles.neededIcon} />
            <Text style={styles.neededLabel}>x</Text>
          </View>
        ))}
      </View>

      {/* Company promise */}
      {/* <Text style={styles.sectionTitle}>Company promise</Text>
      <View style={styles.promiseBox}>
        <Text style={styles.promiseItem}>🔒 Upto 10 Days Warranty</Text>
        <Text style={styles.promiseItem}>🛡️ Upto 1000 damage cover</Text>
        <Text style={styles.promiseItem}>💵 Fixed Rate</Text>
        <Text style={styles.promiseItem}>🎧 On Call repair quote verification</Text>
      </View> */}

      {/* Reviews summary */}
      {/* <Text style={styles.sectionTitle}>Reviews</Text>
      <View style={styles.reviewBox}>
        <Text style={styles.reviewCount}>1.5M Reviews</Text>
        {[5, 4, 3, 2, 1].map((star, i) => (
          <View key={i} style={styles.reviewRow}>
            <Text>★ {star}</Text>
            <View style={[styles.bar, { width: `${[94, 20, 12, 8, 3][i]}%` }]} />
            <Text style={styles.barText}>{['1.4M', '44K', '18K', '13K', '4K'][i]}</Text>
          </View>
        ))}
      </View> */}

      {/* All Reviews */}
      <Text style={styles.sectionTitle}>All reviews</Text>
      <View style={styles.filterRow}>
        {['Most detailed', 'In my area', 'Frequent users'].map((tag, i) => (
          <Text key={i} style={styles.filterTag}>{tag}</Text>
        ))}
      </View>
      {/* <View style={styles.reviewCard}>
        <Text style={styles.reviewer}>Tejinder Singh</Text>
        <Text style={styles.reviewDate}>May 21, 2025</Text>
        <Text style={styles.reviewText}>
          Let me structure this into main categories with subcategories. Ensure each is clear and covers all aspects of AC services.
        </Text>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  descriptionText: { fontSize: 14, color: '#555' },
  processBox: {
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  processText: { flex: 1, fontSize: 14, color: '#333' },
  stepNumber: {
    backgroundColor: '#3B82F6',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  stepText: { color: '#fff', fontWeight: 'bold' },
  neededRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  neededItem: { alignItems: 'center' },
  neededIcon: { width: 48, height: 48, resizeMode: 'contain' },
  neededLabel: { marginTop: 6, fontSize: 12, color: '#333' },
  promiseBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 2,
  },
  promiseItem: { marginBottom: 6, fontSize: 14, color: '#222' },
  reviewBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 2,
  },
  reviewCount: { fontWeight: 'bold', marginBottom: 10 },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    gap: 6,
  },
  bar: {
    height: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 3,
    flexGrow: 1,
  },
  barText: { marginLeft: 4, fontSize: 12 },
  filterRow: { flexDirection: 'row', gap: 8, marginVertical: 10 },
  filterTag: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 12,
    color: '#065F46',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  reviewer: { fontWeight: 'bold' },
  reviewDate: { fontSize: 12, color: '#888', marginBottom: 8 },
  reviewText: { fontSize: 14, color: '#444' },
});


