import { AuthContext } from '@/app/_layout';
import { BASE_URL } from '@/constants/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
};

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const productId = useMemo(() => (params.id as string) || '', [params.id]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const { token } = React.useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const res = await fetch(`${BASE_URL}/api/routes/products/${productId}`);
        const data = await res.json();
        setProduct(data?.product ?? null);
      } catch (e) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator style={{ padding: 20 }} />;
  }
  if (error || !product) {
    return <Text style={{ padding: 20, color: 'red' }}>{error || 'Product not found'}</Text>;
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</Text>
      <Text style={styles.category}>Category: {product.category}</Text>
      <Text style={styles.description}>{product.description}</Text>
      
      <View style={styles.quantitySection}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <View style={styles.quantitySelector}>
          <Pressable 
            style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]} 
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Text style={[styles.quantityButtonText, quantity <= 1 && styles.quantityButtonTextDisabled]}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{quantity}</Text>
          <Pressable 
            style={styles.quantityButton} 
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Pressable 
          style={[styles.addToCartButton, addingToCart && styles.addToCartButtonDisabled]} 
          onPress={async () => {
            if (!token) {
              router.push('/auth');
              return;
            }
            setAddingToCart(true);
            try {
              const res = await fetch(`${BASE_URL}/api/routes/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ productId: product._id, quantity }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data?.error || 'Failed to add to cart');
              Alert.alert('Success', 'Product added to cart successfully!');
            } catch (e: any) {
              Alert.alert('Error', e?.message || 'Failed to add product to cart');
            } finally {
              setAddingToCart(false);
            }
          }}
          disabled={addingToCart}
        >
          <Text style={styles.addToCartText}>
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: 'orangered',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  quantitySection: {
    marginTop: 16,
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'orangered',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#ccc',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  quantityButtonTextDisabled: {
    color: '#999',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '700',
    minWidth: 30,
    textAlign: 'center',
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addToCartButton: {
    backgroundColor: 'orangered',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  addToCartButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});


