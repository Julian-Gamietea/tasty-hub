import { CustomNav } from "../shared-components/CustomNav";
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native'; 
import { Feather } from "@expo/vector-icons";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { InputTasty } from "../shared-components/InputTasty";
import { useFonts } from 'expo-font';


export const EditProfile = ({ navigation }) => {

    const [name, setName] = React.useState("Franco Siciliano");
    const [alias, setAlias] = React.useState("fransici");

    const [loaded] = useFonts({
        InterBlack: require('../assets/fonts/Inter-Black.ttf'),
        InterLight: require('../assets/fonts/Inter-Light.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
        InterMedium: require('../assets/fonts/Inter-Medium.ttf')
    });

    if (!loaded) {
        return null;
    }

    return(
        <View style={styles.mainContainer}>
            <CustomNav text={"Editar Perfil"} callback={() => navigation.goBack()}/>
           
                <View style={styles.mainContent}>
                    <View style={styles.profilePic}>
                        <Image source={{uri: "https://i.pinimg.com/originals/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"}} style={{ width: 130, height: 130, borderRadius: 5000 }}/>
                    </View>
                    <TouchableOpacity style={styles.deletePic}>
                        <Feather name="x" color="#F26969" size={28} />
                        <Text style={{fontSize: 16}}>Eliminar foto</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.inputs}>
                        <Text style={styles.inputText}>Nombre Completo</Text>
                        <InputTasty isValid={true} value={name} errorMessage={"Nao Nao"}/>
                        <Text style={styles.inputText}>Alias</Text>
                        <InputTasty isValid={true} value={alias} errorMessage={"Nao Nao"}/>
                    </View>
                    <View style={styles.button}>
                        <ButtonCustom text={"Guardar"} />
                    </View>
                </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight + 5
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