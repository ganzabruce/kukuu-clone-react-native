import { AuthContext } from '@/app/_layout';
import { endpoints } from '@/constants/api';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = { 
  _id: string; 
  name: string; 
  description: string; 
  imageUrl: string; 
  price: number; 
  category: string; 
  quantity: number;
};
type CartItem = { 
  _id: string; 
  productId: string | Product; 
  quantity: number; 
  subtotal: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export default function MyCart() {
  const { token } = React.useContext(AuthContext);
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const isLoggedIn = !!token;

  const loadCart = async (showRefreshIndicator = false) => {
    if (!isLoggedIn) return;
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const res = await fetch(endpoints.cart, {
        headers: { Authorization: `Bearer ${token}` },
      });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to fetch cart');
        const list: CartItem[] = data?.cartItems || [];
        console.log('Cart items with populated data:', JSON.stringify(list, null, 2));
        setItems(list);
    } catch (e) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [isLoggedIn, token]);

  const total = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = typeof it.productId === 'object' ? it.productId.price : 0;
      return sum + price * it.quantity;
    }, 0);
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((sum, it) => sum + it.quantity, 0);
  }, [items]);

  const updateQuantity = async (productId: string, nextQty: number) => {
    if (!token) return;
    if (nextQty <= 0) return removeItem(productId);
    setUpdatingItem(productId);
    try {
      const res = await fetch(`${endpoints.cart}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quantity: nextQty }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || 'Failed to update');
      await loadCart();
    } catch (e: any) {
      Alert.alert('Cart', e?.message || 'Failed to update cart');
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (productId: string) => {
    if (!token) return;
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            setUpdatingItem(productId);
            try {
              const res = await fetch(`${endpoints.cart}/${productId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data?.error || data?.message || 'Failed to remove');
              // Refresh cart after removal
              await loadCart();
            } catch (e: any) {
              Alert.alert('Cart', e?.message || 'Failed to remove item');
            } finally {
              setUpdatingItem(null);
            }
          },
        },
      ]
    );
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable onPress={() => router.push('/auth')} style={styles.loginBtn}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Login to view your cart</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (loading) return <ActivityIndicator style={{ padding: 20 }} />;
  if (error) return <Text style={{ padding: 20, color: 'red' }}>{error}</Text>;

  const clearAllItems = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove all items one by one
              for (const item of items) {
                const productId = typeof item.productId === 'object' ? item.productId._id : item.productId;
                await fetch(`${endpoints.cart}/${productId}`, {
                  method: 'DELETE',
                  headers: { Authorization: `Bearer ${token}` },
                });
              }
              await loadCart();
              Alert.alert('Success', 'All items removed from cart');
            } catch (e: any) {
              Alert.alert('Error', 'Failed to clear cart');
            }
          },
        },
      ]
    );
  };

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.headerActions}>
          <Pressable style={styles.refreshBtn} onPress={() => loadCart(true)}>
            <Text style={styles.refreshBtnText}>🔄</Text>
          </Pressable>
          {items.length > 0 && (
            <Pressable style={styles.clearBtn} onPress={clearAllItems}>
              <Text style={styles.clearBtnText}>Clear All</Text>
            </Pressable>
          )}
        </View>
      </View>
      
      {items.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'} • {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
          </Text>
        </View>
      )}
      
      <FlatList
        contentContainerStyle={{ padding: 12 }}
        data={items}
        keyExtractor={(it) => it._id || (typeof it.productId === 'object' ? it.productId._id : it.productId)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadCart(true)} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Text style={styles.emptySubtext}>Add some products to get started!</Text>
            <Pressable style={styles.shopBtn} onPress={() => router.push('/(tabs)/home')}>
              <Text style={styles.shopBtnText}>Start Shopping</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image 
              source={{ uri: typeof item.productId === 'object' ? item.productId.imageUrl : '' }} 
              style={styles.image} 
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name}>
                {typeof item.productId === 'object' ? item.productId.name : 'Loading...'}
              </Text>
              <Text style={styles.category}>
                {typeof item.productId === 'object' ? item.productId.category : ''}
              </Text>
              <Text style={styles.price}>
                {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  typeof item.productId === 'object' ? item.productId.price : 0
                )}
              </Text>
              <Text style={styles.subtotal}>
                Subtotal: {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  typeof item.productId === 'object' ? item.productId.price * item.quantity : 0
                )}
              </Text>
              <View style={styles.qtyRow}>
                <Pressable 
                  style={[styles.qtyBtn, updatingItem === (typeof item.productId === 'object' ? item.productId._id : item.productId) && styles.qtyBtnDisabled]} 
                  onPress={() => updateQuantity(typeof item.productId === 'object' ? item.productId._id : item.productId, item.quantity - 1)}
                  disabled={updatingItem === (typeof item.productId === 'object' ? item.productId._id : item.productId)}
                >
                  <Text style={styles.qtyTxt}>-</Text>
                </Pressable>
                <Text style={styles.qtyVal}>{item.quantity}</Text>
                <Pressable 
                  style={[styles.qtyBtn, updatingItem === (typeof item.productId === 'object' ? item.productId._id : item.productId) && styles.qtyBtnDisabled]} 
                  onPress={() => updateQuantity(typeof item.productId === 'object' ? item.productId._id : item.productId, item.quantity + 1)}
                  disabled={updatingItem === (typeof item.productId === 'object' ? item.productId._id : item.productId)}
                >
                  <Text style={styles.qtyTxt}>+</Text>
                </Pressable>
                <Pressable 
                  style={[styles.removeBtn, updatingItem === (typeof item.productId === 'object' ? item.productId._id : item.productId) && styles.removeBtnDisabled]} 
                  onPress={() => removeItem(typeof item.productId === 'object' ? item.productId._id : item.productId)}
                  disabled={updatingItem === (typeof item.productId === 'object' ? item.productId._id : item.productId)}
                >
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    {updatingItem === (typeof item.productId === 'object' ? item.productId._id : item.productId) ? '...' : 'Remove'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalVal}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}</Text>
            </View>
            {items.length > 0 && (
              <Pressable style={styles.checkoutBtn} onPress={() => Alert.alert('Checkout', 'Checkout functionality coming soon!')}>
                <Text style={styles.checkoutBtnText}>Place Order...</Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  refreshBtn: {
    padding: 8,
  },
  refreshBtnText: {
    fontSize: 18,
  },
  clearBtn: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  summary: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: 'orangered',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#eee' },
  name: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  category: { fontSize: 12, color: '#666', marginBottom: 2 },
  price: { fontSize: 14, color: 'orangered', marginBottom: 2 },
  subtotal: { fontSize: 13, color: '#666', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  qtyBtn: { width: 32, height: 32, borderRadius: 6, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  qtyBtnDisabled: { backgroundColor: '#f0f0f0', opacity: 0.6 },
  qtyTxt: { fontSize: 18, fontWeight: '700' },
  qtyVal: { minWidth: 30, textAlign: 'center', fontWeight: '700', fontSize: 16 },
  removeBtn: { marginLeft: 'auto', backgroundColor: 'crimson', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  removeBtnDisabled: { backgroundColor: '#ccc', opacity: 0.6 },
  footer: { paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#eee', marginTop: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  totalLabel: { fontWeight: '700', fontSize: 18 },
  totalVal: { fontWeight: '700', fontSize: 18, color: 'orangered' },
  checkoutBtn: { backgroundColor: 'orangered', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  checkoutBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  loginBtn: { backgroundColor: 'orangered', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8 },
});

