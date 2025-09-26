import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type SaleItem = {
  id: string | number;
  name: string;
  description: string;
  price: string | number;
  image: string;
};

type FlashSaleProps = {
  products?: {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
  }[];
};

const demoProducts: SaleItem[] = [
    {
      id: 1,
      name: "Wireless Earbuds",
      description: "Bluetooth 5.0, Noise Cancelling",
      price: "15,000 RWF",
      image: "https://global2019-static-cdn.kikuu.com/k-s-oss-1688457483821yynhCMTJ4z.jpg?x-oss-process=style/p_list",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Fitness Tracker, Heart Rate Monitor",
      price: "35,000 RWF",
      image: "https://global2019-static-cdn.kikuu.com/k-s-oss-1684874241516FGWnPQYYiw.jpg?x-oss-process=style/p_list",
    },
    {
      id: 3,
      name: "Phone Case",
      description: "Shockproof, Clear Design",
      price: "8,500 RWF",
      image: "https://global2019-static-cdn.kikuu.com/k-s-oss-1754480166757fYd7BjhzwF.jpg?x-oss-process=style/p_list",
    },
    {
      id: 4,
      name: "USB Cable",
      description: "Fast Charging, 2m Length",
      price: "3,200 RWF",
      image: "https://global2019-static-cdn.kikuu.com/upload-productImg-1629622497619.jpeg?x-oss-process=style/p_list",
    },
    {
      id: 5,
      name: "Portable Speaker",
      description: "Wireless, Waterproof IPX7",
      price: "22,000 RWF",
      image: "https://global2019-static-cdn.kikuu.com/k-s-oss-1695346578113JcZRsPHNZS.jpg?x-oss-process=style/p_list",
    },
];

const FlashSale: React.FC<FlashSaleProps> = ({ products }) => {
  const items: SaleItem[] = (products && products.length > 0)
    ? products.map((p) => ({
        id: p._id,
        name: p.name,
        description: p.description,
        price: `${p.price} RWF`,
        image: p.imageUrl,
      }))
    : demoProducts;

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 20, padding: 20 }}
    >
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={{ fontWeight: "bold", color: "red" }}>{item.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FlashSale;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 120,
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
});
