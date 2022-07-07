import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList,  ScrollView,  StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import StarRating from "react-native-star-rating";
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { registerAsset } from "react-native-web/dist/cjs/modules/AssetRegistry";
export const DashBoardFilter = ({ route, navigation }) => {
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
  const [typed,setTyped]=useState(false)
  
  const onChangeText = (text) => {
    setDuration(text)
    if(!typed){
      setTyped(true)
    }    
  }
  
  const handleOnPressIncludeIngredient = (ingredient) => {
    const auxSet = new Set(includedIngredientElems.values())
    selectedIngridients.push(ingredient.id)
    auxSet.add(ingredient)
    setIncludedIngredientElems(auxSet)
    if(excludedIngredients.indexOf(ingredient.id)!=-1){
      handleOnPressOutExcludeIngredient(ingredient)      
    }
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
    if(selectedIngridients.indexOf(ingredient.id)!=-1){
      handleOnPressOutIncludeIngredient(ingredient)      
    }
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
  }

  const handleTypePress = (isPress,type) => {
    if (isPress == true) {
      handleOnPressOutType(type)
    }
    else {
      handleOnPressType(type)
    }
  }

  const renderItem = (item, included) => {
    const isPress = getIsPress(item, included)
    const touchProps = {
      style: isPress ? styles.btnPress : styles.btnNormal,
    };
    if (item.item.name) {
      return (
        <TouchableOpacity {...touchProps} onPress={() => handleIngredientPress(isPress,included,item.item)} underlayColor="#DDDDDD" >
          <Text style= {!isPress ? styles.buttonText:styles.pressedButtonText}>{item.item.name}</Text>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <TouchableOpacity {...touchProps} onPress={() => handleTypePress(isPress,item.item)} underlayColor="#DDDDDD" >
          <Text style= {!isPress ? styles.buttonText:styles.pressedButtonText}>{item.item.description}</Text>
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
   
    /*if(typed){
      if(selectedValue=='Duracion' && duration.length>0){
        Alert.alert("Error!", "Estas ingresando una cantidad de tiempo pero no seleccionando como buscar", [
          {
            text: "Cancel",
            onPress: () => restart(),
            style: "cancel"
          },
         
        ]);
      };
  
    }else{*/
    const recipes = await fetchRecipes()
      recipes.map((recipe)=>
        filterRecipe(recipe
        )
      )
      navigation.navigate("SearchResults",{navigation:navigation,recipeList:filteredRecipes})
      setFilterRecipes([])
      setStarCount(0)
      setDuration(null)
      setSelectedValue('Duracion')

  
}
  const filterRecipe =  async (recipe) =>{
    const average = await getAverageOfRating(recipe.id)
      if(starCount == 0 && isValidDuration(recipe)){
        filteredRecipes.push(recipe)
      }
      else if(duration == null  && average==starCount){
        filteredRecipes.push(recipe)
      }
      else if(isValidDuration(recipe) && average==starCount){
        filteredRecipes.push(recipe)
      }
      else if( duration==null  && starCount == 0){
        filteredRecipes.push(recipe)
      }
      else if(duration.length==0 && average == starCount){
        filteredRecipes.push(recipe)
      }
      else if(duration.length == 0 && starCount==0){
        filteredRecipes.push(recipe)
      }

    

  }

  const isValidDuration = (recipe) =>{
    if(selectedValue == '='){
      return recipe.duration==duration
    }
    else if(selectedValue == '<'){
      return recipe.duration< duration
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
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Con</Text>
        <FlatList
          data={ingredients}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={(item) => renderItem(item, true)}
        />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Sin</Text>
        <FlatList
          data={ingredients}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={(item) => renderItem(item, false)}
        />
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.listTitle}>Tiempo</Text>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerRoundedContainer}>
            <Picker style={styles.picker}   label='Seleccione' selectedValue={selectedValue} onValueChange={(value) => setSelectedValue(value)}>
              <Picker.Item style={styles.pickerItem}  label='Seleccione' value=''/>
              <Picker.Item style={styles.pickerItem}  label='Igual a' value='=' />
              <Picker.Item style={styles.pickerItem}  label='Menor a' value='<' />
              <Picker.Item style={styles.pickerItem}  label='Mayor a' value='>' />
            </Picker>
          </View>
        
            <TextInput
              keyboardType="numeric"
              style={styles.durationInput}
              onChangeText={onChangeText}
              value={duration}
              maxLength={3}
              textAlign="center"
            />
            <Text style={styles.inputText}>Min</Text>
        </View>

      </View>
      <View style={styles.ratingContainer}>
        <View style={{marginLeft:"5%"}}>
        <Text style={styles.listTitle}>Calificacion</Text>
        </View>
         <View style={{width:Dimensions.get("screen").width,justifyContent:"center",alignItems:"center"}}>
          <StarRating
            disabled={false}
            emptyStar={'star-fill'}
            fullStar={'star-fill'}
            halfStar={'star-fill'}
            iconSet={'Octicons'}
            maxStars={5}
            rating={starCount}
            selectedStar={(rating) => setStarCount(rating)}
            fullStarColor={'#553900'}
            emptyStarColor={'#EFD87B'}
            starSize={52}
            starStyle={{marginHorizontal:"1%"}}
          />
      </View> 
       
      </View>
      <View style={{width:Dimensions.get("screen").width,justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity onPress={() => submit()} style={{marginTop:"1%"}}>
          <MaterialIcons name="done" size={50} color="white" style={{marginLeft:"1%"}}  />
          <Text style={styles.acceptanceText}>Aceptar</Text>
        </TouchableOpacity>
      </View>
   </ScrollView>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#F3A200",
    flex:1,

  },
  title: {
    fontFamily:"InterSemiBold",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 36,
    marginTop: "20%",
    alignSelf:"center"
  },
  listTitle: {
    fontFamily:"InterSemiBold",
    alignSelf: "flex-start",
    fontWeight: "600",
    color: "#ffffff",
    fontSize: 28,
    alignSelf: "flex-start",
    marginBottom: "2%",

  },
  inputText:{
    fontFamily:"InterSemiBold",
    alignSelf: "center",
    fontWeight: "600",
    color: "#ffffff",
    fontSize: 18,
    marginLeft:"2%"

  },
  acceptanceText:{
    fontFamily:"InterSemiBold",
    alignSelf: "center",
    fontWeight: "600",
    color: "#ffffff",
    fontSize: 16,
 
  },
  dropdownContainer: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginLeft: "3%"
  },
  listContainer: {
    height:"12%",
    marginLeft: "3%",
    marginVertical:"1%"
  },
  ratingContainer: {
    width:"75%",
    marginTop:"4%",
    
  },
  pressedButtonText:{
    alignSelf:"center",
    fontFamily:"InterSemiBold",
    color:"white",
    fontSize:16,
    fontWeight:"300"
  },
  buttonText: {
    fontFamily:"InterSemiBold",
    alignSelf: "center",
    fontSize:16,
    fontWeight:"300"
  },
  btnNormal: {
    padding:10,
    backgroundColor: "#F7EAB5",
    marginHorizontal: 3,
    borderRadius: 8,
    minWidth:80
  },
  btnPress: {
    backgroundColor: "#5D420C",
    marginHorizontal: 3,
    borderRadius: 8,
    padding:10,
    minWidth:80
  },
  pickerItem: {
    fontFamily:"InterSemiBold",
  },
  picker: {
    width:"70%",
    marginLeft:"12%",
    
    color: '#11110D',
    backgroundColor: "#F7EAB5",
    
  },
  pickerContainer: {
    flexDirection: "row",
    borderRadius: 8,
  },
  pickerRoundedContainer: {
    justifyContent:"center",
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#F7EAB5",
    width:200
    
  },
  durationInput: {
    height: "100%",
    width: 89,
    borderRadius: 20,
    backgroundColor: "#F7EAB5",
    alignSelf:"center",
    marginLeft:"2%"
  }

})