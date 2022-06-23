import React from 'react';
import { TouchableOpacity,View, Text, Image, StyleSheet, TextInput } from 'react-native';
import fork from '../assets/recalculate-recipe/fork.png';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


export const IngredientScreen = ({recipeId}) => {
    const [selectedType, setSelectedType ] = React.useState();
	const [ingredientName, setIngredientName ] = React.useState();
	const [ingredientQty, setIngredientQty ] = React.useState(0);
	const [unit, setUnit] = React.useState([]);
	const [ingredient, setIngredient] = React.useState([]);

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
				console.log(response.data[0].quantity)
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
	

	// const recalculate = () => {
	// 	axios.get(`https://tasty-hub.herokuapp.com/api/recipes/convert/ingredient?ingredientId=${ingredientId}}&quantity=${}&recipeId=x`)
	// }

	const getCurrentQty = () => {
		
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
					onValueChange={(itemValue, itemIndex) => setIngredientName(itemValue)}>
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
						onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
							{unit.map((element, index) => {
								const e = element.description;
								return (<Picker.Item label={e} value={e} key={index}/>);
							})}
							
					</Picker>
				</View>
			</View>
			<TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
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