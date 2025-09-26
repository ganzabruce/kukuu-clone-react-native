import { endpoints } from '@/constants/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
type Product = { _id: string; name: string; description: string; imageUrl: string; price: number; category: string };
type SectionItem = { id: string; name: string; image: string };
type Section = { title: string; items: SectionItem[] };
type MainCategory = { id: string; name: string; sections: Section[] };
interface CategorySidebarProps{
  categories: MainCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}
const CategorySidebar = ({categories,activeCategoryId,onSelectCategory,}:CategorySidebarProps) => (
  <View style={styles.sidebar}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.sidebarItem,
            activeCategoryId === category.id && styles.sidebarItemActive,
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <Text
            style={[
              styles.sidebarItemText,
              activeCategoryId === category.id && styles.sidebarItemTextActive,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const CategoryContent = ({ category }: { category: MainCategory }) => {
  const router = useRouter();
  return (
    <View style={styles.contentContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {category.sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => router.push(`/category/${encodeURIComponent(section.title)}` as any)}
                activeOpacity={0.7}
              >
                <Text style={styles.seeAllText}>All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.grid}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.gridItem}
                  onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: item.image }} style={styles.gridItemImage} />
                  <Text numberOfLines={2} style={styles.gridItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};



const Category = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(endpoints.products);
        const data = await res.json();
        const list = Array.isArray(data?.products) ? (data.products as Product[]) : [];
        setProducts(list);
      } catch (e) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const byCategory = new Map<string, Product[]>();
    for (const p of products) {
      const key = p.category || 'Others';
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key)!.push(p);
    }
    const built: MainCategory[] = Array.from(byCategory.entries()).map(([catName, items]) => ({
      id: catName,
      name: catName,
      sections: [
        { title: catName, items: items.slice(0, 12).map((it) => ({ id: it._id, name: it.name, image: it.imageUrl })) },
      ],
    }));
    setCategories(built);
    if (built.length && !activeCategoryId) setActiveCategoryId(built[0].id);
  }, [products]);

  const activeCategory = useMemo(
    () => categories.find((cat) => cat.id === activeCategoryId) || categories[0],
    [categories, activeCategoryId]
  );
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
       <View style={styles.header}>
         <View style={styles.searchContainer}>
           <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
           <TextInput
             style={styles.searchInput}
             placeholder="Search"
             placeholderTextColor="#888"
           />
         </View>
         <TouchableOpacity style={styles.chatIconContainer}>
           <Ionicons name="chatbox-ellipses-outline" size={24} color="#555" />
         </TouchableOpacity>
      </View>
      <View style={styles.main}>
        {categories.length > 0 && (
          <>
            <CategorySidebar
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelectCategory={setActiveCategoryId}
            />
            {activeCategory && <CategoryContent category={activeCategory} />}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0, 
    backgroundColor: '#fff',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  chatIconContainer: {
    padding: 5,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f7f7f7', // Background for sidebar
  },
  // Sidebar Styles
  sidebar: {
    width: 100,
    backgroundColor: '#f7f7f7',
    borderRightWidth: 1,
    borderRightColor: '#eee', // Lighter border
  },
  sidebarItem: {
    paddingVertical: 15, // Adjusted padding
    alignItems: 'center',
    justifyContent: 'center',
    // Removed bottom border as per image
  },
  sidebarItemActive: {
    backgroundColor: '#fff',
    borderLeftWidth: 4, // Thicker left border
    borderLeftColor: 'orangered', // Orange color from image
  },
  sidebarItemText: {
    fontSize: 13,
    color: '#333',
    fontWeight: 'normal', // Ensure normal weight by default
  },
  sidebarItemTextActive: {
    fontWeight: 'bold',
    color: 'orangered',
  },
  // Content Styles
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10, // Slightly reduced padding
    paddingVertical: 10,
    backgroundColor: '#fff', // White background for content
  },
  section: {
    marginBottom: 20, // More space between sections
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15, // More space below header
  },
  sectionTitle: {
    fontSize: 16, // Larger title
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    // Optional: Add a subtle border or background if "All" is a button
  },
  seeAllText: {
    fontSize: 13, // Slightly larger text
    color: '#888',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align to start for more natural spacing
    // No spaceBetween to allow individual item margins
  },
  gridItem: {
    width: '30%', // For a 3-column grid
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: '1.66%', // Distribute space evenly (100 - 30*3)/2
  },
  gridItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8, // Slightly rounded corners
    marginBottom: 8,
    resizeMode: 'contain', // Ensure images fit within bounds
  },
  gridItemText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },
});