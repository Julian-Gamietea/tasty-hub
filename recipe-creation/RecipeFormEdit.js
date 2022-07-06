import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Pressable, Modal, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { CustomNav } from '../shared-components/CustomNav';
import { MaterialIcons } from '@expo/vector-icons';
import { InputTasty } from '../shared-components/InputTasty';
import { AddMultimediaForm } from '../shared-components/AddMultimediaForm';
import * as ImagePicker from 'expo-image-picker';
import { recipeReducer, initialState } from './RecipeReducer';
import * as SecureStore from 'expo-secure-store';
import * as VideoThumbnails from 'expo-video-thumbnails';
import axios from 'axios';

export const RecipeFormEdit = ({ navigation, route }) => {

	const url = 'https://tasty-hub.herokuapp.com/api'
	const [recipeState, recipeDispatch] = React.useReducer(recipeReducer, initialState);
	const { id, description, duration, images, name,
		ownerId, peopleAmount, portions, typeId, typeDescription, ingredientQty } = recipeState;

	// const [modalVisible, setModalVisible] = React.useState(false);
	// const [deleteIndex, setDeleteIndex] = React.useState(null);
	const [deletedImages, setDeletedImages] = React.useState([]);

	React.useEffect(() => {
		const { recipe } = route.params;
		const fetchData = async (id) => {
			const imagesRes = await axios.get(`${url}/recipePhotos/recipe/${id}`);
			const auxImages = [{
				uri: recipe.mainPhoto,
				type: 'image/'
			}]
			imagesRes.data.forEach((image) => {
				image['type'] = 'image/' + image['extension'];
				delete image['extension'];
				image['uri'] = image['photoUrl'];
				delete image['photoUrl'];
			})
			const imagesFinal = auxImages.concat(imagesRes.data);
			recipeDispatch({ type: 'fieldUpdate', field: 'images', value: imagesFinal });

			const ingredientQtyRes = await axios.get(`${url}/ingredientQuantity?recipeId=${id}`);
			ingredientQtyRes.data.forEach((iq) => {
				iq.id = 0
			})
			recipeDispatch({ type: 'fieldUpdate', field: 'ingredientQty', value: ingredientQtyRes.data });
		}

		console.log(recipe);
		const auxObject = {
			id: recipe.id,
			description: recipe.description,
			duration: recipe.duration,
			images: [],
			name: recipe.name,
			ownerId: recipe.ownerId,
			peopleAmount: recipe.peopleAmount,
			portions: recipe.portions,
			typeId: recipe.typeId,
			typeDescription: recipe.typeName,
			ingredientQty: []
		}
		recipeDispatch({ type: 'set', state: auxObject });
		fetchData(recipe.id);
	}, [])

	React.useEffect(() => {
		if (route.params.state) {
			recipeDispatch({ type: 'set', state: route.params.state });
		}
	}, [route.params])

	const cellular = route.params.cellular;

	const AddPhoto = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});


		if (!result.cancelled) {
			const getFileName = result.uri.split("/");
			const getExtension = result.uri.split(".");
			recipeDispatch({
				type: 'AddImage', image: {
					uri: result.uri,
					type: 'image/' + getExtension[getExtension.length - 1],
					name: getFileName[getFileName.length - 1]
				}
			})

		}
	}

	const handleInstructions = async () => {
		const instructions = await axios.get(`${url}/instruction/recipe/${id}`);
		let multim;
		for (let instruction of instructions.data) {
			multim = await axios.get(`${url}/multimedia/instruction/${instruction.id}`);
			for (let m of multim.data) {
				if (m.typeContent.split("/")[0] === 'video') {

					const { uri } = await VideoThumbnails.getThumbnailAsync(
						m.urlContent
						, { quality: .5, time: 3000 });

					m.thumbnailUri = uri
				}
				m['type'] = m['typeContent'];
				delete m['typeContent'];
				m['uri'] = m['urlContent'];
				delete m['urlContent'];
			}
			instruction.multimedia = multim.data;
		}
		navigation.navigate('InstructionEdit', { recipe: recipeAux, instructions: instructions.data, deletedImages: deletedImages })
	}

	const removePhoto = (index) => {
		//CREAR UN ARRAY DE LAS FOTOS QUE SE SACARON, AL FINAL, CUANDO SE DA EN FINALIZAR
		//ELIMINAR TODAS LAS QUE ESTÉN AHI
		const aux = images.slice(0, images.length);
		const deletedElems = aux.splice(index, 1);
		const auxDel = deletedImages.slice(0, deletedImages.length);
		const deleted = auxDel.concat(deletedElems);
		setDeletedImages(deleted);
		console.log(deleted);
		recipeDispatch({ type: 'fieldUpdate', field: 'images', value: aux });
	}

	const handleRemoveType = () => {
		recipeDispatch({ type: 'fieldUpdate', field: 'typeId', value: null });
		recipeDispatch({ type: 'fieldUpdate', field: 'typeDescription', value: "" });
	}

	const handleRemoveIngredient = (index) => {
		const aux = ingredientQty.slice(0, ingredientQty.length);
		aux.splice(index, 1);
		recipeDispatch({ type: 'fieldUpdate', field: 'ingredientQty', value: aux });
	}

	const [loaded] = useFonts({
		InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
		InterBold: require('../assets/fonts/Inter-Bold.ttf'),
		InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf')
	});
	if (!loaded) {
		return null;
	}

	const recipeAux = {
		description: description,
		duration: duration,
		enabled: false,
		id: id,
		mainPhoto: images[0],
		name: name,
		ownerId: ownerId,
		peopleAmount: peopleAmount,
		portions: portions,
		typeId: typeId,
		ingredientQty: ingredientQty,
		images: images
	}

	return (
		<View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', paddingTop: StatusBar.currentHeight + 5, }}>
			<View style={{ backgroundColor: '#fff' }}>
				<CustomNav
					callback={() => {
						recipeDispatch({ type: 'reset' });
						navigation.goBack();
					}}
					text="Nueva receta"
				/>
			</View>

			<ScrollView style={styles.container}>
				<View style={{ alignItems: 'center' }}>

					<View>
						<Text style={styles.recipeTitle}>{name}</Text>
						<Text style={styles.description}>Descripción</Text>
						<InputTasty
							style={styles.input}
							placeholder={'Alguna descripción de su plato...'}
							multiline
							maxLength={200}
							value={description}
							onChange={(desc) => recipeDispatch({ type: 'fieldUpdate', field: 'description', value: desc })}
						/>
					</View>
					<View style={styles.composedInputs}>
						<View style={styles.inputRow}>
							<MaterialIcons name="schedule" size={40} style={styles.inputImage} />
							<InputTasty
								style={styles.inputComposed}
								keyboardType={'numeric'}
								maxLength={3}
								onChange={(minutes) => recipeDispatch({ type: 'fieldUpdate', field: 'duration', value: minutes })}
								value={duration.toString()}
							/>
							<Text style={styles.inputText}>minutos</Text>
						</View>
						<View style={styles.inputRow}>
							<MaterialIcons name="groups" size={40} style={styles.inputImage} />
							<InputTasty
								style={styles.inputComposed}
								keyboardType={'numeric'}
								maxLength={3}
								onChange={(plp) => recipeDispatch({ type: 'fieldUpdate', field: 'peopleAmount', value: plp })}
								value={peopleAmount.toString()}
							/>
							<Text style={styles.inputText}>personas</Text>
						</View>
						<View style={styles.inputRow}>
							<MaterialIcons name="pie-chart" size={40} style={styles.inputImage} />
							<InputTasty
								style={styles.inputComposed}
								keyboardType={'numeric'}
								maxLength={3}
								onChange={(ptions) => recipeDispatch({ type: 'fieldUpdate', field: 'portions', value: ptions })}
								value={portions.toString()}
							/>
							<Text style={styles.inputText}>porciones</Text>
						</View>
					</View>

					<View style={styles.margin}>
						<Text style={styles.description}>Tipo de plato</Text>
						<TouchableOpacity onPress={() => navigation.navigate('DefineType', { state: recipeState, origin: 'RecipeFormEdit' })} style={styles.addButton}>
							<MaterialIcons name="add-circle-outline" size={24} style={styles.iconButton} />
							<Text style={styles.textButton}>Añadir</Text>
						</TouchableOpacity>
						{typeId &&
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
								<Text style={{ fontSize: 18 }}>{`- ${typeDescription}`}</Text>
								<TouchableOpacity
									style={{ backgroundColor: "#E31C1C", borderRadius: 5, padding: 2, width: 24 }}
									onPress={handleRemoveType}
								>
									<MaterialIcons name="delete" size={20} color="white" />
								</TouchableOpacity>
							</View>
						}
					</View>
					<View style={styles.margin}>
						<Text style={styles.description}>Ingredientes</Text>
						<TouchableOpacity onPress={() => navigation.navigate('DefineIngridient', { state: recipeState, origin: 'RecipeFormEdit' })} style={styles.addButton}>
							<MaterialIcons name="add-circle-outline" size={24} style={styles.iconButton} />
							<Text style={styles.textButton}>Añadir</Text>
						</TouchableOpacity>
						{ingredientQty.length !== 0 && ingredientQty.map((qty, index) => {
							return (
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
									<Text style={{ fontSize: 18 }}>- {qty.ingredientName}{'\n  '}{qty.quantity}{qty.unitName}</Text>
									<TouchableOpacity
										style={{ backgroundColor: "#E31C1C", borderRadius: 5, padding: 2, width: 24 }}
										onPress={() => handleRemoveIngredient(index)}
									>
										<MaterialIcons name="delete" size={20} color="white" />
									</TouchableOpacity>
								</View>
							);
						})

						}
					</View>
					<View style={[styles.margin, { marginBottom: 10 }]}>
						<AddMultimediaForm
							title={"Fotos"}
							titleStyle={styles.description}
							onPress={AddPhoto}
							data={images}
							onRemove={removePhoto} />
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
				style={{ position: 'absolute', right: 10, bottom: 10, alignSelf: 'flex-end', backgroundColor: "#583209", borderRadius: 500, padding: 5, marginTop: 30 }}
				onPress={handleInstructions}
			>
				<MaterialIcons name="chevron-right" size={60} color="#fff" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	margin: {
		width: '65%',
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
		color: '#312102',
		textAlign: 'left'
	},
	inputComposed: {
		borderColor: '#312102',
		borderRadius: 40,
		textAlign: 'center',
		paddingHorizontal: 20,
	},
	inputRow: {
		flexDirection: 'row',
		marginBottom: 10,
		alignItems: 'center',
		marginLeft: 60
	},
	inputImage: {
		color: '#312102',
		marginBottom: 20,
		marginRight: 5
	},
	inputText: {
		fontFamily: 'InterMedium',
		fontSize: 18,
		marginBottom: 20,
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
		paddingVertical: 10,
		height: 100,
		maxHeight: 100,
		textAlignVertical: 'top',
		minWidth: 270,
		maxWidth: 270,
	},
	composedInputs: {
		flexDirection: 'column',
		marginTop: 30,
		alignSelf: 'flex-start'
	},
	addButton: {
		backgroundColor: "#F3A200",
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: 110,
		borderRadius: 25,
		paddingVertical: 5,
		paddingHorizontal: 10
	},
	textButton: {
		color: "#fff",
		fontFamily: "InterSemiBold",
		fontSize: 18,
	},
	iconButton: {
		color: 'white',
	},
	iconCamera: {
		color: 'white',
		marginTop: 2,
		marginRight: 2
	}
});
