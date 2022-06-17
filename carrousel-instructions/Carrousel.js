import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import CarrouselMultimedia from "./CarrouselMultimedia";


export const Carrousel = ({ }) => {
  const [instructions, setInstructions] = useState({});

  const Item = ({ instruction }) => {
    return (

      <View style={{ justifyContent: 'center', position: 'relative', width: Dimensions.get("screen").width }}>
        <Text style={{ color: "#553900", fontSize: 29, fontWeight: "900", alignContent: "flex-start", marginLeft: "2%", marginBottom: 20 }}>Paso {instruction.numberOfStep}</Text>
        <Text style={{ color: "#df9c16", fontSize: 29, fontWeight: '700', marginLeft: "2%", marginBottom: 20 }}>{instruction.title}</Text>
        <Text style={{ fontSize: 22, marginHorizontal: 5 }}>{instruction.description}</Text>
        <CarrouselMultimedia id={instruction.id} />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Item instruction={item} />
  );

  const fetchInstructions = async () => {
    const resp = await fetch("https://tasty-hub.herokuapp.com/api/instruction/recipe/5");
    const data = await resp.json();
    setInstructions(data);
  };

  useEffect(() => {
    fetchInstructions();
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={instructions}
        contentContainerStyle={{ alignItems: 'center' }}
        nestedScrollEnabled={true}
        horizontal
        pagingEnabled
        renderItem={renderItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  flatListStyle: {
    alignContent: "center"
  }
  , container: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    fontSize: 20,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  }
})
export default Carrousel