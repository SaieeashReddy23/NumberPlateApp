import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useContext } from "react";

import {LogBox} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/loginScreen';
import RegisterDeviceScreen from './Screens/registerDeviceScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import HomeScreen from './Screens/homeScreen';


const stack = createNativeStackNavigator();


const AuthStack = () => {

  return <stack.Navigator 
         screenOptions={{
              headerStyle: { backgroundColor: '#0f8cfa' },
              headerTintColor: 'white',
              headerTitleAlign:'center',
              headerShown: false,
         }}
      >
     
      <stack.Screen  
            name='LoginPage' 
            component={LoginScreen}
        
        />
       <stack.Screen name = 'RegisterDevice' component={RegisterDeviceScreen} />
      
  </stack.Navigator>
}


const AuthenticatedStack = () => {

   return <stack.Navigator   screenOptions={{
          headerStyle: { backgroundColor: '#0f8cfa' },
          headerTintColor: 'white',
          headerTitleAlign:'center',
          headerShown: false,
      }}>
     <stack.Screen name='Home' component={HomeScreen}/>
   </stack.Navigator>
}

const NavigationComponent = () => {

  const authContext = useContext(AuthContext);

  return  <NavigationContainer>
           {!authContext.isAuthenticated && <AuthStack/> } 
           {authContext.isAuthenticated && <AuthenticatedStack/> }
          </NavigationContainer>
}


export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <>
      <StatusBar style='light'/>

      <AuthContextProvider>
        <NavigationComponent/>
      </AuthContextProvider>
     
    </>
  );
}

const styles = StyleSheet.create({

  
});
