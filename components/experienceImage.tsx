import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const ExperienceImage = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/k-s-oss-1754561729897SReHn2fYAW.jpg"}} style={styles.image} />
    </View>
  )
}
export default ExperienceImage

const styles = StyleSheet.create({
    container:{
        borderRadius:"50%",
        width:"100%",
        display: "flex",
        justifyContent:"center",
        alignItems:"center",
        height:100,
        backgroundColor:"red",
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:50,
    }
})
