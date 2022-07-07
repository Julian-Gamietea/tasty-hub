import { useEffect, useState, useRef } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import CarrouselMultimedia from "./CarrouselMultimedia";

export const Carrousel = ({id, multimediaSaved, instructionsSaved}) => {
  const [instructions, setInstructions] = useState({});
  const flatRef = useRef(null);

    const Item = ({ instruction,index }) => {
    const multimediaByIndex = getMultimediaByIndex(index)
    return (
      <View style={styles.carrouselContainer}>
        <Text style={styles.step}>Paso {instruction.numberOfStep}</Text>
        <Text style={styles.title}>{instruction.title}</Text>
        <Text style={styles.description}>{instruction.description}</Text>
        <View style={styles.multimedia}>
          <CarrouselMultimedia id={instruction.id} multimediaSaved={multimediaByIndex} />
        </View>
      </View>
    );
  }

  const renderItem = ({ item,index }) => (
    <Item instruction={item} index={index} />
  )

  const fetchInstructions = async (idRecipe) => {
    if(instructionsSaved.length == 0){
      const resp = await fetch(`https://tasty-hub.herokuapp.com/api/instruction/recipe/${idRecipe}`);
      const data = await resp.json();
      setInstructions(data);
      //console.log("entre")
    }else{
      setInstructions(instructionsSaved)
    }
    
  };

  useEffect(() => {
    fetchInstructions(id);
  },[]);

  const getMultimediaByIndex= (index) =>{
    const auxArray = new Array()
    multimediaSaved.map((elem) =>{ elem.map((multimedia)  =>  {
          const multimediaSplit=multimedia.split("/")
          if(multimediaSplit[11].charAt(multimediaSplit[11].length-1)==index){
            auxArray.push(multimedia)
          }
        })
      }
    )
    return auxArray
  }
  //console.log(instructions)
  return (
    <View style={styles.container}>
      <FlatList
        data={instructions}
        contentContainerStyle={{ alignItems: 'center',justifyContent:"center" }}
        nestedScrollEnabled={true}
        horizontal
        pagingEnabled
        ref={(node) => (flatRef.current = node)}
        renderItem={(item,index)=>renderItem(item,index)}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexWrap:"wrap",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    backgroundColor: '#E8E8E8',
    borderRadius:10,
    marginHorizontal:5
  },
  carrouselContainer:{
    height: '90%',
    width:Dimensions.get('screen').width-25
  },
  step:{
    flex:1,
    color: "#553900", 
    fontSize: 29, 
    fontWeight: "900",
    marginHorizontal: 15,
  },
  title:{
    flex:1,
    color: "#df9c16", 
    fontSize: 29, 
    fontWeight: '700',
    marginHorizontal: 15,
    
  },
  description:{
    textAlign:'left', 
    fontSize: 22,
    marginHorizontal: 15,
    height: 105
  },
  multimedia: {
    flex: 4,
    marginRight: 5
  }
})
export default Carrousel