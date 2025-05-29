import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const initialAddresses = [
  {
    label: 'Home',
    address: 'Bassi Pathana, India',
    phone: '+91-2454657787',
  },
  {
    label: 'Home',
    address: 'Morinda',
    phone: '+91-5436578755',
  },
  {
    label: 'Work',
    address: 'Chandigarh',
    phone: '+91-97653445334',
  },
];

export default function SelectLocationScreen() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [modalVisible, setModalVisible] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const navigation = useNavigation()

  const handleAddAddress = () => {
    if (!newLabel || !newAddress || !newPhone) {
      Alert.alert('Missing Fields', 'Please fill all the fields.');
      return;
    }
    const newEntry = {
      label: newLabel,
      address: newAddress,
      phone: newPhone,
    };
    setAddresses(prev => [newEntry, ...prev]);
    setModalVisible(false);
    setNewLabel('');
    setNewAddress('');
    setNewPhone('');
    Alert.alert('Address Added', 'A new address has been added successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select a Location</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search For Services"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterIcon}>
          <Icon name="tune" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Add Address */}
      <TouchableOpacity style={styles.addAddress} onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={20} color="#2956A3" />
        <Text style={styles.addAddressText}>Add address</Text>
      </TouchableOpacity>

      {/* Current Location */}
      <View style={styles.currentLocationCard}>
        <Icon name="crosshairs-gps" size={20} color="#2956A3" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.currentTitle}>Use Current Location</Text>
          <Text style={styles.currentSubtitle}>Cheema Colony , Bassi Pathana</Text>
        </View>
      </View>

      {/* Saved Address Title */}
      <Text style={styles.savedTitle}>SAVED ADDRESS</Text>

      <FlatList
        data={addresses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <AddressCard item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Modal for new address */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <TextInput
              placeholder="Label (e.g. Home)"
              style={styles.modalInput}
              value={newLabel}
              onChangeText={setNewLabel}
            />
            <TextInput
              placeholder="Address"
              style={styles.modalInput}
              value={newAddress}
              onChangeText={setNewAddress}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.modalInput}
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#999' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddAddress}>
                <Text style={{ color: '#2956A3', fontWeight: '600' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function AddressCard({ item }: any) {
  return (
    <View style={styles.addressCard}>
      <View style={styles.addressLeft}>
        <Icon name="home-outline" size={22} color="#2956A3" style={styles.homeIcon} />
        <View>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.phone}>{`Phone number: ${item.phone}`}</Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="dots-horizontal" size={20} color="#2956A3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="send" size={20} color="#2956A3" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  filterIcon: {
    marginLeft: 10,
  },
  addAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  addAddressText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#000',
  },
  currentLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginTop: 12,
  },
  currentTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: '#000',
  },
  currentSubtitle: {
    fontSize: 13,
    color: '#444',
  },
  savedTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 13,
    color: '#999',
    fontWeight: '600',
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  homeIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  label: {
    fontWeight: '700',
    color: '#2956A3',
    fontSize: 15,
  },
  address: {
    color: '#444',
    marginTop: 2,
    fontSize: 13,
  },
  phone: {
    marginTop: 2,
    fontSize: 13,
    color: '#444',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  iconBtn: {
    marginLeft: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
