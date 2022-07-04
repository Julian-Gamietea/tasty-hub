import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet, TextInput } from 'react-native';
import chart from '../assets/recalculate-recipe/chart.png';
import { InputTasty } from '../shared-components/InputTasty';

export const Portions = ({userId,recipeId,navigation}) => {
    const [portionsQty, setPortionsQty ] = useState();
	const [recipe ,setRecipe] = useState([]);
	const [isValid, setIsValid] = useState(true)
	const [errorMsg, setErrorMsg] = useState('')

	const recalculateRecipeByPortions =  async () => {
		if(portionsQty <= 0){
			setIsValid(false)
			setErrorMsg('La cantidad debe ser mayor o igual a 1')
		}else{
			setIsValid(true)
			setErrorMsg('')
			var conversionFactor = portionsQty/recipe.portions
			await axios.get(`https://tasty-hub.herokuapp.com/api/recipes/convert?recipeId=${recipe.id}&conversionFactor=${conversionFactor}`)
			.then((ingredientQuantityList)=>{
				navigation.navigate('Recipe',{userId: userId, id: recipeId,recalculated:ingredientQuantityList.data, factor: conversionFactor})
			})
			.catch( (e)=>{
					console.log(e)
			})
		}
		
	 }

	 const fetchRecipe = async (recipeId) => {
		const resp = await fetch(`https://tasty-hub.herokuapp.com/api/recipes/${recipeId}`);
		const data = await resp.json();
		setRecipe(data);
	  };
	
	  useEffect(() => {
		fetchRecipe(recipeId);
	  }, []);
	  
	  return (
		<View style={styles.container}>
			<Image style={styles.image} source={chart} />
			<Text style={styles.instructionsText}>Ingrese la cantidad de porciones deseadas.</Text>
			<View style={styles.qtyContainer}>
				<InputTasty style={styles.input} errorMessage={''} isValid={isValid} keyboardType="numeric" maxLength={2} onChange={(cantidad) => setPortionsQty(cantidad)} />
				<Text style={styles.inputText}>porciones</Text>
			</View>
			{!isValid && <Text style={styles.textError}>{errorMsg}</Text>}
			<TouchableOpacity onPress={()=> recalculateRecipeByPortions()} style={styles.button}>
					<Text style={styles.buttonText}>Recalcular</Text>
			</TouchableOpacity>
		</View>
	);
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
	image: {
		marginTop: 50,
		height: 150,
		width: 150,
		justifyContent: 'center'
	},
    instructionsText: {
		fontFamily: 'InterSemiBold',
		fontSize: 18,
		color: '#553900',
		justifyContent: 'center',
		marginLeft: 15,
		marginRight: 15,
        marginTop: 20
	},
    qtyContainer: {
		flexDirection: 'row',
		paddingTop: 50
	},
    input: {
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	inputText: {
		fontSize: 16,
		color: '#553900',
		fontFamily: 'InterLight',
		marginTop: 15,
		marginLeft: 10
	},
	button: {
		elevation: 8,
		backgroundColor: '#5D420C',
		borderRadius: 50,
		padding: 15,
		marginTop: "10%"
	},
	buttonText: {
		fontFamily: 'InterMedium',
		fontSize: 30,
		justifyContent: 'center',
		color: 'white'
	},
	textError:{
		color:"#FF6D6D", 
		fontWeight:'bold',
		marginLeft: 10,
		fontSize: 14
		  
	}
});