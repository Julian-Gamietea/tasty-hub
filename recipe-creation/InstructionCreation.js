import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Dimensions, Image, Modal, Pressable, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomNav } from '../shared-components/CustomNav';
import React from 'react';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { InputTasty } from '../shared-components/InputTasty';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import axios from 'axios';
import { AddMultimediaForm } from '../shared-components/AddMultimediaForm';
import * as NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const InstructionCreation = ({ navigation, route }) => {

    const {recipe} = route.params;
    const [networkType, setNetworkType] = React.useState('');
    const [networkModalVisible, setNetworkModalVisible] = React.useState(false);
    const unsuscribe = React.useRef(null);
    const [modalShown, setModalShown] = React.useState(route.params.modalShown);
    const [isUploading, setIsUploading] = React.useState(false);
    const [recipeId, setRecipeId] = React.useState(recipe.id);
    const instructions = [
        {
            numberOfStep: 1,
            description: "",
            recipeId: recipeId,
            title: "",
            multimedia: []
        }
    ]

    const [errors, setErrors] = React.useState([]);

    const [modalVisible, setModalVisible] = React.useState(false);

    const [ErrorModalVisible, setErrorModalVisible] = React.useState(false);

    const [steps, setSteps] = React.useState(instructions);

    const [selectedStep, setSelectedStep] = React.useState(instructions[0]);

    React.useEffect(() => {
        unsuscribe.current = NetInfo.addEventListener(state => {
            if (state.type === 'cellular' && !modalShown) {
                setNetworkModalVisible(true);
                setModalShown(true);
            }
            setNetworkType(state.type);
        })
        return unsuscribe.current;
    }, [modalShown])

    const handleAddStep = () => {
        const aux = steps.slice();
        aux.push({
            numberOfStep: aux.length + 1,
            description: "",
            recipeId: recipeId,
            title: "",
            multimedia: []
        })
        setSteps(aux);
    }

    const handleSelectStep = (numberOfStep) => {
        const aux = steps.filter((step) => (step.numberOfStep === numberOfStep));
        setSelectedStep(aux[0]);
    }

    const handleTitleChange = (text) => {
        setSelectedStep({
            ...selectedStep,
            title: text,
        })

        const aux = steps.slice(0, steps.length);
        aux[selectedStep.numberOfStep - 1] = {
            ...selectedStep,
            title: text,
        }
        setSteps(aux);

    }

    const handleDescriptionChange = (text) => {
        setSelectedStep({
            ...selectedStep,
            description: text,
        })

        const aux = steps.slice(0, steps.length);
        aux[selectedStep.numberOfStep - 1] = {
            ...selectedStep,
            description: text,
        }
        setSteps(aux);
    }

    const handleDelete = () => {
        const stepNum = selectedStep.numberOfStep
        const aux = steps.slice(0, steps.length);
        if (steps.length - 1 > stepNum - 1) {
            for (let i = steps.length - 1; i > stepNum - 1; i--) {
                aux[i].numberOfStep -= 1;
            }
            aux.splice(selectedStep.numberOfStep - 1, 1);

            if (aux.length > 1) {
                setSelectedStep(aux[stepNum - 1]);
            } else {
                setSelectedStep(aux[0]);
            }
        } else {
            aux.pop();
            setSelectedStep(aux[aux.length - 1])
        }
        setSteps(aux);
    }

    const addVideo = async () => {
        setModalVisible(false);

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });

        if (!result.cancelled) {

            const aux = selectedStep;
            const getFileName = result.uri.split("/");
            const getExtension = result.uri.split(".");
            let thumbnail = null;
            try {
                const { uri } = await VideoThumbnails.getThumbnailAsync(
                    result.uri
                    , { quality: .5, time: 3000 });
                thumbnail = uri;
            } catch (e) {
                console.log(e);
            }

            aux.multimedia.push(
                {
                    uri: result.uri,
                    type: 'video/' + getExtension[getExtension.length - 1],
                    name: getFileName[getFileName.length - 1],
                    thumbnailUri: thumbnail
                }
            )

            const stepsAux = steps.slice(0, steps.length);

            setSelectedStep(aux);
            setSteps(stepsAux);
        }

    }

    const addPhoto = async () => {
        setModalVisible(false);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            const aux = selectedStep;
            const getFileName = result.uri.split("/");
            const getExtension = result.uri.split(".");
            aux.multimedia.push(
                {
                    uri: result.uri,
                    type: 'image/' + getExtension[getExtension.length - 1],
                    name: getFileName[getFileName.length - 1]
                }
            )

            const stepsAux = steps.slice(0, steps.length);

            setSteps(stepsAux);
            setSelectedStep(aux);
        }

    }

    const handleMultimedia = () => {
        setModalVisible(true);
    }

    const removeMultimedia = (index) => {
        const aux = selectedStep;
        aux.multimedia.splice(index, 1);
        const stepsAux = steps.slice(0, steps.length);
        const indexSS = stepsAux.indexOf(selectedStep);
        stepsAux[indexSS] = aux;
        setSelectedStep(aux);
        setSteps(stepsAux);

    }

    const hasErrors = () => {
        const aux = errors.slice(0, errors.length);
        for (let step of steps) {
            
            if (step.title === "") {
                aux.push(`El paso ${step.numberOfStep} no contiene título`);
            }

            if (step.description === "") {
                aux.push(`El paso ${step.numberOfStep} no contiene una descripción`);
            }
        }
        if (aux.length > 0) {
            setErrors(aux);
            setErrorModalVisible(true);
            return true;
        } else {
            return false;
        }


    }

    const upload = async () => {
        setIsUploading(true);
        if (!hasErrors() && networkType !== 'cellular') {

            const auxRecipe = {
                description: recipe.description,
                duration: recipe.duration,
                enabled: false,
                name: recipe.name,
                ownerId: recipe.ownerId,
                peopleAmount: recipe.peopleAmount,
                portions: recipe.portions,
                typeId: recipe.typeId,
            }

            let recipeData = null;

            if (recipe.id !== 0) {
                auxRecipe.id = recipe.id;
                await overwriteOldRecipe(recipe.id);
                recipeData = await axios.put(`https://tasty-hub.herokuapp.com/api/recipes`, auxRecipe);
            } else {
                recipeData = await axios.post(`https://tasty-hub.herokuapp.com/api/recipes`, auxRecipe);
            }
            
            const fdi = new FormData();
            for (let image of recipe.images) {
                fdi.append('images', image);
            }
    
            try {
                const imageData = await axios.post(`https://tasty-hub.herokuapp.com/api/recipePhotos?recipeId=${recipeData.data.id}`, fdi,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            } catch (e) {
                console.log(e);
            }
    
            let qtyAux = {};
            for (let qty of recipe.ingredientQty) {
    
                qtyAux = {
                    recipeId: recipeData.data.id,
                    ingredientId: qty.ingredientId,
                    unitId: qty.unitId,
                    quantity: qty.quantity,
                    observations: "",
                }
    
                try {
                    const iq = await axios.post(`https://tasty-hub.herokuapp.com/api/ingredientQuantity`, qtyAux);
                } catch (e) {
                    console.log(e);
                }
            }
    
            for (let step of steps) {
                try {
    
                    const res = await axios.post(`https://tasty-hub.herokuapp.com/api/instruction`,
                        {
                            description: step.description,
                            numberOfStep: step.numberOfStep,
                            recipeId: recipeData.data.id,
                            title: step.title,
                        });
    
                    const instructionId = res.data.id;
    
                    console.log(step.multimedia);
                    const fd = new FormData();
                    for (let multim of step.multimedia) {
                        const aux = {
                            uri: multim.uri,
                            type: multim.type,
                            name: multim.name
                        }
                        fd.append('multimedia', aux);
                    }
    
                    var config = {
                        method: 'post',
                        url: `https://tasty-hub.herokuapp.com/api/multimedia?instructionId=${instructionId}`,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        data: fd
                    };
    
                    await axios(config);
                    
                    
                } catch (e) {
                    console.log(e);
                }
            }
            setIsUploading(false);
            unsuscribe.current();
            navigation.navigate('SuccessNormal');
        }
        else if (!hasErrors() && networkType === 'cellular') {

            if (recipe.id === 0) {

                const auxRecipe = {
                    description: recipe.description,
                    duration: recipe.duration,
                    enabled: false,
                    name: recipe.name,
                    ownerId: recipe.ownerId,
                    peopleAmount: recipe.peopleAmount,
                    portions: recipe.portions,
                    typeId: recipe.typeId,
                    images: recipe.images,
                    ingredientQty: recipe.ingredientQty,
                    steps: steps
                }

                try {
                    const res = await AsyncStorage.getItem(`user_${recipe.ownerId}_upload_queue`);
                    let data = null
                    if (res === null) {
                        data = {
                            queue: [auxRecipe]
                        }
                    } else {
                        data = JSON.parse(res);
                        data.queue.push(auxRecipe);
                    }
                    await AsyncStorage.setItem(`user_${recipe.ownerId}_upload_queue`, JSON.stringify(data));
                    console.log(data.queue);
                } catch (e) {
                    console.log(e);
                }

            } else {
                const auxRecipe = {
                    id: recipe.id,
                    description: recipe.description,
                    duration: recipe.duration,
                    enabled: false,
                    name: recipe.name,
                    ownerId: recipe.ownerId,
                    peopleAmount: recipe.peopleAmount,
                    portions: recipe.portions,
                    typeId: recipe.typeId,
                    images: recipe.images,
                    ingredientQty: recipe.ingredientQty,
                    steps: steps
                }

                try {
                    const res = await AsyncStorage.getItem(`user_${recipe.ownerId}_overwrite_queue`);
                    let data = null
                    if (res === null) {
                        data = {
                            queue: [auxRecipe]
                        }
                    } else {
                        data = JSON.parse(res);
                        data.queue.push(auxRecipe);
                    }
                    await AsyncStorage.setItem(`user_${recipe.ownerId}_overwrite_queue`, JSON.stringify(data));
                    console.log(data.queue);
                } catch (e) {
                    console.log(e);
                }
            }

            setIsUploading(false);
            navigation.navigate("StoredRecipeSuccess");
        }
        else {
            setIsUploading(false);
        }
    }

    const overwriteOldRecipe = async (id) => {
        const url = 'https://tasty-hub.herokuapp.com/api'
		//BORRAR FOTOS
		await axios.delete(`${url}/recipePhotos/deleteall/${id}`);
        //BORRAR FOTO PRINCIPAL
        await axios.delete(`${url}/recipes/mainphoto/${id}`);
		//BORRAR MULTIMEDIA
        await axios.delete(`${url}/multimedia/deleteall/${id}`);
		//BORRAR INGQ
        await axios.delete(`${url}/ingredientQuantity?recipeId=${id}`);
		//BORRAR INSTRUCCIONES
        await axios.delete(`${url}/instruction?recipeId=${id}`);
	}

    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.mainContainer}>
            <Modal
				animationType="slide"
				transparent={true}
				visible={ErrorModalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setErrorModalVisible(!ErrorModalVisible);
				}}
			>
				<View style={styles.centeredViewError}>
					<View style={styles.modalViewError}>
						<Text style={styles.modalTextError}>No puede avanzar debido a los siguientes problemas:</Text>
						{errors.map((errormsg, index) => (
							<Text key={index} style={{textAlign: 'center', marginBottom: 15}}>{index + 1}. {errormsg}</Text>
						))}
						<Pressable
							style={[styles.buttonError, styles.buttonCloseError]}
							onPress={() => {
								setErrorModalVisible(!ErrorModalVisible);
								setErrors([]);
							}}
						>
							<Text style={styles.textStyleError}>Entendido</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={networkModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setNetworkModalVisible(!networkModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Se detectó que ya no se encuentra en una red sin cargo.Continuar con esta red puede generar costos adicionales.{'\n'}¿Desea continuar?</Text>
                        <Text style={{textAlign: 'center', marginBottom: 15}}>(La receta no se subirá hasta que se disponga de una red sin cargo)</Text>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose, {marginRight: 10}]}
                                onPress={() => {
                                    setNetworkModalVisible(!networkModalVisible);
                                    navigation.navigate('WelcomeScreen');
                                }}
                            >
                                <Text style={styles.textStyle}>Descartar receta</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setNetworkModalVisible(!networkModalVisible);
                                    setErrors([]);
                                }}
                            >
                                <Text style={styles.textStyle}>Continuar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Que desa subir?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 150 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    addPhoto();
                                }}
                            >
                                <Text style={styles.textStyle}>Foto</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    addVideo();
                                }}
                            >
                                <Text style={styles.textStyle}>Video</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <CustomNav text={"Agregar Pasos"} callback={() => navigation.goBack()} />
            <ScrollView>

                <ScrollView style={styles.stepsContainer} horizontal showsHorizontalScrollIndicator={false}>
                    {steps.map((step, index) => (
                        <TouchableOpacity style={selectedStep.numberOfStep === step.numberOfStep ? styles.selectedStepButton : styles.stepButton} onPress={() => handleSelectStep(step.numberOfStep)} key={step.numberOfStep}>
                            <Text style={selectedStep.numberOfStep === step.numberOfStep ? styles.selectedStepText : styles.stepText}>Paso {step.numberOfStep}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={{ ...styles.stepButton, marginRight: 15 }} onPress={handleAddStep}>
                        <MaterialIcons name="add" size={50} color="#553900" />
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView nestedScrollEnabled={true} style={styles.dataScroll}>
                    <View style={styles.dataContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 30 }}>
                            <Text style={styles.stepNumber}>Paso {selectedStep.numberOfStep}</Text>
                            {selectedStep.numberOfStep !== 1 &&
                                <TouchableOpacity style={styles.deleteStepBtn} onPress={handleDelete}>
                                    <Text style={styles.deleteText}>Eliminar Paso</Text>
                                </TouchableOpacity>}
                        </View>
                        <View>
                            <View>
                                <Text style={styles.InputText}>Título</Text>
                                <InputTasty
                                    style={styles.input}
                                    value={selectedStep.title}
                                    onChange={(text) => handleTitleChange(text)}
                                />
                            </View>
                            <View>
                                <Text style={styles.InputText}>Descripción</Text>
                                <InputTasty
                                    style={styles.descriptionInput}
                                    value={selectedStep.description}
                                    onChange={(text) => handleDescriptionChange(text)}
                                    multiline
                                />
                            </View>
                        </View>
                        <AddMultimediaForm
                            title={"Multimedia"}
                            onPress={handleMultimedia}
                            data={selectedStep.multimedia}
                            onRemove={removeMultimedia}
                        />
                    </View>
                    {!isUploading && <View style={{ marginHorizontal: 80, marginBottom: 15, marginTop: 10 }}>
                        <ButtonCustom text={"Finalizar"} callback={upload} />
                    </View>}
                    {isUploading && 
                    <View style={{ marginHorizontal: 80, marginBottom: 15, marginTop: 10 }}>
                        <TouchableOpacity style={styles.spinner}>
                            <ActivityIndicator color={"#553900"} />
                        </TouchableOpacity>
                    </View>}
                </ScrollView>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: "#fff",
        flex: 1
    },
    stepButton: {
        backgroundColor: "#D1CBBE",
        borderRadius: 20,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginVertical: 15
    },
    stepsContainer: {
        flexDirection: 'row'
    },
    addMultimedia: {
        backgroundColor: "#F3A200",
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 110,
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    addMultimediaText: {
        color: "#fff",
        fontFamily: "InterSemiBold",
        fontSize: 18
    },
    input: {
        backgroundColor: "rgba(235, 235, 235, 0)",
        borderRadius: 30,
        borderColor: "#312102",
        borderWidth: 1,
        fontFamily: "",
        fontSize: 16,
        padding: 15,
        textAlign: "left",
        // marginHorizontal: 20

    },
    descriptionInput: {
        backgroundColor: "rgba(235, 235, 235, 0)",
        borderRadius: 30,
        borderColor: "#312102",
        borderWidth: 1,
        fontFamily: "",
        fontSize: 16,
        padding: 15,
        textAlign: "left",
        height: 150,
        textAlignVertical: 'top',
        // marginHorizontal: 20
    },
    selectedStepButton: {
        backgroundColor: "#4C3605",
        borderRadius: 20,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 15
    },
    stepText: {
        fontFamily: "InterRegular",
        fontSize: 20,
        color: "#553900"
    },
    selectedStepText: {
        fontFamily: "InterSemiBold",
        fontSize: 20,
        color: "#fff"
    },
    stepNumber: {
        fontFamily: "InterSemiBold",
        fontSize: 30,
        color: "#553900",

    },
    InputText: {
        fontFamily: "InterRegular",
        color: "#553900",
        fontSize: 18,
        marginBottom: 5
    },
    dataContainer: {
        marginHorizontal: 30,
    },
    deleteStepBtn: {
        backgroundColor: "#ED5E5E",
        borderRadius: 8,
        height: 32,
        width: 118,
        justifyContent: 'center'
    },
    deleteText: {
        color: "#fff",
        fontFamily: "InterSemiBold",
        fontSize: 15,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        // width: 70,

    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#F3A200",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    spinner: { 
        elevation: 8,
        backgroundColor: "#F3A200",
        borderRadius: 15,
        padding: 15
    },
    centeredViewError: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalViewError: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	buttonError: {
		borderRadius: 5,
		padding: 10,
		paddingHorizontal: 20
	},
	buttonOpenError: {
		backgroundColor: "#F194FF",
	},
	buttonCloseError: {
		backgroundColor: "#F3A200",
	},
	textStyleError: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalTextError: {
		marginBottom: 15,
		textAlign: "center",
		fontFamily: 'InterSemiBold'
	}
})