import React from "react";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { CustomNav } from "../shared-components/CustomNav";
import { FlatList, StyleSheet, StatusBar, View, Text, Dimensions } from "react-native";
import { RecipeDashboardCard } from "../shared-components/RecipeDashboardCard";
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import { MyRecipeCard } from "../shared-components/MyRecipeCard";

export const UserRecipes = ({ navigation }) => {

    const [recipes, setRecipes] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const focus = useIsFocused();

    const data = [
        {
            "id": 6,
            "name": "Gofres de Lieja",
            "description": "Plato típico de la capital belga",
            "typeId": 26,
            "dishId": null,
            "ownerId": 13,
            "ownerUserName": "fransici",
            "mainPhoto": "http://res.cloudinary.com/fransiciliano/image/upload/v1655509335/ksmbve5llepg11yupixo.jpg",
            "peopleAmount": 1,
            "portions": 2,
            "duration": 25,
            "timestamp": null,
            "enabled": true
        },
        {
            "id": 7,
            "name": "Menemen Turco",
            "description": "Esta receta de menemen turco, también denominada omelette turco, se utiliza generalmente para desayunos en familia. Es muy peculiar porque se sirve en la misma sartén donde se cocina y cada uno de los comensales escoge su porción. ",
            "typeId": 28,
            "dishId": null,
            "ownerId": 13,
            "ownerUserName": "fransici",
            "mainPhoto": "http://res.cloudinary.com/fransiciliano/image/upload/v1655509529/yng8y9aixxdfjjs7q8kj.jpg",
            "peopleAmount": 3,
            "portions": 9,
            "duration": 13,
            "timestamp": null,
            "enabled": true
        }
    ]
    const [inFavourites, setInFavourites] = React.useState(true);
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await SecureStore.getItemAsync("user");
            setUser(JSON.parse(userData));
        }
        fetchUserData();
    }, []);

    // const onRefresh = () => {
    //     setIsRefreshing(true);
    //     fetchRecipes();
    // }


    // const fetchRecipes = async () => {
    //     try {
    //         const res = await axios.get(`https://tasty-hub.herokuapp.com/api/favorite/${user.id}`);
    //         const recipeIds = res.data.map((elem) => elem.recipeId);
    //         const recipesAux = [];
    //         for (let recipeId of recipeIds) {
    //             const response = await axios.get(`https://tasty-hub.herokuapp.com/api/recipes/${recipeId}`);
    //             recipesAux.push(response.data);
    //         }
    //         setRecipes(recipesAux.slice(0, recipesAux.length));
    //         setIsRefreshing(false);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }    

    // React.useEffect(() => {
    //     fetchRecipes();
    // }, [user, focus, inFavourites]);

    const onGoBack = () => {
        navigation.goBack();
    }

    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf')
    });

    if (!loaded || !user) {
        return null;
    }

    return (
        <View style={styles.mainContainer}>
            <CustomNav text={"Favoritos"} callback={onGoBack} />
            {recipes && <FlatList
                style={styles.list}
                data={data}
                // onRefresh={onRefresh}
                // refreshing={isRefreshing}
                key={item => item.id}
                nestedScrollEnabled={true}
                renderItem={(recipe) => {
                    const elem = recipe.item;
                    return (<MyRecipeCard
                        image={elem.mainPhoto}
                        timeToMake={elem.duration}
                        title={elem.name}
                        id={elem.id}
                    />);
                }}
            />}
            {recipes.length === 0 &&
                <View style={styles.emptyMessage}>
                    <Text style={styles.text}>Aún no tenes recetas marcadas como favoritas...</Text>
                    <Ionicons name="ios-bookmarks-outline" size={80} color="#e8e8e8" />
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: "#fff",
    },
    list: {
        marginTop: 30
    },
    emptyMessage: {
        height: Dimensions.get("screen").height * 0.4,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '40%'
    },
    text: {
        color: "#000",
        fontFamily: "InterSemiBold",
        fontSize: 30,
        textAlign: 'center',

    }
})