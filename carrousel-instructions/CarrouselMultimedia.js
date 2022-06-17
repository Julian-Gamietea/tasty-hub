import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";


const MultimediaItem = ({ item }) => {

  return (
    <Image style={{ flex: 1 }} source={{ uri: item.urlContent }} />
  )
};

export const CarrouselMultimedia = ({ id }) => {

  const [multimedia, setMultimedia] = useState([]);

  const renderMultimediaItem = ({ item }) => {
    return (
      <MultimediaItem item={item} />
    )
  };

  const fetchmultimediaInstruction = (idInstruction) => {
    const resp = axios.get(`https://tasty-hub.herokuapp.com/api/multimedia/instruction/${idInstruction}`);
    resp.then((multimediaData) => {
      setMultimedia(multimediaData.data)
    }).catch((e) => {
    })
  }
  useEffect(() => {
    fetchmultimediaInstruction(id);
  }, []);

  console.log("Renderizamos la flatlist fachera facherita")
  return (

    <ScrollView  horizontal nestedScrollEnabled={true} style={{width: '90%'}}>
      {multimedia.map((elem, index) => {
        return (<Image
        key={index}
        source={{uri: elem.urlContent}}
        style={{width:300, height: 200, marginLeft: 10, marginTop: 8, borderRadius: 10}}
        />  )
      })}
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