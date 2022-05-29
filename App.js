import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Register } from './register/Register';
import { LandingPage } from './landing-page/LandingPage';
import { EmailSent } from './register/EmailSent';
import { SignIn } from './sign-in/SignIn';
import {InsertMail} from './restore-password/InsertMail'
import { EnterData } from './register/EnterData';
import { EnterAvatar } from './register/EnterAvatar';
import { RegisterSuccess } from './register/RegisterSuccess';
import { Dashboard } from './dashboard/Dashboard';
import { ExistingMail } from './register/ExistingMail';
import { UncompletedRegistry } from './register/UncompletedRegistry';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={LandingPage}/>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="EmailSent" component={EmailSent}/>
          <Stack.Screen name="EnterData" component={EnterData}/>
          <Stack.Screen name="EnterAvatar" component={EnterAvatar}/>
          <Stack.Screen name="RegisterSuccess" component={RegisterSuccess}/>
          <Stack.Screen name="RestorePassword" component={InsertMail}/>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ExistingMail" component={ExistingMail} />
          <Stack.Screen name="UncompletedRegistry" component={UncompletedRegistry} />
          {/* habría que ir agregando las screens aca */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}


