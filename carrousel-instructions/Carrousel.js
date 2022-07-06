import { useEffect, useState, useRef } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import CarrouselMultimedia from "./CarrouselMultimedia";
import { MaterialIcons } from '@expo/vector-icons';

export const Carrousel = ({id}) => {
  const [instructions, setInstructions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatRef = useRef(null);

  const Item = ({ instruction }) => {
    return (

      <View style={{justifyContent: 'center', position: 'relative', width: Dimensions.get("screen").width-10, marginVertical: 15 }}>
        <Text style={{ color: "#553900", fontSize: 29, fontWeight: "900", marginHorizontal: 10 ,alignContent: "flex-start", marginBottom: 20 }}>Paso {instruction.numberOfStep}</Text>
        <Text style={{ color: "#df9c16", fontSize: 29, fontWeight: '700', marginHorizontal: 10 , marginBottom: 20 }}>{instruction.title}</Text>
        <Text style={{ textAlign:'left', fontSize: 22, marginHorizontal: 10 }}>{instruction.description}</Text>
        <CarrouselMultimedia id={instruction.id} />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Item instruction={item} />
  );

  const fetchInstructions = async (idInstruction) => {
    const resp = await fetch(`https://tasty-hub.herokuapp.com/api/instruction/recipe/${idInstruction}`);
    const data = await resp.json();
    data[0].itemNum = 1
    data[data.length - 1].itemNum = 2
    setInstructions(data);
  };

  useEffect(() => {
    fetchInstructions(id);
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={instructions}
        contentContainerStyle={{ alignItems: 'center',justifyContent:"center" }}
        nestedScrollEnabled={true}
        horizontal
        pagingEnabled
        ref={(node) => (flatRef.current = node)}
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
    flexWrap:"wrap",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    backgroundColor: '#E8E8E8',
    borderRadius:10,
    marginHorizontal:5
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