import { endpoints } from '@/constants/api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Product = { _id: string; name: string; description: string; imageUrl: string; price: number; category: string };

export default function SectionScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(endpoints.products);
        const data = await res.json();
        const list = Array.isArray(data?.products) ? (data.products as Product[]) : [];
        setProducts(list);
      } catch (e) {
        setError('Failed to load items');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => products.filter(p => p.category === section), [products, section]);

  if (loading) return <ActivityIndicator style={{ padding: 20 }} />;
  if (error) return <Text style={{ padding: 20, color: 'red' }}>{error}</Text>;

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={styles.title}>{section}</Text>
      <FlatList
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        data={filtered}
        keyExtractor={(it) => it._id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/product/[id]', params: { id: item._id } })} style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    width: '32%',
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});
