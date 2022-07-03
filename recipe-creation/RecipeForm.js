import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { ButtonCustom } from '../shared-components/ButtonCustom';
import { CustomNav } from '../shared-components/CustomNav';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export const RecipeForm = ({ navigation, route }) => {
	const [ minutes, setMinutes ] = React.useState();
	const [ people, setPeople ] = React.useState();
	const [ portions, setPortions ] = React.useState();

	const { recipeTitle } = route.params;
	const [ loaded ] = useFonts({
		InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
		InterBold: require('../assets/fonts/Inter-Bold.ttf'),
		InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf')
	});
	if (!loaded) {
		return null;
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.menu}>
				<CustomNav
					style={styles.navbar}
					callback={() => navigation.navigate('CreateRecipeName')}
					text="Nueva receta"
				/>
			</View>
			<View style={styles.margin}>
				<Text style={styles.recipeTitle}>{recipeTitle}</Text>
				<Text style={styles.description}>Descripción</Text>
				<TextInput
					style={styles.input}
					placeholder={'Alguna descripción de su plato...'}
					multiline={true}
					maxLength={200}
					numberOfLines={4}
				/>
			</View>
			<View style={styles.composedInputs}>
				<View style={styles.inputRow}>
					<MaterialIcons name="schedule" size={40} style={styles.inputImage} />
					<TextInput
						style={styles.inputComposed}
						keyboardType={'numeric'}
						maxLength={3}
						onChangeText={(minutes) => setMinutes(minutes)}
						value={minutes}
					/>
					<Text style={styles.inputText}>minutos</Text>
				</View>
				<View style={styles.inputRow}>
					<MaterialIcons name="groups" size={40} style={styles.inputImage} />
					<TextInput
						style={styles.inputComposed}
						keyboardType={'numeric'}
						maxLength={3}
						onChangeText={(plp) => setPeople(plp)}
						value={people}
					/>
					<Text style={styles.inputText}>personas</Text>
				</View>
				<View style={styles.inputRow}>
					<MaterialIcons name="pie-chart" size={40} style={styles.inputImage} />
					<TextInput
						style={styles.inputComposed}
						keyboardType={'numeric'}
						maxLength={3}
						onChangeText={(ptions) => setPortions(ptions)}
						value={portions}
					/>
					<Text style={styles.inputText}>porciones</Text>
				</View>
			</View>

			<View style={styles.margin}>
				<Text style={styles.description}>Tipo de plato</Text>
				<TouchableOpacity onPress={() => console.log('Agregar tipo de plato')}>
					<View style={styles.addButton}>
						<MaterialIcons name="add-circle-outline" size={24} style={styles.iconButton} />
						<Text style={styles.textButton}>Añadir</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.margin}>
				<Text style={styles.description}>Ingredientes</Text>
				<TouchableOpacity onPress={() => console.log('Agregar ingrediente')}>
					<View style={styles.addButton}>
						<MaterialIcons name="add-circle-outline" size={24} style={styles.iconButton} />
						<Text style={styles.textButton}>Añadir</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.margin}>
				<Text style={styles.description}>Fotos</Text>
				<TouchableOpacity onPress={() => console.log('Agregar fotos')}>
					<View style={styles.addButton}>
						<MaterialIcons name="add-a-photo" size={24} style={styles.iconCamera} />
						<Text style={styles.textButton}>Añadir</Text>
					</View>
				</TouchableOpacity>
			</View>

			<View style={{ flex: 1 }}>
				<View style={{ borderWidth: 1, position: 'absolute', bottom: 0, alignSelf: 'flex-end' }}>
					<MaterialIcons name="keyboard-arrow-right" size={24} style={styles.iconButton} />
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		contentContainerStyle: 'center',
		paddingTop: 60
	},
	margin: {
		marginLeft: 60,
		marginRight: 60,
		marginBottom: 10
	},
	recipeTitle: {
		fontFamily: 'InterBold',
		fontSize: 29,
		color: '#E69D00',
		marginBottom: 10,
		marginTop: 30
	},
	description: {
		fontFamily: 'InterSemiBold',
		fontSize: 29,
		color: '#312102'
	},
	inputComposed: {
		borderColor: '#312102',
		borderWidth: 1,
		borderRadius: 40,
		paddingHorizontal: 40
	},
	inputRow: {
		flexDirection: 'row',
		marginBottom: 10,
		alignContent: 'center',
		marginLeft: 60
	},
	inputImage: {
		color: '#312102',
		marginTop: 0
	},
	inputText: {
		fontFamily: 'InterMedium',
		fontSize: 18,
		marginTop: 10,
		marginLeft: 10
	},
	text: {
		marginTop: 20,
		marginLeft: 5,
		marginRight: 5,
		fontFamily: 'InterMedium',
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 20,
		color: '#553900'
	},
	button: {
		marginTop: 50,
		width: 300
	},
	menu: {
		alignSelf: 'flex-start',
		marginLeft: 19
	},
	input: {
		borderColor: '#312102',
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	composedInputs: {
		flexDirection: 'column',
		marginTop: 30
	},
	addButton: {
		backgroundColor: '#F3A200',
		flexDirection: 'row',
		borderRadius: 50,
		justifyContent: 'center',
		marginRight: 120
	},
	textButton: {
		fontFamily: 'InterMedium',
		fontSize: 22,
		color: 'white'
	},
	iconButton: {
		color: 'white',
		marginTop: 5
	},
	iconCamera: {
		color: 'white',
		marginTop: 2,
		marginRight: 2
	}
});
