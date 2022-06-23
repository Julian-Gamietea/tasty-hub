import { CustomNav } from "../shared-components/CustomNav";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native'; 
import { Feather } from "@expo/vector-icons";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { InputTasty } from "../shared-components/InputTasty";
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

export const EditProfile = ({ navigation }) => {

    const [name, setName] = React.useState("");
    const [alias, setAlias] = React.useState("");
    const [user, setUser] = React.useState(null);
    const [isValid, setIsValid] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await SecureStore.getItemAsync("user");
            const data = JSON.parse(userData);
            setUser(data);
            setName(data.name);
            setAlias(data.userName);
        }
        fetchUserData();
    }, []);

    const handlePress = async () => {
        const res = await axios.delete(`https://tasty-hub.herokuapp.com/api/user/photo?userId=${user.id}`);
        console.log("Profile Pic Deleted");
        const resf = await axios.get(`https://tasty-hub.herokuapp.com/api/user/${user.id}`);
        SecureStore.setItemAsync("user", JSON.stringify(resf.data));
        setUser(resf.data);
    }

    const updateInfo = () => {
        const changes = {
            id: user.id,
            name: name,
            userName: alias
        }

        let config = {
            method: 'put',
            url: 'https://tasty-hub.herokuapp.com/api/user/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : changes
          };
        
          axios(config)
          .then(res => {
            setUser(res.data);
            setAlias(changes.userName);
            setName(changes.name);
            SecureStore.setItemAsync("user", JSON.stringify(res.data));
            navigation.navigate("ProfileUpdate");
          })
          .catch((e) => {
            console.log(e)
            setIsValid(false);
            setErrorMessage("El Alias ya se encuentra en uso. Seleccione otro");
          })
    }

    const handleChangeAlias = (text) => {
        console.log(text);
        setAlias(text);
        setIsValid(true);
    }

    const [loaded] = useFonts({
        InterBlack: require('../assets/fonts/Inter-Black.ttf'),
        InterLight: require('../assets/fonts/Inter-Light.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
        InterMedium: require('../assets/fonts/Inter-Medium.ttf')
    });

    if (!loaded || !user) {
        return null;
    }

    return(
        <ScrollView style={styles.mainContainer}>
            <CustomNav text={"Editar Perfil"} callback={() => navigation.goBack()}/>
           
                <View style={styles.mainContent}>
                    <View style={styles.profilePic}>
                        <Image source={{uri: user.avatar}} style={{ width: 130, height: 130, borderRadius: 5000 }}/>
                    </View>
                    <TouchableOpacity style={styles.deletePic} onPress={handlePress}>
                        <Feather name="x" color="#F26969" size={28} />
                        <Text style={{fontSize: 16}}>Eliminar foto</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.inputs}>
                        <Text style={styles.inputText}>Nombre Completo</Text>
                        <InputTasty isValid={true} onChange={(text) => setName(text)} value={name} errorMessage={"Nao Nao"}/>
                        <Text style={styles.inputText}>Alias</Text>
                        <InputTasty isValid={isValid} errorMessage={errorMessage} onChange={(text) => handleChangeAlias(text)} value={alias}/>
                    </View>
                    <View style={styles.button}>
                        <ButtonCustom text={"Guardar"} callback={updateInfo}/>
                    </View>
                </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight + 5,
        
    },
    mainContent: {
        alignItems: 'center',
        marginBottom: Dimensions.get("window").height * 0.05
    },
    profilePic: {
        margin: 10,
        backgroundColor: "#FFA552",
        maxWidth: 170,
        maxHeight: 170,
        borderRadius: 50000,
        padding: 10
    },
    deletePic: {
        flexDirection:'row',
        alignItems: 'center'
    },
    inputs: {
        marginHorizontal: 30,
    },
    button: {
        marginTop: Dimensions.get("window").height * 0.1,
        marginHorizontal: 40
    },
    inputText: {
        color: "#553900",
        fontFamily: "InterRegular",
        marginLeft: Dimensions.get("window").width * 0.05,
        marginBottom: 10
    }
})