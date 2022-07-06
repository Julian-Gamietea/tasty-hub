import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import React from 'react';
import burger from '../assets/recipes/burger.png';
import nextArrow from '../assets/recipes/NextArrow.png'
import { useFonts } from 'expo-font';
import { CustomNav } from '../shared-components/CustomNav';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { InputTasty } from '../shared-components/InputTasty';
import { useNetInfo } from '@react-native-community/netinfo';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'


export const CreateRecipeName = ({ navigation, route }) => {

	const cellular = route.params ? route.params.cellular : false;
	const netInfo = useNetInfo();
	const [isValid, setIsValid] = React.useState(true);
	const [recipeName, setRecipeName] = React.useState('');
	const [user, setUser] = React.useState({});

	

	React.useEffect(() => {
		const fetchUserData = async () => {
			const userData = await SecureStore.getItemAsync("user");
			setUser(JSON.parse(userData));
		}
		fetchUserData();
	}, [])

	const [loaded] = useFonts({
		InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
		InterBold: require('../assets/fonts/Inter-Bold.ttf')
	});
	
	if (!loaded) {
		return null;
	}

	const handlePress = async () => {
		if (!cellular && netInfo.type !== 'wifi') {
			navigation.navigate('NoWifi', { nextScreen: 'RecipeForm', data: {
				recipeName: recipeName,
				type: 'save'
			} });
		} else {
			if (recipeName) {
				if (cellular) {
					navigation.navigate('RecipeForm', {recipeTitle: recipeName, cellular: true});
				} else {
					try {
						const res = await axios.get(`https://tasty-hub.herokuapp.com/api/recipes?ownerId=${user.id}`);
						if (res.data.length > 0) {
							const aux = res.data.filter((recipe) => recipe.name === recipeName);
							if (aux.length > 0) {
								navigation.navigate('RecipeNameExists', { recipeName: recipeName, recipe: aux[0]});
							} else {
								navigation.navigate('RecipeForm', { recipeTitle: recipeName, cellular: false });
							}
						} else {
							navigation.navigate('RecipeForm', { recipeTitle: recipeName, cellular: false });
						}
					} catch (e) {
						console.log(e);
					}
				}
			} else {
				setIsValid(false);
			}
		}
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.menu}>
				<CustomNav callback={() => navigation.navigate('WelcomeScreen')} text="" />
			</View>
			<View style={[styles.container, { alignItems: 'center', paddingTop: 0, marginBottom: 50 }]}>
				<Text style={styles.title}>Crear receta</Text>
				<View style={{ backgroundColor: "#F3A200", borderRadius: 500, padding: 30, marginTop: 15 }}>
					<MaterialIcons name="lunch-dining" size={150} color="#fff" />
				</View>
				<Text style={styles.dishName}>Nombre del plato</Text>
				<InputTasty
					value={recipeName}
					errorMessage={'No puede dejar este campo vacío'}
					isValid={isValid}
					style={styles.input}
					onChange={(name) => {
						setIsValid(true);
						setRecipeName(name);
					}} />
				<TouchableOpacity onPress={handlePress}>
					<View style={{ backgroundColor: "#583209", borderRadius: 500, padding: 10, marginTop: 30 }}>
						<MaterialIcons name="chevron-right" size={70} color="#fff" />
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingTop: StatusBar.currentHeight + 5,
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