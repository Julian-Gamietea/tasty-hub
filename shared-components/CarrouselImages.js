import {
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as React from "react";

export const CarrouselImages = ({recipeImages}) => {
  const [state, setState] = React.useState({
    active:0
  })
//   

//   const images = [
//     "https://elpais.com/elpais/2019/10/30/album/1572424649_614672.html",
//     "https://neliosoftware.com/es/blog/imagenes-gratuitas-para-tu-blog/",
//   ];

  const change = ({nativeEvent}) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide != state.active){
        setState({active:slide})
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          horizontal
          onScroll={(nativeEvent)=>change(nativeEvent)}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {recipeImages.map((item, index) => {
            return (
              <Image key={index} source={{ uri: item }} style={styles.image} />
            );
          })}
        </ScrollView>
        <View style={styles.dotContainer}>
          {recipeImages.map((i, k) => {
            return (
              <Text key={k} style={k == state.active ? styles.dotActive : styles.dot}>
                {" "}
                ●{" "}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  image: {
    width: Dimensions.get("window").width,
    height: 400,
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  dot: {
    color: "#888",
    fontSize: 24,
    margin: 3
  },
  dotActive: {
    color: "#fff",
    fontSize: 24,
    margin: 3
  },
});
