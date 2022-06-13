import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import {useFonts} from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from "@expo/vector-icons";
import { Rating } from 'react-native-ratings';
import salad from "../assets/saladpic.png"
import StarRating from 'react-native-star-rating';
import * as React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { InputTasty } from "../shared-components/InputTasty";

export const Recipe = () => {
    const [comments, setComments] = React.useState("")
    const [modalVisible, setModalVisible] = React.useState(false);
    const [starCount, setStarCount] = React.useState(0);
    const [loaded] = useFonts({
        InterBlack: require ('../assets/fonts/Inter-Black.ttf'),
        InterLight: require ('../assets/fonts/Inter-Light.ttf'),
        InterRegular: require ('../assets/fonts/Inter-Regular.ttf'),
        InterMedium: require ('../assets/fonts/Inter-Medium.ttf')
    });
    if(!loaded){
        return null;
    }
    const rating = 5;
    
    let arrayRating = [];
    for (let index = 0; index < rating; index++) {
        arrayRating.push(1);
    }

    const onStarRatingPress = (rating) => {
        setStarCount(rating)
    }

    const enviar = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(!modalVisible)
        setComments("");
    }
    return(
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>  Ensalada César </Text>
                <View style={styles.ratings}>
                {
                    arrayRating.map((_, index) => {
                        return (
                            <Feather key={index} name="star" size={20} color="#553900" />
                        );
                    })
                }
                </View>
               
            </View>
            <View style={styles.profile}>
                <MaterialIcons name="person" size={24} color="#5D420C" />
                <Text style={styles.profileName}> GermanMartitegui </Text> 
                <TouchableOpacity style={styles.profileButton}>
                    <MaterialIcons name="portrait" size={24} color="white" />
                    <Text style={styles.buttonText}> Ver perfil</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem1}>
                    <View style={{flexDirection:'row', marginBottom: 5}}>
                        <MaterialIcons name="group" size={24} color="#5D420C" />
                        <Text style={styles.infoText}> 2 personas </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Feather name="pie-chart" size={24} color="#5D420C" />
                        <Text style={styles.infoText}> 4 porciones </Text>
                    </View>  
                </View>
                <View style={styles.infoItem2}>
                    <Feather name="clock" size={24} color="#5D420C" />
                    <Text style={styles.infoText}> 4 min </Text>
                </View>
            </View>
            
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.favouritesButton}>
                        {/* <Ionicons name="bookmark" size={24} color="#fff" /> */}
                        <Ionicons name="bookmark-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}> Añadir a {'\n'} favoritos </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton}>
                    {/* <Ionicons name="download" size={24} color="black" /> */}
                    <Ionicons name="download-outline" size={24} color="white" />
                    <Text style={styles.buttonText}> Guardar </Text>
                </TouchableOpacity>
            </View>
            <Image source={salad} style={styles.image} />

            <View style={styles.descriptionContainer}>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8}}>
                    <MaterialIcons name="info" size={24} color="#5D420C" />
                    <Text style={styles.descriptionTitle} > Descripción </Text>
                </View>
                <Text style={styles.descripcionContent}>Ensalada césar que contiene pollo, tomate, lechuga, palta,
                remolacha y choclo, condimentada con aceite y jugo de 2 limones </Text>
            </View>

            <View style={styles.descriptionContainer}>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8}}>
                    <MaterialIcons name="restaurant" size={24} color="#5D420C" />
                    <Text style={styles.descriptionTitle}> Ingredientes </Text> 
                </View>
                <View style={{flexDirection:'column'}}>
                    <Text style={styles.ingredientItemText}> - 1 Tomate </Text>
                    <Text style={styles.ingredientItemText}> - 2 Huevos </Text>
                    <Text style={styles.ingredientItemText}> - 100g Lechuga </Text>
                </View>
               
            </View>
            
            <View style={styles.recalculateContainer}>
                <Text style={styles.recalculateText}>¿Necesitas {'\n'} otras {'\n'} proporciones {'\n'} de esta receta? </Text>
                <TouchableOpacity style={styles.profileButton}>
                    <Text style={styles.buttonTextRecalculate}>Recalcular {'\n'} receta</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.instructionContainer}>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8, marginLeft: 25}}>
                    <MaterialIcons name="menu-book" size={24} color="#5D420C"/>
                    <Text style={styles.descriptionTitle}>  Instrucciones </Text>
                </View>
                <View style={styles.instructionGreyContainer}>
                    {/* aca va el carrousel */}
                </View>
            </View>

            <View styles={styles.descriptionContainer}>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8, marginLeft: 25}}> 
                    <MaterialIcons name="military-tech" size={24} color="#5D420C" />
                    <Text style={styles.descriptionTitle}> Calificar </Text>
                </View>
                <Text style={styles.calificationText}>¿Cómo calificarías esta receta?</Text>
                <View style={styles.starsContainer}>
                    <StarRating
                        disabled={false}
                        emptyStar={'star-fill'}
                        fullStar={'star-fill'}
                        halfStar={'star-fill'}
                        iconSet={'Octicons'}
                        maxStars={5}
                        rating={starCount}
                        selectedStar={(rating) => onStarRatingPress(rating)}
                        fullStarColor={'#967127'}
                        emptyStarColor={'#EFD87B'}
                        starSize={52}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={()=> enviar()}>
                    <Text style={styles.buttonTextSend}>Enviar</Text>
                </TouchableOpacity>
            </View>

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
                        <Text style={styles.modalText}>¿Desea dejar algun comentario a la receta?</Text>
                        <InputTasty
                            placeholder = 'Ingrese aqui (opcional)'
                            value =  {comments}
                            onChange={(text) => setComments(text)}
                            isValid = {true}   
                        />
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => closeModal()}
                        >
                        <Text style={styles.textStyle}>Continuar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    titleContainer:{
        flex: 1,
        marginTop: 60,
    },
    title:{
        fontFamily: 'InterBlack',
        fontSize: 27,
        textAlign: 'center',
        marginBottom: 5,
        color: '#553900'
    },
    ratings:{
        flexDirection: 'row',
        justifyContent: 'center'
    },



    profile:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        marginLeft: 25,
        marginTop: 20
    },
    profileName:{
        fontFamily: 'InterMedium',
        fontSize: 16,
        marginRight: 20,
        color: '#553900'
    },
    profileButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#5D420C',
        height: 45,
        width: 120,
        borderRadius: 20
    },
    buttonText: {
        color: '#fff',
        fontFamily:'InterMedium',
        fontSize: 14
    },



    info:{
        flex: 1,
        marginTop: 20,
        marginLeft: 25,
        marginRight: 35,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoText:{
        fontFamily: 'InterRegular',
        color: '#553900'  
    },
    infoItem1:{
        flexDirection: 'column'
    },
    infoItem2:{
        flexDirection: 'row'
    },


    buttons:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 15
    },
    favouritesButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#5D420C',
        height: 45,
        width: 120,
        borderRadius: 20,
        marginLeft: 25,
        marginRight: 10
        
    },

    image:{
        marginTop: 30,
        width: 400,
        height: 400
    },

    descriptionContainer:{
        flex: 1,
        marginLeft: 25,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20

    },

    descripcionContent:{
        color: '#553900',
        fontFamily: 'InterLight',
        fontSize: 18
    },

    descriptionTitle:{
        fontFamily: 'InterMedium',
        fontSize: 24,
        color: '#553900'
    },



    ingredientItemText:{
        fontFamily: 'InterLight',
        fontSize: 18,
        color: '#553900',
        
    },

    recalculateContainer:{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 35,
        marginTop: 10,
        alignItems:'center',
        justifyContent: 'space-between'
    },
    recalculateText:{
        fontFamily: 'InterMedium',
        fontSize: 18,
        color: '#553900',
    },
    buttonTextRecalculate:{
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'InterMedium'
    },

    instructionContainer:{
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        
    },

    instructionGreyContainer:{
        flex:1,
        marginTop: 10,
        backgroundColor: '#E8E8E8',
        borderRadius: 20,
        height: 475,
    },

    calificationText:{
        textAlign: 'center',
        fontFamily: 'InterLight',
        fontSize: 18,
        color: "#553900"
    },

    starsContainer:{
        width: 300,
        alignSelf:'center',
        marginTop: 15,
    },

    sendButton:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#5D420C',
        height: 45,
        width: 120,
        borderRadius: 20,
        alignSelf:'center',
        marginTop: 20,
        marginBottom: 30
    },

    buttonTextSend:{
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'InterBlack',
        fontSize: 23,
        
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
        borderRadius: 18,
        padding: 10,
        elevation: 2,
        backgroundColor:'#5D420C' 
      },
      
      buttonClose: {
        marginTop: 20,
        backgroundColor: '#5D420C',
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'InterLight',
        fontSize: 20
      }
   


})
