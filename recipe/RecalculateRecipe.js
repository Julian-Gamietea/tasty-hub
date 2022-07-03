import React from 'react';
import { ScrollView ,View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { CustomNav } from '../shared-components/CustomNav';
import { Picker } from '@react-native-picker/picker';
import { Portions } from './Portions';
import { People } from './People';
import { IngredientScreen } from './IngredientScreen';

export const RecalculateRecipe = ({ navigation, route }) => {

	const [ selectedType, setSelectedType ] = React.useState(['portions']);
	const [ loaded ] = useFonts({
		InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
		InterBold: require('../assets/fonts/Inter-Bold.ttf'),
		InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
		InterLight: require('../assets/fonts/Inter-Light.ttf')
	});
	if (!loaded) {
		return null;
	}

	const {userId} = route.params;
	const {recipeId} = route.params;


	function Display({ value }) {
		if (value.toString() === 'portions') {
			return <Portions recipeId = {recipeId} userId={userId} navigation={navigation}/>;
		} else if (value.toString() === 'people') {
			return <People recipeId = {recipeId} userId={userId} navigation={navigation}/>;
		} else if (value.toString() === 'ingredient') {
			return <IngredientScreen recipeId = {recipeId} userId={userId} navigation={navigation}/>;
		}
	}

	return (
		<ScrollView style={{backgroundColor:'#fff'}}>
			<View style={styles.container}>
				<View style={styles.menu}>
					<CustomNav callback={() => navigation.navigate('Recipe', {userId: userId, id: recipeId})} text="Recalcular receta" />
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.text}>Recalcular por</Text>
					<View style={styles.pickerContainer}>
						<Picker
							style={styles.picker}
							selectedValue={selectedType}
							onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
							<Picker.Item label="Porciones" value="portions" />
							<Picker.Item label="Personas" value="people" />
							<Picker.Item label="Ingrediente" value="ingredient" />
						</Picker>
					</View>
				</View>
				<Display style={styles.display} value={selectedType}/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
		minHeight: Dimensions.get('window').height+60
	},
	image: {
		marginTop: 50,
		height: 150,
		width: 150,
		justifyContent: 'center'
	},
	text: {
		marginTop: 20,
		marginLeft: 5,
		marginRight: 5,
		fontFamily: 'InterMedium',
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 22,
		color: '#553900'
	},
	
	menuBar: {
		marginTop: 40,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	backArrow: {
		height: 50,
		width: 50
	},
	menuText: {
		fontFamily: 'InterBold',
		fontSize: 22,
		marginTop: 8,
		marginLeft: 5
	},
	menu: {
		alignSelf: 'flex-start',
		marginLeft: 15,
		marginTop: 60
	},
	picker: {
		width: 150,
		color: '#553900',
		fontFamily: 'InterSemiBold',
		justifyContent: 'center'
	},
	pickerContainer: {
		minWidth: 90,
		maxHeight: 50,
		borderRadius: 10,
		backgroundColor: '#F7EAB5',
		marginLeft: 5,
		marginTop: 20
	},
	instructionsText: {
		fontFamily: 'InterSemiBold',
		fontSize: 18,
		color: '#553900',
		justifyContent: 'center',
		marginLeft: 15,
		marginRight: 15
	},
	input: {
		borderColor: '#DC9518',
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
	qtyContainer: {
		flexDirection: 'row',
		padding: 40
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	display: {
		
		alignItems: 'center'
	}
});

