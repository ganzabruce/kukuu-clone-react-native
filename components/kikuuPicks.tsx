import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Spacer from "./Spacer";
import { Image } from "react-native";
const KikuuPicks = () => {
  return (
    <View>
      <Text style={{fontSize:30, marginLeft: 10, fontWeight: "bold"}}>KikuuPicks</Text>
      <Spacer height={10} />
      <View style={styles.container}>
        <View style={[styles.box, styles.colSpan2, { backgroundColor: "red" }]} >
            <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/k-s-oss-1706756584601RJGFM2BY76.jpg?x-oss-process=style/p_list"}} style={{width:"100%", height:"100%", borderRadius:10}} />
        </View>
        <View style={[styles.box, styles.colSpan1, { backgroundColor: "blue" }]} >
            <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/k-s-oss-1717040593848tG6whc6tEG.jpg?x-oss-process=style/p_list"}} style={{width:"100%", height:"100%", borderRadius:10}} />
        </View>
        <View style={[styles.box, styles.colSpan1, { backgroundColor: "green" }]} >
            <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/k-s-oss-1698039889171PrCbbwXYiS.jpg?x-oss-process=style/p_list"}} style={{width:"100%", height:"100%", borderRadius:10}} />
        </View>
        <View style={[styles.box, styles.colSpan1, { backgroundColor: "blue" }]} >
            <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/k-s-oss-1670057818574JMNthxkWhY.jpg?x-oss-process=style/p_list"}} style={{width:"100%", height:"100%", borderRadius:10}} />
        </View>
        <View style={[styles.box, styles.colSpan1, { backgroundColor: "green" }]} >
            <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/k-s-oss-17113533657753NwNTc2DbY.jpg?x-oss-process=style/p_list"}} style={{width:"100%", height:"100%", borderRadius:10}} />
        </View>
        <View style={[styles.box, styles.colSpan1, { backgroundColor: "blue" }]} >
            <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/upload-productImg-28948007908069139.png?x-oss-process=style/p_list"}} style={{width:"100%", height:"100%", borderRadius:10}} />
        </View>
        <View style={[styles.box, styles.colSpan1, { backgroundColor: "green" }]} >
            <Image source={{ uri: "https://global2019-static-cdn.kikuu.com/upload-productImg-8362252640472708.jpg?x-oss-process=style/p_list"}} style={{width:"100%", height:"100%", borderRadius:10}} />
        </View>
        
      </View>
    </View>
  );
};
export default KikuuPicks;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap", 
    gap: 8, 
  },
  box: {
    flexBasis: "100%",
    height: 150,
    borderRadius: 10,
  },
  colSpan1: {
    flexBasis: "48%", 
  },
  colSpan2: {
    flexBasis: "100%", // spans full width (2 columns)
  },
});
