import React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { CustomNav } from "../shared-components/CustomNav";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export const Profile = ({ navigation }) => {

    const [user, setUser] = React.useState(null);
    const [userRating, setUserRating] = React.useState(1);
    const [userRecipeCount, setUserRecipeCount] = React.useState(0);
    const focused = useIsFocused();
    
    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await SecureStore.getItemAsync("user");
            setUser(JSON.parse(userData));
        }
        fetchUserData();
    }, [focused]);

    React.useEffect(() => {
        const fetchUserRating = async () => {
            try {
                const res = await axios.get(`https://tasty-hub.herokuapp.com/api/rating/user/${user.id}`)
                setUserRating(res.data);
            } catch (e) {
                console.log("not yet rated")
            }
        }

        const fetcheUserRecipeCount = async () => {
            try {
                const res = await axios.get(`https://tasty-hub.herokuapp.com/api/recipes/count/${user.id}`);
                setUserRecipeCount(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchUserRating();
        fetcheUserRecipeCount();
    }, [user])


    const [loaded] = useFonts({
        InterBlack: require('../assets/fonts/Inter-Black.ttf'),
        InterLight: require('../assets/fonts/Inter-Light.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
        InterMedium: require('../assets/fonts/Inter-Medium.ttf')
    });

    if (!loaded || !user) {
        return null;
    }

    return (
        <View style={styles.mainContainer}>
            <CustomNav text={"Mi Perfil"} callback={() => navigation.goBack()} />
            <View style={styles.profileInfo}>
                <View style={styles.userData}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.username}>@{user.userName}</Text>
                    <View>
                        <Text style={styles.text}>Ha creado {userRecipeCount} recetas</Text>
                        <View style={styles.rating}>
                            <Text style={styles.text}>Calificacion: {isNaN(userRating) && "Sin calificaciones"}</Text>
                            {userRating > 0 && <Feather name="star" color="#553900" size={24} />}
                            {userRating > 1 && <Feather name="star" color="#553900" size={24} />}
                            {userRating > 2 && <Feather name="star" color="#553900" size={24} />}
                            {userRating > 3 && <Feather name="star" color="#553900" size={24} />}
                            {userRating > 4 && <Feather name="star" color="#553900" size={24} />}
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate("EditProfile")}>
                        <Text style={styles.textButton}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.profilePic}>
                    <Image source={{uri: user.avatar}} style={{ width: 130, height: 130, borderRadius: 5000 }}/>
                </View>
            </View>
            <View style={styles.buttons}>
                <View style={styles.myRecipes}>
                    <Text style={styles.bigButtonText}>Mis recetas</Text>
                    <TouchableOpacity style={styles.bigButton} onPress={() => navigation.navigate("UserRecipes")}>
                        <View style={styles.buttonIcon}>
                            <MaterialIcons name="restaurant" size={80} color="#553900" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.saved}>
                    <Text style={styles.bigButtonText}>Guardados</Text>
                    <TouchableOpacity style={styles.bigButton}>
                        <View style={styles.buttonIcon}>
                            <Feather name="download" size={80} color="#553900" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: '#fff',
        flex: 1,
    },
    profileInfo: {
        justifyContent: 'space-between',
        backgroundColor: "#F3E7BA",
        flexDirection: 'row',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 15
    },
    myRecipes: {
        // alignSelf: 'center'
    },
    bigButton: {
        backgroundColor: "#F3E7BA",
        minHeight: 120,
        maxWidth: 120,
        minWidth: 120,
        borderRadius: 40
    },
    saved: {

    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    userData: {
        justifyContent: 'space-evenly',
    },
    profilePic: {
        margin: 10,
        backgroundColor: "#fff",
        maxWidth: 170,
        maxHeight: 170,
        borderRadius: 50000,
        padding: 10
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
        marginBottom: 10
    },
    text: {
        color: "#553900"
    },
    textButton: {
        color: "#553900",
        textAlign: 'center',
        fontFamily: "InterRegular",
        fontSize: 14
    },
    editProfileButton: {
        backgroundColor: '#F3A200',
        borderRadius: 8,
        minHeight: 46,
        maxWidth: 158,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
    buttonIcon: {
        marginTop: 20,
        alignSelf: 'center',
    },
    bigButtonText: {
        textAlign: 'center',
        color: "#553900",
        fontFamily: "InterSemiBold",
        fontSize: 18
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})