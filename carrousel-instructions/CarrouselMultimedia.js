import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, Image, ScrollView, StyleSheet, View } from "react-native";
import { Video } from 'expo-av';

export const CarrouselMultimedia = ({ id, multimediaSaved }) => {
  const [multimedia, setMultimedia] = useState([]);
  const video = React.useRef(null);
  const MultimediaVideo = ({ item }) => {
    if(multimediaSaved.length!=0){
      return (
        <Video
          source={{ uri: item}}
          ref={video}
          useNativeControls
          resizeMode="contain"
          isLooping
          style={{ width: 340, height: 200, marginLeft: 10, marginTop: 8, borderRadius: 10, alignSelf: 'center' }}
        />

      )
    }else{
      return (
        <Video
          source={{ uri: item.urlContent }}
          ref={video}
          useNativeControls
          resizeMode="contain"
          isLooping
          style={{ width: 340, height: 200, marginLeft: 10, marginTop: 8, borderRadius: 10, alignSelf: 'center' }}
        />
  
      )
    }


  };

  const MultimediaImage = ({ item, index }) => {
    if(multimediaSaved.length!=0){
      return(
      <Image
        key={index}
        source={{ uri: item}}
        style={{ width: 300, height: 200, marginLeft: 10, marginTop: 8, borderRadius: 10, alignSelf: 'center' }}
      />)
    }
    else{
      return (
        <Image
          key={index}
          source={{ uri: item.urlContent }}
          style={{ width: 300, height: 200, marginLeft: 10, marginTop: 8, borderRadius: 10, alignSelf: 'center' }}
        />
      )
  }
  };

  const RenderMultimediaItem = ({ item, index }) => {
    console.log(item)
    if(multimediaSaved.length != 0){
      if(isVideo(item)){
        return (
          <MultimediaVideo  item={item} />
        )
      }
      else{
        return (
          <MultimediaImage item={item}  />
        )
      }  
    }else{
      if (item.typeContent.includes("image")) {
        return (
          <MultimediaImage item={item}  />
        )
      }
      else {
        return (
          <MultimediaVideo  item={item} />
        )
    }

  }}
  const isVideo = (multimedia)=>{
    const multimediaParsed = multimedia.split(".")
    if(multimediaParsed[3]=="mp4"){
      return true
    }
    else{
      false
    }
  }
  const fetchmultimediaInstruction = (idInstruction) => {
    if(multimediaSaved.length==0){
      const resp = axios.get(`https://tasty-hub.herokuapp.com/api/multimedia/instruction/${idInstruction}`);
      resp.then((multimediaData) => {
        setMultimedia(multimediaData.data)
      })
    }else{
      setMultimedia(multimediaSaved)
    }
    
  }
  useEffect(() => {
    fetchmultimediaInstruction(id);
  }, []);

  return (
    <ScrollView nestedScrollEnabled={true} style={{ width: '100%', maxHeight: 220 }}>
      {multimedia.map((elem, index) => {
        console.log(elem)
          return (
            <RenderMultimediaItem
              key={index}
              item={elem}
            />
          )
        }
       
      
      )
      }
    </ScrollView>

  );
}


export default CarrouselMultimedia