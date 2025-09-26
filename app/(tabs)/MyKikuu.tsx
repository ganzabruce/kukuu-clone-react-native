import { AuthContext } from '@/app/_layout'
import Spacer from '@/components/Spacer'
import SectionListBasics from '@/components/myKikku/list'
import Order from '@/components/myKikku/order'
import { Link } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const MyKikuu = () => {
  const { token, setToken } = React.useContext(AuthContext)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.banner}>
          {token ? (
            <Pressable style={styles.button} onPress={() => setToken(null)}>
              <Text style={{ color: '#c24b2dff', fontSize: 20, fontWeight: 'bold' }}>
                Logout
              </Text>
            </Pressable>
          ) : (
            <Pressable style={styles.button}>
              <Link href="/auth">
                <Text style={{ color: '#c24b2dff', fontSize: 20, fontWeight: 'bold' }}>
                  Login/Register
                </Text>
              </Link>
            </Pressable>
          )}
        </View>

        <Spacer height={40} />

        {/* Order Component */}
        <View style={{ marginTop: 40 }}>
          <Order />
        </View>

        <View style={styles.list}>
          <SectionListBasics />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MyKikuu

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -20,
    height: 100,
    backgroundColor: '#c24b2dff',
    position: 'relative',
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80, 
  },
  button: {
    backgroundColor: 'white',
    width: '70%',
    position: 'absolute',
    bottom: -10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  list: {
    flex: 1,
    width: '100%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
})
