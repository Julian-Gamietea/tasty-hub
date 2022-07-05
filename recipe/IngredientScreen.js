import React from 'react';
import { TouchableOpacity,View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { InputTasty } from '../shared-components/InputTasty'; 
import { MaterialIcons } from '@expo/vector-icons'; 
export const IngredientScreen = ({navigation, recipeId, userId}) => {

    const [selectedType, setSelectedType ] = React.useState();
	const [ingredientName, setIngredientName ] = React.useState();
	const [ingredientQty, setIngredientQty ] = React.useState();
	const [unit, setUnit] = React.useState([]);
	const [ingredient, setIngredient] = React.useState([]);
	const [ingredientId, setIngredientId] = React.useState(null)
	const [isValid, setIsValid] = React.useState(true)
	const [errorMessage, setErrorMessage] = React.useState('')

	React.useEffect (()=>{
		const getData = () => {
			axios.get('https://tasty-hub.herokuapp.com/api/unit')
			.then((response) => {
				setUnit(response.data)
			})
			.catch((error) => console.log(error))

			var config = {
				method: 'get',
				url: `https://tasty-hub.herokuapp.com/api/ingredientQuantity?recipeId=${recipeId}`,
				headers: { }
			};

			axios(config)
			.then((response) => {
				setIngredient(response.data)
				setIngredientQty(String(response.data[0].quantity))
				setSelectedType(response.data[0].unitName)
			})
			.catch((error) => {
				console.log(error)
			})
		}
		getData();
		
		
	},[])
	
	

	const recalculate = async () => {
		if(ingredientQty<=0){
			setIsValid(false)
			setErrorMessage('La cantidad debe ser mayor o igual a 1')
		}else{
			setIsValid(true)
			setErrorMessage('')
			const origen= ingredient.filter((element) => {return element.ingredientId == ingredientId});
			const sourceId = origen[0].unitId;
			const originalQty = origen[0].quantity;
			const sourceUnit = origen[0].unitName
			if(sourceUnit !== selectedType){
				axios.get(`https://tasty-hub.herokuapp.com/api/unit/description/${selectedType}`)
				.then((response)=>{
					const destinoId = response.data.id;
					axios.get(`https://tasty-hub.herokuapp.com/api/conversion/convert?sourceUnitId=${destinoId}&targetUnitId=${sourceId}`)
					.then((response) => {
						const newQty = response.data.conversionFactor * ingredientQty
						const factor = (newQty/originalQty)
						axios.get(`https://tasty-hub.herokuapp.com/api/recipes/convert/ingredient?ingredientId=${ingredientId}&quantity=${newQty}&recipeId=${recipeId}`)
						.then((response) => {
							const data = response.data
							const result = []
							data.forEach(element => {
								if(element.ingredientId === ingredientId){
									result.push(
										{
											ingredientName: element.ingredientName,
											quantity: ingredientQty,
											unitName: selectedType
										}
									)
								}else{
									result.push(element)
								}

								console.log(result)
								navigation.navigate("Recipe", {userId: userId, id: recipeId, recalculated: result, factor: factor})
							});
						})
						.catch((error) => console.log("First conversion error " + error ))
					})
					.catch((error) => console.log("ERROR 3 " + error))
				})
				.catch((error) => console.log("ERROR 2 " + error))
			}else{
				const factor = ingredientQty / originalQty
				axios.get(`https://tasty-hub.herokuapp.com/api/recipes/convert/ingredient?ingredientId=${ingredientId}&quantity=${ingredientQty}&recipeId=${recipeId}`)
						.then((response) => {
							console.log(response.data)
							const result = response.data
							navigation.navigate("Recipe", {userId: userId, id: recipeId, recalculated: result, factor: factor})
						})
						.catch((error) => console.log("Second conversion error " + error ))
			}
		}
	}

	const getCurrentQty = (itemValue) => {
		setIngredientName(itemValue)
		ingredient.forEach(element => {
			if(element.ingredientName === itemValue){
				setIngredientQty(String(element.quantity))
				setSelectedType(element.unitName)
				setIngredientId(element.ingredientId)
			}
		});
	}

	return (
		<View style={styles.container}>
			<MaterialIcons style={styles.image} name="restaurant" size={120} color='#312102' />
			<Text style={styles.instructionsText}>Ingrese el ingrediente que usará como base.</Text>
			<View style={styles.pickerIngredientContainer}>
				{ingredient && 
				<Picker
					style={styles.pickerIngredient}
					selectedValue={ingredientName}
					onValueChange={(itemValue, itemIndex) => getCurrentQty(itemValue)}>
					{ingredient.map((element, index) => {
						const e = element.ingredientName;
						return (<Picker.Item style={{textAlign:'center'}} label={e} value={e} key={index}/>);
					})}
								
				</Picker>
				}
			</View>
            <View style={styles.qtyContainer}>
                <Text style={styles.inputText}>Cantidad</Text>
				<InputTasty style={styles.input} isValid={isValid} errorMessage={''} keyboardType="numeric" maxLength={5} value={ingredientQty} onChange={(qty)=>setIngredientQty(qty)}/>
                <View style={styles.pickerContainer}>
					<Picker
						style={styles.picker}
						selectedValue={selectedType}
						onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
							{unit.map((element, index) => {
								const e = element.description;
								return (<Picker.Item label={e} value={e} key={index}/>);
							})}
							
					</Picker>
				</View>
			</View>
			{!isValid && <Text style={styles.textError}>{errorMessage}</Text>}
			<TouchableOpacity onPress={() => recalculate()} style={styles.button}>
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
		paddingTop: 40,
		justifyContent: 'center',
		paddingBottom: 30
	},
    instructionsText: {
		fontFamily: 'InterSemiBold',
		fontSize: 18,
		color: '#553900',
		justifyContent: 'center',
		marginLeft: 15,
		marginRight: 15,
        marginTop: 20,
        marginBottom: 10,
		textAlign: 'center'
	},
    qtyContainer: {
		flexDirection: 'row',
		paddingTop: 50,
		paddingBottom: 15,
        justifyContent: "space-between"
	},
    input: {
		
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	inputText: {
		fontSize: 16,
		color: '#553900',
		fontFamily: 'InterLight',
		marginTop: 20,
        marginRight: 15
	},
    inputIngredient: {
        borderColor: '#DC9518',
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 120,
		paddingVertical: 10,
        marginTop: 10
    },
    picker: {
		width: 100,
		color: '#553900',
		fontFamily: 'InterSemiBold',
		justifyContent: 'center'

	},
	
	pickerContainer: {
		minWidth: 90,
		maxHeight: 50,
		borderRadius: 10,
		backgroundColor: '#F7EAB5',
		marginLeft: 15,
		marginTop: 9
	},

	pickerIngredient: {
		width: 300,
		maxHeight: 20,
		backgroundColor: '#fff',
		borderRadius: 20,
		marginTop: 2.2
	},
	
	pickerIngredientContainer:{
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderColor: '#DC9518',
		borderWidth: 1,
		borderRadius: 20,
		width: 320,
		height: 60
	},

	button: {
		elevation: 8,
		backgroundColor: '#5D420C',
		borderRadius: 50,
		padding: 15
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
		fontSize: 14,
		paddingBottom: 30
	}
});