import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import burger from '../assets/recipes/burger.png';
import nextArrow from '../assets/recipes/NextArrow.png'
import { useFonts } from 'expo-font';
import { CustomNav } from '../shared-components/CustomNav';
import { TextInput } from 'react-native-gesture-handler';

export const CreateRecipeName = ({ navigation }) => {

    const [recipeName, setRecipeName] = React.useState()
	const [ loaded ] = useFonts({
		InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
		InterBold: require('../assets/fonts/Inter-Bold.ttf')
	});
	if (!loaded) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View style={styles.menu}>
				<CustomNav callback={() => navigation.navigate('WelcomeScreen')} text="" />
			</View>
			<Text style={styles.title}>Crear receta</Text>
			<Image style={styles.image} source={burger} />
			<Text style={styles.dishName}>Nombre del plato</Text>
			<TextInput value={recipeName} style={styles.input} onChangeText={(name) => setRecipeName(name)} />
			<TouchableOpacity onPress={() => navigation.navigate('RecipeForm', {recipeTitle: recipeName})}>
				<Image source={nextArrow} style={styles.nextArrow}></Image>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		alignItems: 'center',
        paddingTop: 60
	},
	image: {
		marginTop: 50,
		height: 210,
		width: 250
	},
	menu: {
		alignSelf: 'flex-start',
		marginLeft: 19
	},
	title: {
		fontFamily: 'InterBold',
		fontSize: 40,
		color: '#553900',
		marginTop: 30
	},
	dishName: {
		fontFamily: 'InterMedium',
		fontSize: 18,
		color: '#312102',
		marginTop: 50,
		marginLeft: 50,
		marginBottom: 10,
		alignSelf: 'flex-start'
	},
	input: {
		borderColor: '#DC9518',
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 140,
		paddingVertical: 10
	},
    nextArrow: {
        width: 120,
        height: 120,
        marginTop: 40
    }
});