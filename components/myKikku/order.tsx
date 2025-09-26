import { router } from 'expo-router'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const Order = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Orders</Text>
        <TouchableOpacity
          onPress={() => router.push('/myOrder')}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 15, color: '#294592ff' }}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logos}>
        <View style={styles.logoItem}>
          <Ionicons name="hourglass-outline" size={20} />
          <Text style={styles.logoText}>Pending</Text>
          <Text style={styles.logoText}>Payment</Text>
        </View>
        <View style={styles.logoItem}>
          <Ionicons name="trail-sign-outline" size={20} />
          <Text style={styles.logoText}>In Transit</Text>
          <Text style={styles.logoText}>(Shipping)</Text>
        </View>
        <View style={styles.logoItem}>
          <Ionicons name="chatbox-ellipses-outline" size={20} />
          <Text style={styles.logoText}>Pending</Text>
          <Text style={styles.logoText}>FeedBack</Text>
        </View>
        <View style={styles.logoItem}>
          <Ionicons name="cube-outline" size={20} />
          <Text style={styles.logoText}>Return &</Text>
          <Text style={styles.logoText}>Refund</Text>
        </View>
      </View>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  logos: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  logoItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 4,
  },
  logoText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
})