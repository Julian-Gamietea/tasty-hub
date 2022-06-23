import axios from "axios";
import React, { useEffect, useState } from "react";
import {  Text,Image, ScrollView, StyleSheet } from "react-native";
import { Video } from 'expo-av';





export const CarrouselMultimedia = ({ id }) => {
  const [multimedia, setMultimedia] = useState([]);

  const video = React.useRef(null);

  const MultimediaVideo= ({ item }) => {
    return(
      <Video 
        source={{uri: item.urlContent}} 
        ref={video}
        useNativeControls
        resizeMode="contain"
        isLooping
        style={{width:340, height: 200, marginLeft: 10, marginTop: 8, borderRadius: 10}}
      />

    )
    
  };

  const MultimediaImage = ({ item,index }) => {
        return(
          <Image
                key={index}
                source={{uri: item.urlContent}}
                style={{width:300, height: 200, marginLeft: 10, marginTop: 8, borderRadius: 10}}
                />  
        )
  };
  const RenderMultimediaItem = ({ item,index }) => {
      if(item.typeContent.includes("image")){        
        return (
          <MultimediaImage item={item} key ={index}/>
        )
      }
      else{
        return(
        <MultimediaVideo key={index} item={item}/>
        )
      }
    };

  const fetchmultimediaInstruction = (idInstruction) => {
    const resp = axios.get(`https://tasty-hub.herokuapp.com/api/multimedia/instruction/${idInstruction}`);
    resp.then((multimediaData) => {
      setMultimedia(multimediaData.data)
    })
  }
  useEffect(() => {
    fetchmultimediaInstruction(id);
  }, []);

  return (

    <ScrollView  horizontal nestedScrollEnabled={true} style={{width: '90%'}}>
      
      {multimedia.map((elem,index) => {
        if(index < multimedia.length){
          return(
            <RenderMultimediaItem
              key={index}
              item={elem}
              />
          )}
        return null
}
)
        }
          
        
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: '#000',
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
export default CarrouselMultimedia