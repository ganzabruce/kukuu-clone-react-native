import { AuthContext } from "@/app/_layout";
import { endpoints } from "@/constants/api";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {ActivityIndicator,Alert,FlatList,Image,RefreshControl,StyleSheet,Text,View,Pressable,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderItem = {
  productId: {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    category: string;
  };
  quantity: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  orderBy: string;
  createdAt: string;
};

export default function MyOrders() {
  const { token } = React.useContext(AuthContext);
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const isLoggedIn = !!token;

  const loadOrders = async (showRefreshIndicator = false) => {
    if (!isLoggedIn) return;
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const res = await fetch(endpoints.orders, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch orders");
      const list: Order[] = data?.orders || [];
      console.log("Fetched Orders:", JSON.stringify(list, null, 2));
      setOrders(list);
    } catch (e) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.center}>
        <Pressable onPress={() => router.push("/auth")} style={styles.loginBtn}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Login to view your orders
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (loading) return <ActivityIndicator style={{ padding: 20 }} />;
  if (error) return <Text style={{ padding: 20, color: "red" }}>{error}</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Pressable style={styles.refreshBtn} onPress={() => loadOrders(true)}>
          <Text style={styles.refreshBtnText}>Refresh</Text>
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 12 }}
        data={orders}
        keyExtractor={(order) => order._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadOrders(true)}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>
              Start shopping to place your first order!
            </Text>
            <Pressable
              style={styles.shopBtn}
              onPress={() => router.push("/(tabs)/home")}
            >
              <Text style={styles.shopBtnText}>Start Shopping</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderDate}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              <Text style={styles.orderTotal}>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.totalPrice)}
              </Text>
            </View>

            {item.items.map((it) => (
              <View key={it.productId._id} style={styles.itemRow}>
                <Image
                  source={{ uri: it.productId.imageUrl }}
                  style={styles.image}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{it.productId.name}</Text>
                  <Text style={styles.category}>{it.productId.category}</Text>
                  <Text style={styles.price}>
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(it.productId.price)}{" "}
                    × {it.quantity}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#333" },
  refreshBtn: { padding: 8 },
  refreshBtnText: { fontSize: 18 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: { fontSize: 14, color: "#999", marginBottom: 20 },
  shopBtn: {
    backgroundColor: "orangered",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopBtnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderDate: { fontSize: 13, color: "#666" },
  orderTotal: { fontSize: 15, fontWeight: "700", color: "orangered" },
  itemRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  image: { width: 60, height: 60, borderRadius: 6, backgroundColor: "#eee" },
  name: { fontSize: 14, fontWeight: "700", marginBottom: 2 },
  category: { fontSize: 12, color: "#666", marginBottom: 2 },
  price: { fontSize: 13, color: "orangered" },
  loginBtn: {
    backgroundColor: "orangered",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
});
