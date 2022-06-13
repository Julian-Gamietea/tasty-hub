import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from './register/Register';
import { LandingPage } from './landing-page/LandingPage';
import { EmailSent } from './register/EmailSent';
import { LogIn } from './login/LogIn';
import {InsertMail} from './restore-password/InsertMail';
import {InsertCode} from './restore-password/InsertCode'
import {InsertNewPassword} from './restore-password/InsertNewPassword'
import { EnterData } from './register/EnterData';
import { EnterAvatar } from './register/EnterAvatar';
import { RegisterSuccess } from './register/RegisterSuccess';
import { Dashboard } from './dashboard/Dashboard';
import { ExistingMail } from './register/ExistingMail';
import { IncompleteRegistry } from './register/IncompleteRegistry';
import { EmailNotConfirmed } from './register/EmailNotConfirmed';
import { Recipe } from './recipe/Recipe';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={LandingPage}/>
          <Stack.Screen name="Login" component={LogIn} />
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="EmailSent" component={EmailSent}/>
          <Stack.Screen name="InsertCode" component={InsertCode}/>
          <Stack.Screen name="InsertMail" component={InsertMail}/>
          <Stack.Screen name="InsertNewPassword" component={InsertNewPassword}/>
          <Stack.Screen name="EnterData" component={EnterData}/>
          <Stack.Screen name="EnterAvatar" component={EnterAvatar}/>
          <Stack.Screen name="RegisterSuccess" component={RegisterSuccess}/>
          <Stack.Screen name="RestorePassword" component={InsertMail}/>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ExistingMail" component={ExistingMail} />
          <Stack.Screen name="IncompleteRegistry" component={IncompleteRegistry}/>
          <Stack.Screen name="EmailNotConfirmed" component={EmailNotConfirmed} />

          <Stack.Screen name="Recipe" component={Recipe}/>
          {/* habría que ir agregando las screens aca */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}


