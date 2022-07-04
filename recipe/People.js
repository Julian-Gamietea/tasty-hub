import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity,View, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import group from '../assets/recalculate-recipe/group.png';
import { InputTasty } from '../shared-components/InputTasty';

export const People = ({userId,recipeId,navigation}) => {
	const [peopleQty, setPeopleQty] = React.useState(0)
	const [isValid, setIsValid] = useState(true)
	const [recipe ,setRecipe]= useState([]);
	const [errorMessage, setErrorMessage] = useState('')

	const recalculateRecipeByPeople = async () => {
		if(peopleQty <= 0){
			setIsValid(false)
			setErrorMessage('La cantidad debe ser mayor o igual a 1')
		}else{
			setIsValid(true)
			setErrorMessage('')
			var conversionFactor = peopleQty/recipe.peopleAmount
			await axios.get(`https://tasty-hub.herokuapp.com/api/recipes/convert?recipeId=${recipe.id}&conversionFactor=${conversionFactor}`)
			.then((ingredientQuantityList)=>{
					navigation.navigate('Recipe',{userId: userId, id: recipeId,recalculated:ingredientQuantityList.data, factor: conversionFactor})
				})
			.catch((e)=>{
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
			<Image style={styles.image} source={group} />
			<Text style={styles.instructionsText}>Ingrese la cantidad de personas deseadas.</Text>
			<KeyboardAvoidingView>
				<View style={styles.qtyContainer}>
					<InputTasty
						style={styles.input}
						keyboardType="numeric"
						maxLength={2}
						errorMessage={''}
						isValid={isValid}
						onChange={(qty) => setPeopleQty(qty)}
					/>
					<Text style={styles.inputText}>personas</Text>
				</View>	
			</KeyboardAvoidingView>
			{!isValid && <Text style={styles.textError}>{errorMessage}</Text>}
			<TouchableOpacity onPress={()=>recalculateRecipeByPeople()} style={styles.button}>
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
