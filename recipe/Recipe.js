import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import {useFonts} from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from "@expo/vector-icons";
import StarRating from 'react-native-star-rating';
import * as React from 'react';
import { InputTasty } from "../shared-components/InputTasty";
import axios from "axios";
import { NotificationModal } from "../shared-components/NotificationModal";
import {Carrousel} from "../carrousel-instructions/Carrousel"

export const Recipe = ({route,navigation}) => {

    React.useEffect(() => {
        const fetchData = () => {
            var axios = require('axios');
            var config = {
            method: 'get',
            url: `https://tasty-hub.herokuapp.com/api/recipes/${id}`,
            headers: { }
            };

            axios(config)
            .then(function (response) {

                // SETTING THE RECIPE INFORMATION 

                setDatos(response.data)
                const id = response.data.id
                var config2 = {
                    method: 'get',
                    url: `https://tasty-hub.herokuapp.com/api/ingredientQuantity?recipeId=${id}`,
                    headers: { }
                };
    
                axios(config2)
                .then((response) => {
                    setIngredientes(response.data)
                    var config3 = {
                        method: 'get',
                        url: `https://tasty-hub.herokuapp.com/api/rating/average/${id}`,
                        headers: { }
                        };
                        
                        axios(config3)
                        .then(function (response) {

                            // SETTING THE RECIPE RATING

                            if(!isNaN(response.data)){
                                setStarCount2(response.data)
                            }
                        
                        })
                        .catch(function (error) {
                        console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error)
                }) 
            })
            .catch(function (error) {
                console.log(error);
            }); 
            
            //ASKING IF THE RECIPE IS ALREADY ADDED TO FAVORITES

            axios.get(`https://tasty-hub.herokuapp.com/api/favorite/${userId}`)
            .then((response)=>{
                const favorites = response.data;
                favorites.forEach(element => {
                    console.log(element)
                    if(element.recipeId === id){
                        setAddedFavorites(true)
                    }
                });
            })
              
        }
        fetchData();
    },[starCount]);

    const userId = 11
    //const {id} = route.params;
    const id = 5;
    const [datos, setDatos] = React.useState([])
    const [ingredientes, setIngredientes] = React.useState([])
    const [comments, setComments] = React.useState("")
    const [modalVisible, setModalVisible] = React.useState(false);
    const [starCount, setStarCount] = React.useState(0);
    const [starCount2, setStarCount2] = React.useState(0);
    const [addedFavorites, setAddedFavorites] = React.useState(false)
    const [notificationText, setNotificationText] = React.useState("")
    const [notification, setNotification] = React.useState(false)
    const [saved, setSaved] = React.useState(false) 
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

    const onStarRatingPress = (rating) => {
        setStarCount(rating)
    }

    const enviar = () => {
        setModalVisible(true)
    }

    const closeModalSend = () => {
        
        var axios = require('axios');
        var data = JSON.stringify({
        "comments": comments,
        "rating": starCount,
        "recipeId": id,
        "userId": userId
        });

        var config = {
        method: 'post',
        url: 'https://tasty-hub.herokuapp.com/api/rating',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function () {
            setModalVisible(!modalVisible)
            setComments("");
            setStarCount(0)       
        })
        .catch(function (error) {
            console.log(error);
        });

        
    }

    const closeModalNoSend = () => {
        setModalVisible(!modalVisible)
        setStarCount(0)
    }

    const addFavorites = () => {
        if(!addedFavorites){
            axios.post(`https://tasty-hub.herokuapp.com/api/favorite?recipeId=${id}&userId=${userId}`)
            .then(()=>{
                setAddedFavorites(true)    
                showNotification()
            })
            .catch((error)=>{
                console.log(error)
            })
        }else{
            axios.delete(`https://tasty-hub.herokuapp.com/api/favorite/delete?recipeId=${id}&userId=${userId}`)
            .then(()=>{
                setAddedFavorites(false)
                showNotification()
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    
    }

    const showNotification = () => {
        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 1500);
    }

    

    const save = () => {
        if (!saved){
            setSaved(true)
        }else{
            setSaved(false)
        }
    }
    console.log(datos)
    return(
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> {datos.name} </Text>
                <View style={styles.ratings}>
                    <StarRating
                        disabled={true}
                        emptyStar={'star'}
                        fullStar={'star'}
                        halfStar={'star'}
                        iconSet={'Feather'}
                        maxStars={starCount2}
                        rating={starCount2}
                        fullStarColor={'#553900'}
                        starSize={26}
                        halfStarEnabled={true}
                    />
                </View>
               
            </View>
            <View style={styles.profile}>
                <MaterialIcons name="person" size={24} color="#5D420C" />
                <Text style={styles.profileName}> {datos.ownerUserName} </Text> 
                <TouchableOpacity style={styles.profileButton}>
                    <MaterialIcons name="portrait" size={24} color="white" />
                    <Text style={styles.buttonText}> Ver perfil</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <View style={styles.infoItem1}>
                    <View style={{flexDirection:'row', marginBottom: 5}}>
                        <MaterialIcons name="group" size={24} color="#5D420C" />
                        <Text style={styles.infoText}> {datos.peopleAmount} personas </Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Feather name="pie-chart" size={24} color="#5D420C" />
                        <Text style={styles.infoText}> {datos.portions} porciones </Text>
                    </View>  
                </View>
                <View style={styles.infoItem2}>
                    <Feather name="clock" size={24} color="#5D420C" />
                    <Text style={styles.infoText}> {datos.duration} min </Text>
                </View>
            </View>
            
            <View style={styles.buttons}>
                <TouchableOpacity onPress={()=> addFavorites()} style={styles.favouritesButton}>
                    {addedFavorites
                        ? <Ionicons name="bookmark" size={24} color="#fff" /> 
                        : <Ionicons name="bookmark-outline" size={24} color="#fff" />
                    }
                        <Text style={styles.buttonText}> Añadir a {'\n'} favoritos </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> save()}  style={styles.profileButton}>
                    {saved
                        ? <Ionicons name="download" size={24} color="white" /> 
                        : <Ionicons name="download-outline" size={24} color="white" />
                    }
                    <Text style={styles.buttonText}> Guardar </Text>
                </TouchableOpacity>
            </View>
            <Image source={{uri:datos.mainPhoto}} style={styles.image} />

            <View style={styles.descriptionContainer}>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8}}>
                    <MaterialIcons name="info" size={24} color="#5D420C" />
                    <Text style={styles.descriptionTitle} > Descripción </Text>
                </View>
                <Text style={styles.descripcionContent}> {datos.description}</Text>
            </View>

            <View style={styles.descriptionContainer}>
                <View style={{flexDirection: 'row', alignItems:'center', marginBottom: 8}}>
                    <MaterialIcons name="restaurant" size={24} color="#5D420C" />
                    <Text style={styles.descriptionTitle}> Ingredientes </Text> 
                </View>
                <View style={{flexDirection:'column'}}>
                    {ingredientes.map((element, index) => {
                        return( <Text key={index} style={styles.ingredientItemText}> - {element.quantity} {element.unitName} de {element.ingredientName} </Text>);
                       
                    })
                    }
                    
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
                    <Carrousel id={id}/>
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
                        <View> 
                            <Text style={styles.modalText}>¿Desea dejar algun comentario a la receta?</Text>
                            <InputTasty
                                placeholder = 'Ingrese aqui (opcional)'
                                value =  {comments}
                                onChange={(text) => setComments(text)}
                                isValid = {true}   
                            />
                            <View style={{flexDirection: 'row', justifyContent:'center', backgroundColor: '#fff'}}> 
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => closeModalSend()}
                                >
                                <Text style={styles.textStyle}>Continuar</Text>
                                </Pressable>
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => closeModalNoSend()}
                                >
                                <Text style={styles.textStyle}>Volver</Text>
                                </Pressable>
                            </View>
                            
                        </View>
                    </View>
                </View>
            </Modal>
            

            <NotificationModal
                visible={notification}
                onRequestClose={()=>setNotification(!notification)}
                onPress={()=>setNotification(!notification)}
                message={addedFavorites ? "Receta agregada a Favoritos!" : "Receta eliminada de Favoritos!"}
            />
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
        marginLeft:10,
        marginRight: 10,
        width: 100,
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
