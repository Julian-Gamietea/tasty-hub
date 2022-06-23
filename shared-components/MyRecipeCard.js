import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React from 'react';
import { NotificationModal } from "./NotificationModal";
import { useIsFocused } from "@react-navigation/native";

export const MyRecipeCard = ({ onPress, image, title, timeToMake, id }) => {


    const [rating, setRating] = React.useState(0);
    const focus = useIsFocused();

    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf')
    });

    React.useEffect(() => {
        const getRating = async () => {
            try {
                const res = await axios.get(`https://tasty-hub.herokuapp.com/api/rating/average/${id}`);
                setRating(parseInt(res.data));
                setIsLoading(false);
                const resf = await axios.get(`https://tasty-hub.herokuapp.com/api/favorite/isfavourite?recipeId=${id}&userId=${userId}`);
                setIsBookmarked(Boolean(resf.data));
            } catch (e) {
                console.log(e);
            }
        }
        getRating();
    }, [focus]);

    if (!loaded) {
        return null;
    }


    let arrayRating = [];
    for (let index = 0; index < 5; index++) {
        arrayRating.push(1);
    }

    return (

        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.dataContainer}>
                <View style={styles.textContainer}>
                    <View style={styles.ratingContainer}>
                        {
                            arrayRating.map((_, index) => {
                                return (
                                    <Feather key={index} name="star" size={20} color="#553900" />
                                );
                            })
                        }
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
            <View style={styles.timeAndRatingContainer}>
                <View style={styles.timeAndBookmarkContainer}>
                    <Feather name="clock" size={15} color="#553900" />
                    <Text style={styles.time}>{timeToMake} min</Text>
                </View>
                <TouchableOpacity style={{marginBottom: 15, marginLeft: 20}} onPress={() => console.log("Edit Button Pressed")}>
                    <MaterialIcons name="edit" color="#5D420C" size={35} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#E0D9CA',
            flexDirection: "row",
            borderRadius: 10,
            marginHorizontal: 10,
            marginBottom: 5,
            minHeight: 100
        },
        image: {
            width: '25%',
            height: '100%',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            resizeMode: "cover"
        },
        title: {
            fontSize: 20,
            fontFamily: "InterSemiBold",
            color: '#553900',
            marginLeft: 5,
            marginTop: 8
        },
        description: {
            fontFamily: "InterRegular",
            fontSize: 12,
            color: '#553900',

            marginLeft: 5
        },
        dataContainer: {
            flex: 1,
            flexWrap: 'wrap',

        },
        author: {
            fontFamily: "InterRegular",
            fontSize: 11,
            color: '#553900',

        },
        authorContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginLeft: 4,
            marginBottom: '3%'

        },
        bookmarkIcon: {
            width: 24,
            height: 24
        },
        timeAndBookmarkContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 8,
            marginRight: 5
        },
        textContainer: {
            flexDirection: 'column',
        },
        time: {
            color: "#553900",
            marginLeft: 2,
            marginRight: 8,
            fontFamily: "InterRegular",
            fontSize: 14
        },
        ratingContainer: {
            flexDirection: 'row',
            marginTop: 5,
            marginLeft: 3
        },
        timeAndRatingContainer: {
            justifyContent: 'space-between'
        }
    })