import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from './register/Register';
import { LandingPage } from './landing-page/LandingPage';
import { EmailSent } from './register/EmailSent';
import {InsertCode} from './restore-password/InsertCode'
import {InsertMail} from './restore-password/InsertMail'
import {InsertNewPassword} from './restore-password/InsertNewPassword'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EmailSent" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={LandingPage}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="EmailSent" component={EmailSent}/>
          <Stack.Screen name="InsertCode" component={InsertCode}/>
          <Stack.Screen name="InsertMail" component={InsertMail}/>
          <Stack.Screen name="InsertNewPassword" component={InsertNewPassword}/>
          {/* habría que ir agregando las screens aca */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}


