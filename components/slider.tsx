import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  "https://global2019-static-cdn.kikuu.com/kikuu-static-image-pc-banner-new.jpg",
  "https://global2019-static-cdn.kikuu.com/kikuu-static-image-pc-banner-hot.jpg",
  "https://global2019-static-cdn.kikuu.com/kikuu-static-image-pc-banner-hot.jpg",
]; 

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput placeholder="Language" style={[styles.input,{ width: "250%"}]} />
        <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/Rwanda-circle.png" }} style={{ width: 30, height: 30, marginLeft: 10, marginTop: 5 }} />
      </View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: images[0] }} style={styles.image} />
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.trackRow}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    position: "relative",
  },
  inputRow: {
    marginBottom: 12,
    marginTop: 10,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  image: {
    width: width,
    height: 200,
    resizeMode: "cover",
  },
  trackRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "orange",
    width: 10,
    height: 10,
  },
});
