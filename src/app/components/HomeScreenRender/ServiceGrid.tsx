import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../util/scaling';

const ServiceGrid = () => {
  const services = [
    {
      id: 1,
      title: 'Plumber Services',
      price: '₹300',
      rating: 4.1,
      icon: '🔧', // You can replace with actual icons
      backgroundColor: '#F5E6E0'
    },
    {
      id: 2,
      title: 'Split Ac Services',
      price: '₹300',
      rating: 4.3,
      icon: '❄️',
      backgroundColor: '#F0E6D6'
    },
    {
      id: 3,
      title: 'Chimney Repair',
      price: '₹300',
      rating: 4.6,
      icon: '🏠',
      backgroundColor: '#E0F0F5'
    },
    {
      id: 4,
      title: 'Electrician Services',
      price: '₹300',
      rating: 4.6,
      icon: '⚡',
      backgroundColor: '#E8E0F5'
    },
    {
      id: 5,
      title: 'Sealing Fan Repair',
      price: '₹300',
      rating: 4.2,
      icon: '🌀',
      backgroundColor: '#F0E6D6'
    },
    {
      id: 6,
      title: 'Electrician Services',
      price: '₹300',
      rating: 4.7,
      icon: '🔌',
      backgroundColor: '#E8E0F5'
    }
  ];

  const renderServiceCard = (service : any) => (
    <TouchableOpacity key={service.id} style={[styles.serviceCard, { backgroundColor: service.backgroundColor }]}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>{service.icon}</Text>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.starIcon}>★</Text>
        <Text style={styles.ratingText}>{service.rating}</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={styles.servicePrice}>{service.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {services.map(renderServiceCard)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: scale(160),
    height: verticalScale(140),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
    padding: scale(12),
    position: 'relative',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
  },
  iconText: {
    fontSize: moderateScale(32),
  },
  ratingContainer: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    backgroundColor: '#4A5CBE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(3),
    borderRadius: moderateScale(12),
  },
  starIcon: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    marginRight: scale(2),
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  contentContainer: {
    position: 'absolute',
    bottom: scale(12),
    left: scale(12),
    right: scale(12),
  },
  serviceTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#333333',
    marginBottom: verticalScale(4),
    lineHeight: moderateScale(18),
  },
  servicePrice: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333333',
  },
});

export default ServiceGrid;