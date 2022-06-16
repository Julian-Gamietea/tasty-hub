import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text } from "react-native";
import { View } from "react-native";


const ItemMultimedia = ({ multimedia}) => (
  <View style={{position:"relative",justifyContent:'center',alignItems:'center',height:2}}>
  </View>
    //<View style={{position:"relative",justifyContent:'center'}}>
     // <Image style={{color: "#553900", fontSize: 29,fontWeight: "900",alignContent:"flex-start",marginLeft:"2%",marginBottom:20}}>Paso {instruction.numberOfStep}</Text>
     // <Text style={{color: "#df9c16",fontSize: 29,fontWeight: '700',marginLeft:"2%",marginBottom:20}}>{instruction.title}</Text>
      //<View style={{alignItems:'center',width:Dimensions.get('screen').width}}>
       // <Text style={{fontSize:22,marginHorizontal:5}}>{instruction.description}</Text>
     // </View>
    //</View>
    );
export const Carrousel = ({}) =>{
    const [instructions, setInstructions] = useState({});
    const [multimedia, setMultimedia] = useState({});

    const Item = ({ instruction}) => (
      
      <View style={{position:"relative",justifyContent:'center'}}>
        <Text style={{color: "#553900", fontSize: 29,fontWeight: "900",alignContent:"flex-start",marginLeft:"2%",marginBottom:20}}>Paso {instruction.numberOfStep}</Text>
        <Text style={{color: "#df9c16",fontSize: 29,fontWeight: '700',marginLeft:"2%",marginBottom:20}}>{instruction.title}</Text>
        <View style={{alignItems:'center',width:Dimensions.get('screen').width}}>
          <Text style={{fontSize:22,marginHorizontal:5}}>{instruction.description}</Text>
        </View>
      
      </View>
      );
    const renderItem = ({ item }) => (
        <Item instruction={item}/>
      );
    const RenderMultimedia= ({id}) =>{
      fetchmultimediaInstruction(id)
      
      return(
        <View>
          <FlatList style={{height:'100%'}}
                data={Object.values(multimedia)}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                keyExtractor={item => item.id}
                renderItem={ItemMultimedia}
              />

        </View>
      )
    }
    const fetchInstructions = async () => {
        const resp = await fetch("https://tasty-hub.herokuapp.com/api/instruction/recipe/5");
        const data = await resp.json();
        setInstructions(data);
      };
    const fetchmultimediaInstruction = async (id) =>{
      const resp =  await fetch("https://tasty-hub.herokuapp.com/api/multimedia/instruction/"+{id});
      const data = await  resp.json();
      setMultimedia(data)
      console.log(multimedia)
     
    }
      useEffect(() => {
        fetchInstructions();
      }, []);
      
      
      return (
        <View style={styles.container}>
              <FlatList style={{height:'100%'}}
                data={instructions}
                horizontal
                pagingEnabled
              
                showsHorizontalScrollIndicator={true}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />
  
        </View>
      );
    }

    const styles = StyleSheet.create({
        flatListStyle:{
            alignContent:"center"
            }
        ,container:{
           alignItems:"center",
            justifyContent:"center",
            alignContent:"center",
            flex:1,
            backgroundColor:'#fff'
        },
        text:{
          alignItems:"flex-start",
          justifyContent:"flex-start",
          alignContent:"flex-start",
          fontSize: 20,
        },
        itemContainer:{
          alignItems:"center",
          justifyContent:"center",
          alignContent:"center",
        }
    })   
export default Carrousel