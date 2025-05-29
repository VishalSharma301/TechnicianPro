import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ViewOrderScreen() {
    const navigation = useNavigation<any>()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Order</Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Service Summary */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.serviceTitle}>AC Servicing</Text>
            <View style={styles.counterBox}>
              <Text style={styles.counterBtn}>+</Text>
              <Text style={styles.counterBtn}>1</Text>
              <Text style={styles.counterBtn}>-</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit &gt;</Text>
          </TouchableOpacity>
          <Text style={styles.price}>₹30</Text>
    

        {/* Add More Items */}
        <Text style={styles.addMoreText}>+ Add More items</Text>
        <View style={styles.tagsRow}>
          <Tag label="Windows AC" />
          <Tag label="Plumber" />
          <Tag label="Eklectrecian" />
        </View>
            </View>

        {/* Coupon View */}
        <TouchableOpacity style={styles.couponBox}>
          <Text style={styles.couponText}> View All coupon</Text>
          <Ionicons name="chevron-forward" size={18} color="#000" />
        </TouchableOpacity>

        {/* Delivery Info */}
        <View style={styles.deliveryCard}>
          <Text style={styles.deliveryTitle}>Delivery in 96 Hour</Text>
          <Text style={styles.scheduleText}>Want this later? Schedule it</Text>
          <View style={styles.separator} />
          <Text style={styles.deliveryTitle}>Delivery at Home</Text>
          <Text style={styles.addressText}>
            Gameland -old city, Bassi Pathana, India{"\n"}
            Phone number: +91-9041624576
          </Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity>
              <Ionicons name="map-outline" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="send-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

            {/* Footer */}
           <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.payLabel}>Pay Using Cash</Text>
          <Text style={styles.orText}>Or</Text>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={()=>navigation.navigate('OrderHistoryScreen')}>
          <Text style={styles.totalText}>₹300 TOTAL</Text>
          <Text style={styles.placeOrderText}>Place Order &gt;</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

  
   
    </SafeAreaView>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF3FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#153B93',
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  counterBtn: {
    color: '#fff',
    paddingHorizontal: 6,
  },    
  editText: {
    color: '#153B93',
    marginTop: 8,
    fontSize: 13,
  },
  price: {
    textAlign: 'right',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 4,
  },
  addMoreText: {
    marginTop: 14,
    // marginLeft: 16,
    fontWeight: '600',
  },
  tagsRow: {
    flexDirection: 'row',
    // marginHorizontal: 16,
    marginTop: 10,
    gap: 8,
  },
  tag: {
    backgroundColor: '#E8EFE6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },
  couponBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: '3%',
    borderRadius: 10,
  },
  couponText: {
    fontSize: 14,
    color: '#000',
  },
  deliveryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginTop: '3%',
  },
  deliveryTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  scheduleText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  addressText: {
    color: '#444',
    marginTop: 4,
    fontSize: 13,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal : 20,
    marginTop : '3%'
  },
  payLabel: {
    fontSize: 12,
    color: '#000',
  },
  orText: {
    fontSize: 10,
    color: '#999',
  },
  orderButton: {
    backgroundColor: '#153B93',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  totalText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});
