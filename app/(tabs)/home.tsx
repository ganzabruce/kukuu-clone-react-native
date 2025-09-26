import Toggler from "@/components/dealsToggler";
import ExperienceImage from "@/components/experienceImage";
import FlashSale from "@/components/flashSale";
import KikuuPicks from "@/components/kikuuPicks";
import LandingPageCategories from "@/components/landingPageCategories";
import Slider from "@/components/slider";
import { endpoints } from '@/constants/api';
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../../components/Spacer";

type Product = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
};

export default function Page() {
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
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.main}>
          <Slider />
        </View>
        <Spacer height={20} />
        <View style={{display:"flex",flexDirection:"row", flexWrap:"wrap", gap:20, justifyContent:"center"}} >
          {products.slice(0,6).map((p) => (
            <LandingPageCategories key={p._id} id={p._id} image={p.imageUrl} />
          ))}
        </View>
        <Spacer height={20} />
        <View style={{flexDirection:"row", flexWrap:"nowrap", padding:10, justifyContent:"center", borderRadius:"50px"}}>
          <ExperienceImage />
        </View>
        <Spacer height={20} />
        <View>
          <Text style={{fontSize:24, fontWeight:"600", paddingLeft:20, marginBottom:10}}>Flash Sale</Text>
          {loading ? (
            <ActivityIndicator style={{padding: 20}} />
          ) : error ? (
            <Text style={{paddingLeft:20, color:'red'}}>{error}</Text>
          ) : (
            <FlashSale products={products.slice(0,10)} />
          )}
        </View>
        <Spacer height={20} />
        <View>
          <KikuuPicks />
        </View>
        <Spacer height={20} />
        <View>
          <Toggler />
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    maxWidth: "100%",
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
