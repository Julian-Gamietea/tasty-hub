import React from 'react';
import { TouchableOpacity,View, Text, Image, StyleSheet, TextInput } from 'react-native';
import fork from '../assets/recalculate-recipe/fork.png';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


export const IngredientScreen = ({recipeId}) => {

    const [selectedType, setSelectedType ] = React.useState();
	const [ingredientName, setIngredientName ] = React.useState();
	const [ingredientQty, setIngredientQty ] = React.useState();
	const [unit, setUnit] = React.useState([]);
	const [ingredient, setIngredient] = React.useState([]);
	const [conversion, setConversion] = React.useState(0);
 
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
	
	const unitAcronyms = {
		kilogramos: "kg",
		gramos: "gr",
		onzas: "oz",
		libras: "lb",
		litros: 'lts'
	}
	

	const recalculate = () => {
		
		// axios.get(`https://tasty-hub.herokuapp.com/api/recipes/convert/ingredient?ingredientId=${ingredientId}}&quantity=${}&recipeId=x`)
	}

	const getCurrentQty = (itemValue) => {
		setIngredientName(itemValue)
		ingredient.forEach(element => {
			if(element.ingredientName === itemValue){
				setIngredientQty(String(element.quantity))
				setSelectedType(element.unitName)
			}
		});
	}


	const recalculateQtyWithNewUnit = (itemValue) => {
		
		let origenId;
		let destinoId;
		axios.get(`https://tasty-hub.herokuapp.com/api/unit/description/${selectedType}`)
		.then((response)=>{
			origenId = response.data.id;
			axios.get(`https://tasty-hub.herokuapp.com/api/unit/description/${itemValue}`)
			.then((response)=>{
				destinoId = response.data.id;
				axios.get(`https://tasty-hub.herokuapp.com/api/conversion/convert?sourceUnitId=${origenId}&targetUnitId=${destinoId}`)
				.then((response) => {
					setConversion(response.data.conversionFactor)
					setIngredientQty(String(ingredientQty * response.data.conversionFactor))
					setSelectedType(itemValue)
				})
				.catch((error) => console.log("ERROR 3 " + error))
			})
			.catch((error) => console.log("ERROR 2 " + error))
			})
		.catch((error) => console.log("ERROR 1 " + error))

		
		
	}
	
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={fork} />
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
				<TextInput style={styles.input} keyboardType="numeric" maxLength={5} value={ingredientQty} onChangeText={(qty)=>setIngredientQty(qty)}/>
                <View style={styles.pickerContainer}>
					<Picker
						style={styles.picker}
						selectedValue={selectedType}
						onValueChange={(itemValue, itemIndex) => recalculateQtyWithNewUnit(itemValue)}>
							{unit.map((element, index) => {
								const e = element.description;
								return (<Picker.Item label={e} value={e} key={index}/>);
							})}
							
					</Picker>
				</View>
			</View>
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
        marginTop: 20,
        marginBottom: 10,
		textAlign: 'center'
	},
    qtyContainer: {
		flexDirection: 'row',
		padding: 50,
        justifyContent: "space-between"
	},
    input: {
		borderColor: '#DC9518',
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
});