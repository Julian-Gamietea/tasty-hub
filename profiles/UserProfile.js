import React from "react";
import { StatusBar, StyleSheet, View, Text, Image, Dimensions, FlatList } from "react-native";
import { RecipeDashboardCard } from "../shared-components/RecipeDashboardCard";
import { Profiler } from "react/cjs/react.production.min";
import { CustomNav } from "../shared-components/CustomNav";
import { StarRating } from 'react-native-star-rating';
import { useFonts } from 'expo-font'
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export const UserProfile = ({route, navigation}) => {


    const {id} = route.params;
    const [user, setUser] = React.useState(null);
    const [recipes, setRecipes] = React.useState(null);
    const [userRating, setUserRating] = React.useState(0);
    const [loggedUser, setLoggedUser] = React.useState({});
    const [loaded] = useFonts({
        InterBlack: require('../assets/fonts/Inter-Black.ttf'),
        InterLight: require('../assets/fonts/Inter-Light.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
        InterMedium: require('../assets/fonts/Inter-Medium.ttf')
    });

    React.useEffect(() => {
        const fetchLoggedUserData = async () => {
            const userData = await SecureStore.getItemAsync("user");
            setLoggedUser(JSON.parse(userData));
        }
        fetchLoggedUserData();
    }, []);

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`https://tasty-hub.herokuapp.com/api/user/${id}`);
                setUser(res.data);

                const resr = await axios.get(`https://tasty-hub.herokuapp.com/api/rating/user/${id}`)
                setUserRating(resr.data);
            } catch (e) {
                console.log("u: " + e);
            }
        }
    
        const fetchRecipes = async () => {
            try {
                const res = await axios.get(`https://tasty-hub.herokuapp.com/api/recipes?ownerId=${id}`);
                setRecipes(res.data);
            } catch (e) {
                console.log("r: " + e);
            }
        }
        fetchUserData();
        fetchRecipes();
    },[])
    
    
    if (!loaded || user === null || recipes === null) {
        return null;
    }
    return (
        <View style={styles.mainContainer}>
            <CustomNav text={"Perfil"} callback={() => navigation.goBack()} />
            <View style={styles.profileInfo}>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.username}>@{user.userName}</Text>
                    <Text style={styles.userData}>Ha creado {recipes.length} recetas</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.userRating}>Promedio</Text>
                        {userRating > 0 && <Feather name="star" size={20} color="#553900" />}
                        {userRating > 1 && <Feather name="star" size={20} color="#553900" />}
                        {userRating > 2 && <Feather name="star" size={20} color="#553900" />}
                        {userRating > 3 && <Feather name="star" size={20} color="#553900" />}
                        {userRating > 4 && <Feather name="star" size={20} color="#553900" />}
                    </View>
                </View>
                <View style={styles.photoContainer}>
                    <Image source={{ uri: user.avatar }} style={{ width: 100, height: 100, borderRadius: 5000 }} />
                </View>
            </View>
                {loggedUser && <FlatList
                // onRefresh={onRefresh}
                // refreshing={isFetching}
                data={recipes}
                // style={{...styles.recipesContainer}}
                nestedScrollEnabled={true}
                key={item => item.id}
                renderItem={(recipe) => {
                    const elem = recipe.item;
                    return (<RecipeDashboardCard
                        key={elem.id}
                        // onPress={() => navigation.navigate('Recipe', { id: elem.id, userId: user.id })}
                        id={elem.id}
                        title={elem.name}
                        author={elem.ownerUserName}
                        image={elem.mainPhoto}
                        shortDescription={elem.description}
                        timeToMake={elem.duration}
                        userId={loggedUser.id}
                        isFav={false}
                    />);
                }}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: "#fff",
        
    },
    photoContainer: {
        margin: 10,
        backgroundColor: "#fff",
        maxWidth: 120,
        maxHeight: 120,
        borderRadius: 50000,
        padding: 10
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: Dimensions.get("screen").height * 0.20,
        backgroundColor: '#F3E7BA',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 50
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontFamily: "InterBlack",
        fontSize: 26,
        color: "#553900"
    },
    username: {
        fontFamily: "InterSemiBold",
        fontSize: 14,
        color: "#553900",
        marginBottom: 25
    },
    userData: {
        fontFamily: "InterRegular",
        fontSize: 13,
        marginBottom: 10,
        color: "#553900"
    },
    userRating: {
        fontFamily: "InterRegular",
        fontSize: 13,
        marginRight: 10,
        color: "#553900"
    }
})