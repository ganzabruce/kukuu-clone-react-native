
// auth/index.js (or wherever your tab navigator is)
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

import Register from '@/components/auth/register';
import Login from '@/components/auth/login';

function MyTabs() {
  return (
    <SafeAreaView style={{flex:1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#222222',
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: {
            backgroundColor: '#222222',
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: 'white',
          },
        }}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyTabs;
