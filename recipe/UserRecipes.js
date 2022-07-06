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
import { Entypo } from '@expo/vector-icons';

export const UserRecipes = ({ navigation }) => {

    const [recipes, setRecipes] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const focus = useIsFocused();
    const [inFavourites, setInFavourites] = React.useState(true);

    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await SecureStore.getItemAsync("user");
            setUser(JSON.parse(userData));
        }
        fetchUserData();
    }, []);


    const fetchRecipes = async () => {
        try {
            const res = await axios.get(`https://tasty-hub.herokuapp.com/api/recipes?ownerId=${user.id}`);
            setRecipes(res.data.slice(0, res.data.length));
            // setIsRefreshing(false);
        } catch (e) {
            console.log(e);
        }
    }    

    React.useEffect(() => {
        fetchRecipes();
    }, [user, focus]);

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
            <CustomNav text={"Mis Recetas"} callback={onGoBack} />
            {recipes && <FlatList
                style={styles.list}
                data={recipes}
                // onRefresh={onRefresh}
                // refreshing={isRefreshing}
                key={item => item.id}
                nestedScrollEnabled={true}
                renderItem={(recipe) => {
                    const elem = recipe.item;
                    return (<MyRecipeCard
                        onPress={() => navigation.navigate("Recipe", {id: elem.id, userId: user.id})}
                        image={elem.mainPhoto}
                        timeToMake={elem.duration}
                        title={elem.name}
                        id={elem.id}
                        // {type: 'edit', recipe: recipe}
                        // onPressEdit={() => navigation.navigate('Recipe')}
                    />);
                }}
            />}
            {recipes.length === 0 &&
                <View style={styles.emptyMessage}>
                    <Text style={styles.text}>Aún no tenes recetas creadas...</Text>
                    <Entypo name="open-book" size={150} color="#e8e8e8" />
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