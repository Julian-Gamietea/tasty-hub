import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList,  ScrollView,  StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import StarRating from "react-native-star-rating";
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
export const DashBoardFilter = ({ route, navigation }) => {
  const [reload, setReload] = useState(false)
  const [ingredients, setIngredients] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedIngridients,setSelectedIngridients] = useState([])
  const [excludedIngredients,setExcludedIngredients] = useState([])
  const [selectedTypes,setSelectedTypes] = useState([])
  const [starCount, setStarCount] = useState(0);
  const [elems, setElems] = useState(new Set())
  const [includedIngredientElems, setIncludedIngredientElems] = useState(new Set())
  const [excludedIngredientElems, setExcludedIngredientElems] = useState(new Set())
  const [selectedValue, setSelectedValue] = React.useState('Duracion');
  const [duration, setDuration] = useState(null)
  const [filteredRecipes,setFilterRecipes] = useState([])

  const onChangeText = (text) => {
    setDuration(text)
  }
  const handleOnPressIncludeIngredient = (ingredient) => {
    const auxSet = new Set(includedIngredientElems.values())
    selectedIngridients.push(ingredient.id)
    auxSet.add(ingredient)
    setIncludedIngredientElems(auxSet)
  }
  const handleOnPressOutIncludeIngredient = (ingredient) => {
    const auxSet = new Set(includedIngredientElems.values())
    const index = selectedIngridients.indexOf(ingredient.id);
    if(selectedIngridients.length==1){
      setSelectedIngridients([])
    }
    else{
      selectedIngridients.splice(index, 1)
    }
    auxSet.delete(ingredient)
    setIncludedIngredientElems(auxSet)
  }
  const handleOnPressExcludeIngredient = (ingredient) => {
    const auxSet = new Set(excludedIngredientElems.values())
    excludedIngredients.push(ingredient.id)
    auxSet.add(ingredient)
    setExcludedIngredientElems(auxSet)
  }
  const handleOnPressOutExcludeIngredient = (ingredient) => {
    const auxSet = new Set(excludedIngredientElems.values())
    const index = excludedIngredients.indexOf(ingredient.id);
    if(excludedIngredients.length==1){
      setExcludedIngredients([])
    }
    else{
      excludedIngredients.splice(index, 1)
    }
    auxSet.delete(ingredient)
    setExcludedIngredientElems(auxSet)
  }
  const handleOnPressType = async (type) => {
    const auxSet = new Set(elems.values())
    selectedTypes.push(type.id)
    auxSet.add(type)
    setElems(auxSet)
  }
  const handleOnPressOutType = async (type) => {
    const auxSet = new Set(elems.values())
    const index = selectedTypes.indexOf(type.id);
    if(selectedTypes.length==1){
      setSelectedTypes([])
    }
    else{
      selectedTypes.splice(index, 1)
    }
    auxSet.delete(type)
    setElems(auxSet)
  }
  const getIsPress = (item, included) => {
    if (included == true) {
      return includedIngredientElems.has(item.item)
    }
    else if (included == false) {
      return excludedIngredientElems.has(item.item)
    }
    else {
      return elems.has(item.item)
    }
  }
  const handleIngredientPress = (isPress,included,ingredient) => {

    if (isPress == true && included == true) {
      handleOnPressOutIncludeIngredient(ingredient)
    }
    else if (isPress == false && included == true) {
      handleOnPressIncludeIngredient(ingredient)
    }
    else if (isPress == true && included == false) {
      handleOnPressOutExcludeIngredient(ingredient)
    }
    else if (isPress == false && included == false) {
      handleOnPressExcludeIngredient(ingredient)
    }
    setReload(!reload)
  }

  const handleTypePress = (isPress,type) => {
    if (isPress == true) {
      handleOnPressOutType(type)
    }
    else {
      handleOnPressType(type)
    }
    setReload(!reload)
  }

  const renderItem = (item, included) => {
    const isPress = getIsPress(item, included)
    const touchProps = {
      activeOpacity: 0.5,
      style: isPress ? styles.btnPress : styles.btnNormal,
    };
    if (item.item.name) {
      return (
        <TouchableOpacity {...touchProps} onPress={() => handleIngredientPress(isPress,included,item.item)} underlayColor="#DDDDDD" >
          <Text style={styles.buttonText}>{item.item.name}</Text>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <TouchableOpacity {...touchProps} onPress={() => handleTypePress(isPress,item.item)} underlayColor="#DDDDDD" >
          <Text style={styles.buttonText}>{item.item.description}</Text>
        </TouchableOpacity>
      )
    }
  }
  const fetchIngredients = () => {
    const resp = axios.get(`https://tasty-hub.herokuapp.com/api/ingredient`);
    resp.then((ingredientData) => {
      setIngredients(ingredientData.data)
    })
  }
  const fetchTypes = () => {
    const resp = axios.get(`https://tasty-hub.herokuapp.com/api/type`);
    resp.then((typeData) => {
      setTypes(typeData.data)
    })
  }
  const fetchRecipes = async () => {
    const resp = await axios.get(`https://tasty-hub.herokuapp.com/api/recipes/filter?typesIds=${selectedTypes}&includedIngredients=${selectedIngridients}&excludedIngredients=${excludedIngredients}`);
    return resp.data
  }
  const getAverageOfRating = async (recipeId)=>{//obtengo la el avg de la receta
  
    const resp = await axios.get(`https://tasty-hub.herokuapp.com/api/rating/average/${recipeId}`);
    var avg = Math.floor(resp.data)
    return avg
  }
  useEffect(() => {
    fetchTypes()
    fetchIngredients();
  }, []);

  const submit = async () => {
    const recipes = await fetchRecipes()
    console.log(recipes)
    recipes.map((recipe)=>
      filterRecipe(recipe)
    )  
    navigation.navigate("SearchResults",{recipeList:recipes})
  }
  const filterRecipe = async (recipe) =>{
    const average = await getAverageOfRating(recipe.id)
    if(starCount == 0 && isValidDuration(recipe)){
      filteredRecipes.push(recipe)
    }
    else if(duration===null && average==starCount){
      filteredRecipes.push(recipe)
    }
    else if(isValidDuration(recipe) && average==starCount){
      filteredRecipes.push(recipe)
    }
  }

  const isValidDuration = (recipe) =>{
    if(selectedValue == '='){
      return recipe.duration==duration
    }
    else if(selectedValue == '<'){
      return recipe.duration<duration
    }
    else if(selectedValue == '>'){
      return recipe.duration>duration
    }
    else{
      return false;
    }
  }
  return (
    <ScrollView style={styles.mainContainer}>
    
      <Text style={styles.title}>Filtrado</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Tipo</Text>
        <FlatList
          data={types}
          horizontal
          extraData={reload}
          pagingEnabled
          renderItem={renderItem}
        />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Con</Text>
        <FlatList
          data={ingredients}
          horizontal
          pagingEnabled
          renderItem={(item) => renderItem(item, true)}
        />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Sin</Text>
        <FlatList
          data={ingredients}
          horizontal
          pagingEnabled
          renderItem={(item) => renderItem(item, false)}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.listTitle}>Tiempo</Text>
        <View style={styles.pickerContainer}>
          <Picker style={styles.picker} selectedValue={selectedValue} onValueChange={(value) => setSelectedValue(value)}>
            <Picker.Item style={styles.item} label='Seleccione' value=''/>
            <Picker.Item style={styles.item} label='Igual a' value='=' />
            <Picker.Item style={styles.item} label='Menor a' value='<' />
            <Picker.Item style={styles.item} label='Mayor a' value='>' />
          </Picker>
          <TextInput
            style={styles.durationInput}
            onChangeText={onChangeText}
            value={duration}
            maxLength={3}
          />
        </View>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.listTitle}>Calificacion</Text>
        <StarRating
          disabled={false}
          emptyStar={'star-fill'}
          fullStar={'star-fill'}
          halfStar={'star-fill'}
          iconSet={'Octicons'}
          maxStars={5}
          rating={starCount}
          selectedStar={(rating) => setStarCount(rating)}
          fullStarColor={'#967127'}
          emptyStarColor={'#EFD87B'}
          starSize={52}
        />
      </View>
      <View >
        <TouchableOpacity onPress={() => submit()} style={{alignSelf:"center",marginTop:"8%"}}>
          <MaterialIcons name="done" size={50} color="white" />
        </TouchableOpacity>
      </View>
   </ScrollView>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F3A200",

  },
  title: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 36,
    marginTop: "20%",
    alignSelf:"center"
  },
  listTitle: {

    alignSelf: "flex-start",
    fontWeight: "600",
    color: "#ffffff",
    fontSize: 24,
    alignSelf: "flex-start",
    marginBottom: "2%"


  },
  dropdownContainer: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginLeft: "3%"
  },
  listContainer: {
    height:"12%",
    marginLeft: "3%"
  },
  ratingContainer: {
 
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginLeft: "3%",
    marginTop:"10%",
    
  },
  buttonText: {
    alignSelf: "center"
  },
  btnNormal: {
    padding:10,
    backgroundColor: "#f7eab5",
    marginHorizontal: 3,
    borderRadius: 8,
  },
  btnPress: {
    backgroundColor: "#5D420C",
    marginHorizontal: 3,
    borderRadius: 8,
    padding:10,


  },
  picker: {
    borderRadius: 8,
    width: 150,
    marginHorizontal: "2%",
    color: '#11110D',
    backgroundColor: "#F7EAB5",
  },
  pickerContainer: {
    flexDirection: "row",
    width: 200,
    borderRadius: 8,
    marginRight: "2%"
  },
  durationInput: {
    height: "100%",
    width: 89,
    borderRadius: 8,
    backgroundColor: "#F7EAB5"

  }

})