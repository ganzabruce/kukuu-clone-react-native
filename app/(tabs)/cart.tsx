import { AuthContext } from '@/app/_layout';
import MyCart from '@/app/myCart';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MyTabs from '../auth';

const Cart = () => {
  const { token, loadingAuth } = React.useContext(AuthContext);
  if (loadingAuth) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ padding: 20 }} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {token ? <MyCart /> : <MyTabs />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Cart;