import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signup from './app/screens/Signup';
import Login from './app/screens/Login';
import Menu from './app/screens/Menu';
import Profile from './app/screens/Profile';
import Score from './app/screens/Score';
import TeacherDashboard from './app/screens/TeacherDashboard';
import ClassDashboard from './app/screens/ClassDashboard';
import StartMenu from './app/screens/StartMenu';

const getFonts = () => Font.loadAsync({
  'jua': require('./assets/fonts/Jua-Regular.ttf')
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await getFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Score" component={Score} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="ClassDashboard" component={ClassDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="StartMenu" component={StartMenu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
