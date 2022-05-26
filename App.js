import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from './register/Register';
import { LandingPage } from './landing-page/LandingPage';
import { EmailSent } from './register/EmailSent';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={LandingPage}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="EmailSent" component={EmailSent}/>
          {/* habría que ir agregando las screens aca */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}


