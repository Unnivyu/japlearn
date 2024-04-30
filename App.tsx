import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './context/AuthContext';

import Signup from './app/screens/Signup';
import Login from './app/screens/Login';
import Menu from './app/screens/Menu';
import Profile from './app/screens/Profile';
import Score from './app/screens/Score';
import TeacherDashboard from './app/screens/TeacherDashboard';
import ClassDashboard from './app/screens/ClassDashboard';
import StartMenu from './app/screens/StartMenu';
import QuackmanOption from './app/screens/QuackmanOption';
import QuackslateOption from './app/screens/QuackslateOption';
import QuackamoleOption from './app/screens/QuackamoleOption';
import QuackamoleOption2 from './app/screens/QuackamoleOption2';
import Quackslate from './app/screens/Quackslate';
import QuackamoleLevels from './app/screens/QuackamoleLevels';
import QuackmanLevels from './app/screens/QuackmanLevels';
import QuackslateLevels from './app/screens/QuackslateLevels';
import QuackmanEdit from './app/screens/QuackmanEdit';
import QuackslateEdit from './app/screens/QuackslateEdit';
import QuackamoleEdit from './app/screens/QuackamoleEdit';
import Quackamole from './app/screens/Quackamole';

const getFonts = () => Font.loadAsync({
  'jua': require('./assets/fonts/Jua-Regular.ttf'),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const { user, role } = useContext(AuthContext) || {};

  // Add a state to track if fonts are loaded
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await getFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  // Render loading screen until fonts are loaded (implement LoadingScreen component)
  if (!fontsLoaded) {
    return <LoadingScreen />; // Replace with your LoadingScreen component
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "Menu" : "Login"}>
          {!user && (
            <>
              <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </>
          )}
          {role === 'user' && (
            <>
              <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
              <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name="Score" component={Score} options={{ headerShown: false }} />
              <Stack.Screen name="StartMenu" component={StartMenu} options={{ headerShown: false }} />
              <Stack.Screen name="QuackmanOption" component={QuackmanOption} options={{ headerShown: false }} />
              <Stack.Screen name="QuackslateOption" component={
