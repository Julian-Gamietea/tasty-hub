import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React from 'react';
import { NotificationModal } from "./NotificationModal";

export const RecipeDashboardCard = ({ image, title, shortDescription, timeToMake, author, id, isFav, userId }) => {

    const [isBookmarked, setIsBookmarked] = React.useState(Boolean(isFav));
    const [rating, setRating] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);
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
            } catch (e) {
                console.log(e);
            }
        }
        getRating();
    }, []);

    if (!loaded) {
        return null;
    }

    const showModal = () => {
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
        }, 1500);
    }

    const handlePress = async () => {
        try {

            if (!isBookmarked) {
                const res = await axios.post(`https://tasty-hub.herokuapp.com/api/favorite?recipeId=${id}&userId=${userId}`)
                setIsBookmarked(true);
                showModal();
            } else {
                const res = await axios.delete(`https://tasty-hub.herokuapp.com/api/favorite/delete?recipeId=${id}&userId=${userId}`)
                setIsBookmarked(false);
                showModal();
            }
        } catch (e) {
            console.log(e);
        }
    }




    let arrayRating = [];
    for (let index = 0; index < rating; index++) {
        arrayRating.push(1);
    }

    return (

        <TouchableOpacity style={styles.container}>
            <NotificationModal 
            visible={modalVisible} 
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            onPress={() => setModalVisible(!modalVisible)}
            message={isBookmarked ? "Receta agregada a Favoritos!" : "Receta eliminada de Favoritos!"}
            />
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.dataContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {shortDescription.length <= 55 && <Text style={styles.description}>{shortDescription}</Text>}
                    {shortDescription.length > 55 && <Text style={styles.description}>{shortDescription.slice(0, 55) + "..."}</Text>}
                </View>
                <View style={styles.authorContainer}>
                    <MaterialIcons name="person" size={18} color="#553900" />
                    <Text style={styles.author}>{author}</Text>
                </View>
            </View>
            <View style={styles.timeAndRatingContainer}>
                <View style={styles.timeAndBookmarkContainer}>
                    <Feather name="clock" size={13} color="#553900" />
                    <Text style={styles.time}>{timeToMake} min</Text>
                    <TouchableOpacity onPress={handlePress}>
                        {isBookmarked && <Ionicons name="bookmark" size={24} color="#553900" />}
                        {!isBookmarked && <Ionicons name="bookmark-outline" size={24} color="#553900" />}
                    </TouchableOpacity>
                </View>
                <View style={styles.ratingContainer}>
                    {
                        arrayRating.map((_, index) => {
                            return (
                                <Feather key={index} name="star" size={20} color="#553900" />
                            );
                        })
                    }
                </View>
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
            fontSize: 14,
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
            fontSize: 12
        },
        ratingContainer: {
            flexDirection: 'row',
            marginBottom: 8,
            marginRight: 5
        },
        timeAndRatingContainer: {
            justifyContent: 'space-between'
        }
    })