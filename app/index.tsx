import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,Platform  } from "react-native";
import { Link } from "expo-router";
import Spacer from "../components/Spacer"

export default function Page() {
   const [products, setProducts] = useState([]);

  useEffect(() => {
    // Important: localhost is different on Android Emulator
    const BASE_URL =
      Platform.OS === "android"
        ? "http://10.0.2.2:3001" // Android emulator
        : "http://localhost:3001"; // iOS simulator

    fetch(`${BASE_URL}/api/routes/products`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setProducts(data)
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome To StickerSmash</Text>
        <Spacer height={20} />
        <Link href={`/home`}>Home page</Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    maxWidth: 960,
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
