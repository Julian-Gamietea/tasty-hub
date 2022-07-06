import { useEffect, useState, useRef } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import CarrouselMultimedia from "./CarrouselMultimedia";
import { MaterialIcons } from '@expo/vector-icons';

export const Carrousel = ({id, multimediaSaved, instructionsSaved}) => {
  const [instructions, setInstructions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatRef = useRef(null);

  const Item = ({ instruction, multimedia }) => {
    return (

      <View style={{justifyContent: 'center', position: 'relative', width: Dimensions.get("screen").width-10, marginVertical: 15 }}>
        <Text style={{ color: "#553900", fontSize: 29, fontWeight: "900", marginHorizontal: 10 ,alignContent: "flex-start", marginBottom: 20 }}>Paso {instruction.numberOfStep}</Text>
        <Text style={{ color: "#df9c16", fontSize: 29, fontWeight: '700', marginHorizontal: 10 , marginBottom: 20 }}>{instruction.title}</Text>
        <Text style={{ textAlign:'left', fontSize: 22, marginHorizontal: 10 }}>{instruction.description}</Text>
        <CarrouselMultimedia id={instruction.id} multimediaSaved={multimedia} />
      </View>
    );
  }

  const renderItem = ({ item, multimediaSaved }) => (
    <Item instruction={item} multimedia={multimediaSaved} />
  );

  const fetchInstructions = async (idRecipe) => {
    if(!multimediaSaved && !instructionsSaved){
      const resp = await fetch(`https://tasty-hub.herokuapp.com/api/instruction/recipe/${idRecipe}`);
      const data = await resp.json();
      setInstructions(data);
    }else{
      setInstructions(instructionsSaved)
    }
    
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
        renderItem={(item, index)=>renderItem(item, multimediaSaved[index])}
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