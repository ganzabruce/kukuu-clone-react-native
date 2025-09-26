import { endpoints } from "@/constants/api";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
type ProductItem = { _id: string; imageUrl: string; name: string; description: string; price: number };

const Deals = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(endpoints.products);
        const data = await res.json();
        const list = Array.isArray(data?.products) ? (data.products as ProductItem[]) : [];
        setProducts(list);
      } catch (e) {
        setError("Failed to load deals");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const router = useRouter();

  if (loading) {
    return <ActivityIndicator style={{ padding: 20 }} />;
  }
  if (error) {
    return <Text style={{ padding: 20, color: 'red' }}>{error}</Text>;
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        rowGap: 50,
        justifyContent: "center",
      }}
    >
      {products.slice(0, 6).map((product) => (
        <Pressable key={product._id} style={styles.card} onPress={() => router.push({ pathname: '/product/[id]', params: { id: product._id } })}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <Text style={styles.price}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</Text>
          <Text style={styles.title}>{product.name}</Text>
          <Text numberOfLines={2} style={styles.details}>{product.description}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Deals;

const styles = StyleSheet.create({
  card: {
    width: "45%",
    backgroundColor: "#ddd",
    flexDirection: "column",
    padding: 5,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 100,
    backgroundColor: "#ddd",
    borderRadius: 6,
  },
  price: {
    color: "red",
    fontWeight: "bold",
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
    color: "#222",
  },
  details: {
    fontSize: 12,
    color: "#555",
    marginTop: 1,
  },
});
