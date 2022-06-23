import { CustomNav } from "../shared-components/CustomNav";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { ButtonCustom } from "../shared-components/ButtonCustom";
import { InputTasty } from "../shared-components/InputTasty";
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { NotificationModal } from '../shared-components/NotificationModal';

export const EditProfile = ({ navigation }) => {

    const [name, setName] = React.useState("");
    const [alias, setAlias] = React.useState("");
    const [user, setUser] = React.useState(null);
    const [isValid, setIsValid] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [image, setImage] = React.useState("");
    const [hasImage, setHasImage] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await SecureStore.getItemAsync("user");
            const data = JSON.parse(userData);
            setUser(data);
            setName(data.name);
            setAlias(data.userName);
            setImage(data.avatar)
        }
        fetchUserData();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const aux = result.uri
            setImage(aux);
            const data = new FormData();
            const getType = aux.split(".");
            const getFileName = aux.split("/");
            data.append('image', {
                uri: aux,
                type: `image/${getType[getType.length - 1]}`,
                name: getFileName[getFileName.length - 1]
            });

            const configImage = {
                method: 'post',
                url: `https://tasty-hub.herokuapp.com/api/user/photo?userId=${user.id}`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: data
            };

            axios(configImage)
                .then((res) => {
                    showModal();
                    setUser({ ...user, avatar: res.data });
                    SecureStore.setItemAsync("user", JSON.stringify({ ...user, avatar: res.data }));
                })
                .catch(e => {
                    console.log(e);
                })
        }


    };


    const handlePress = async () => {

        const res = await axios.delete(`https://tasty-hub.herokuapp.com/api/user/photo?userId=${user.id}`);
        const resf = await axios.get(`https://tasty-hub.herokuapp.com/api/user/${user.id}`);
        SecureStore.setItemAsync("user", JSON.stringify(resf.data));
        setUser(resf.data);
        setImage(resf.data.avatar);

    }

    const showModal = () => {
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
        }, 1500);
    }

    const updateInfo = async () => {



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
            data: changes
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

    return (
        <ScrollView style={styles.mainContainer}>
            <CustomNav text={"Editar Perfil"} callback={() => navigation.goBack()} />
            <NotificationModal
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                onPress={() => setModalVisible(!modalVisible)}
                message={"Su foto de perfil se ha actualizado con éxito!"}
            />
            <View style={styles.mainContent}>
                <TouchableOpacity style={styles.profilePic} onPress={pickImage}>
                    <Image source={{ uri: image }} style={{ width: 130, height: 130, borderRadius: 5000 }} />
                </TouchableOpacity>
                {user.avatar !== "https://res.cloudinary.com/fransiciliano/image/upload/v1656009492/default_avatar.jpg" &&
                    <TouchableOpacity style={styles.deletePic} onPress={handlePress}>
                        <Feather name="x" color="#F26969" size={28} />
                        <Text style={{ fontSize: 16 }}>Eliminar foto</Text>
                    </TouchableOpacity>}
            </View>
            <View>
                <View style={styles.inputs}>
                    <Text style={styles.inputText}>Nombre Completo</Text>
                    <InputTasty isValid={true} onChange={(text) => setName(text)} value={name} errorMessage={"Nao Nao"} />
                    <Text style={{...styles.inputText, marginTop: 10}}>Alias</Text>
                    <InputTasty isValid={isValid} errorMessage={errorMessage} onChange={(text) => handleChangeAlias(text)} value={alias} />
                </View>
                <View style={styles.button}>
                    <ButtonCustom text={"Guardar"} callback={updateInfo} />
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
        marginBottom: Dimensions.get("window").height * 0.05,
        marginTop: 10
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        marginHorizontal: 30,
    },
    button: {
        marginTop: Dimensions.get("window").height * 0.1,
        marginHorizontal: 40,
        marginBottom: '20%'
    },
    inputText: {
        color: "#553900",
        fontFamily: "InterRegular",
        marginLeft: Dimensions.get("window").width * 0.05,
        marginBottom: 10
    }
})