import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const Order = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Orders</Text>
        <Text style={{ fontSize: 15, color: '#294592ff' }}>View All</Text>
      </View>
      <View style={styles.logos}>
        <View style={styles.logoItem}>
          <Ionicons name="hourglass-outline" style={{ fontSize: 20 }} />
          <Text>Pending</Text>
          <Text>Payment</Text>
        </View>
        <View style={styles.logoItem}>
          <Ionicons name="trail-sign-outline" style={{ fontSize: 20 }} />
          <Text>In Transit</Text>
          <Text>(Shipping)</Text>
        </View>
        <View style={styles.logoItem}>
          <Ionicons name="chatbox-ellipses-outline" style={{ fontSize: 20 }} />
          <Text>Pending</Text>
          <Text>FeedBack</Text>
        </View>
        <View style={styles.logoItem}>
          <Ionicons name="cube-outline" style={{ fontSize: 20 }} />
          <Text>Return &</Text>
          <Text>Refund</Text>
        </View>
      </View>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  logos: {
    width: '100%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderRadius: 10,
  },
  logoItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
})
