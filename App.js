import { NavigationContainer, StackActions, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from './register/Register';
import { LandingPage } from './landing-page/LandingPage';
import { EmailSent } from './register/EmailSent';
import { LogIn } from './login/LogIn';
import { InsertMail } from './restore-password/InsertMail';
import { InsertCode } from './restore-password/InsertCode'
import { InsertNewPassword } from './restore-password/InsertNewPassword'
import { EnterData } from './register/EnterData';
import { EnterAvatar } from './register/EnterAvatar';
import { RegisterSuccess } from './register/RegisterSuccess';
import { Dashboard } from './dashboard/Dashboard';
import { ExistingMail } from './register/ExistingMail';
import { IncompleteRegistry } from './register/IncompleteRegistry';
import { EmailNotConfirmed } from './register/EmailNotConfirmed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { RecipeIcon } from '../tasty-hub/assets/icons/recipe-button-icon.png';
import { Image, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SearchResults } from '../tasty-hub/search-results/SearchResults'
import { Recipe } from './recipe/Recipe';
import { SuccessFullPasswordRecovery } from './restore-password/SuccessFullPasswordRecovery';
import { UserStudentConflict } from './restore-password/UserStudentConflict';
import { Carrousel } from './carrousel-instructions/Carrousel'
import { CarrouselMultimedia } from './carrousel-instructions/CarrouselMultimedia';
import { CarrouselImages } from './shared-components/CarrouselImages';
import { UserProfile } from './profiles/UserProfile';
import { Favourites } from './favourites/Favourites';
import { EditProfile } from './profiles/EditProfile';
import { Profile } from './profiles/Profile';
import { UserRecipes } from './recipe/UserRecipes';
import { ProfileUpdated } from './profiles/ProfileUpdated';
import { RecalculateRecipe } from './recipe/RecalculateRecipe';
import { WelcomeScreen } from './recipe-creation/WelcomeScreen';
import { CreateRecipeName } from './recipe-creation/CreateRecipeName';
import { RecipeForm } from './recipe-creation/RecipeForm';
import { NoWifi } from './recipe-creation/NoWifi';
import { InstructionCreation } from './recipe-creation/InstructionCreation';
import { Saved } from './saved/Saved';
import { SavedRecipeCard } from './shared-components/SavedRecipeCard';
import { DefineType } from './recipe-creation/DefineType';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Dashboard">
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="RecalculateRecipe" component={RecalculateRecipe}/>
      <Stack.Screen name="SearchResults" component={SearchResults}/>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}

function FavouritesTabStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Favourites">
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="SearchResults" component={SearchResults} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="UserProfile" component={UserProfile}/>
      <Stack.Screen name="RecalculateRecipe" component={RecalculateRecipe}/>
    </Stack.Navigator>
  )
}

function ProfileTabStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileInfo">
      <Stack.Screen name="ProfileInfo" component={Profile} />
      <Stack.Screen name="UserRecipes" component={UserRecipes} />
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="UserProfile" component={UserProfile}/>
      <Stack.Screen name="EditProfile" component={EditProfile}/>
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdated}/>
      <Stack.Screen name="RecalculateRecipe" component={RecalculateRecipe}/>
    </Stack.Navigator>
  )
}


function RecipeTabStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeScreen">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="CreateRecipeName" component={CreateRecipeName} />
      <Stack.Screen name="RecipeForm" component={RecipeForm} />
      <Stack.Screen name="NoWifi" component={NoWifi}/>
      <Stack.Screen name="DefineType" component={DefineType}/>
    </Stack.Navigator>
    )
}

function SavedTabStack() {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Saved">
      <Stack.Screen name="ProfileInfo" component={Profile}/>
      <Stack.Screen name="UserRecipes" component={UserRecipes}/>
      <Stack.Screen name="Saved" component={Saved}/>
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="UserProfile" component={UserProfile}/>
      <Stack.Screen name="EditProfile" component={EditProfile}/>
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdated}/>
      <Stack.Screen name="RecalculateRecipe" component={RecalculateRecipe}/>

    </Stack.Navigator>
  )
}

function Tabs() {
  const [loaded] = useFonts({
    InterSemiBold: require('../tasty-hub/assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../tasty-hub/assets/fonts/Inter-Regular.ttf')
  });
  if (!loaded) {
    return null;
  }

  return (
    <Tab.Navigator initialRouteName='Dashboard'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          borderTopColor: "#F7EAB5",
          borderTopWidth: 5,
          fontFamily: "InterSemiBold"
        },
        tabBarActiveTintColor: "#F3A200",
        tabBarInactiveTintColor: "#553900"
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardTabStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={24} color={color} />
          ),

        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedTabStack}
        options={{
          tabBarLabel: 'Guardados',
          tabBarIcon: ({ color }) => (
            <Feather name="download" size={24} color={color} />
          ),


        }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeTabStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <View style={{ backgroundColor: "#F3A200", borderRadius: 500, width: 72, height: 72, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="local-restaurant" size={35} color='white' />
            </View>
          ),


        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesTabStack}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color }) => (
            <Feather name="bookmark" size={24} color={color} />
          ),


        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTabStack}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={LandingPage} />
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="EmailSent" component={EmailSent} />
        <Stack.Screen name="InsertCode" component={InsertCode} />
        <Stack.Screen name="InsertMail" component={InsertMail} />
        <Stack.Screen name="InsertNewPassword" component={InsertNewPassword} />
        <Stack.Screen name="EnterData" component={EnterData} />
        <Stack.Screen name="EnterAvatar" component={EnterAvatar} />
        <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
        <Stack.Screen name="RestorePassword" component={InsertMail} />
        <Stack.Screen name="Dashboard" component={Tabs} />
        <Stack.Screen name="ExistingMail" component={ExistingMail} />
        <Stack.Screen name="IncompleteRegistry" component={IncompleteRegistry} />
        <Stack.Screen name="EmailNotConfirmed" component={EmailNotConfirmed} />
        <Stack.Screen name="SavedRecipeCard" component={SavedRecipeCard}/>
        <Stack.Screen name="CarrouselImages" component={CarrouselImages} />
        <Stack.Screen name="Test" component={InstructionCreation}/>
        <Stack.Screen name="UserStudentConflict" component={UserStudentConflict} />
        <Stack.Screen name="SuccessFullPasswordRecovery" component={SuccessFullPasswordRecovery} />

        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="CreateRecipeName" component={CreateRecipeName} />
        <Stack.Screen name="RecipeForm" component={RecipeForm} />

        {/* habría que ir agregando las screens aca */}
      </Stack.Navigator>
    </NavigationContainer>


  );
}


