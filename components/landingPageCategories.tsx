import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
// const image = "https://i.pinimg.com/736x/7e/f1/2c/7ef12cdad4207411ae6425e28b9b4795.jpg"
interface Props{
    image: string;
    id: string;
}

const LandingPageCategories = ({image, id}:Props) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/product/[id]', params: { id } })}
      style={styles.container}
    >
      <Image source={{ uri: image}} style={styles.image} />
    </Pressable>
  )
}

export default LandingPageCategories

const styles = StyleSheet.create({
    container:{
        borderRadius:"50%",
        width:"27%",
        display: "flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center",
        height:100,
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:"50%",
    }
})