import { View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomNav } from '../shared-components/CustomNav';
import React from 'react';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { InputTasty } from '../shared-components/InputTasty';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { Video } from 'expo-av';
import { DeletableImage } from './DeletableImage';

export const InstructionCreation = ({ navigation }) => {



    const [steps, setSteps] = React.useState([
        {
            numberOfStep: 1,
            description: "",
            recipeId: 4,
            title: ""
        }
    ]);

    const [selectedStep, setSelectedStep] = React.useState({
        numberOfStep: 1,
        description: "",
        recipeId: 4,
        title: "",
        multimedia: [
            {
                uri: "",
                type: "",
                name: ""
            }
        ]
    });

    const handleAddStep = () => {
        const aux = steps.slice();
        aux.push({
            numberOfStep: aux.length + 1,
            description: "",
            recipeId: 4,
            title: "",
            multimedia: [
                {
                    uri: "",
                    type: "",
                    name: ""
                }
            ]
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

    const [loaded] = useFonts({
        InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        InterRegular: require('../assets/fonts/Inter-Regular.ttf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.mainContainer}>
            <CustomNav text={"Agregar Pasos"} />
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
                    <Text style={styles.stepNumber}>Paso {selectedStep.numberOfStep}</Text>
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
                    <View>
                        <Text style={styles.InputText}>Multimedia</Text>
                        <TouchableOpacity style={styles.addMultimedia}>
                            <MaterialIcons name="add-a-photo" size={24} color="white" />
                            <Text style={styles.addMultimediaText}>Añadir</Text>
                        </TouchableOpacity>
                        <ScrollView style={{flexDirection: 'row', marginTop: 5}} horizontal>
                            <DeletableImage/>
                            <DeletableImage/>
                            <DeletableImage/>
                            <DeletableImage/>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <View style={{marginHorizontal: 80, marginBottom: 80, marginTop: 10}}>
                <ButtonCustom text={"Finalizar"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height
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
        marginBottom: 30,
        marginTop: 15
    },
    InputText: {
        fontFamily: "InterRegular",
        color: "#553900",
        fontSize: 18,
        marginBottom: 5
    },
    dataContainer: {
        marginHorizontal: 30,
    }
})