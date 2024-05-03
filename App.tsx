import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  'jua': require('./assets/fonts/Jua-Regular.ttf')
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadFonts() {
      await getFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    const auth = getAuth();

    // Load saved user state from AsyncStorage
    const loadUserState = async () => {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    };

    loadUserState();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
            // User is logged in
            setUser(authUser);
            // Save user state in AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(authUser));
        } else {
            // User is logged out
            setUser(null);
            // Clear user state from AsyncStorage
            await AsyncStorage.removeItem('user');
        }
    });

    // Unsubscribe from listener when the component unmounts
    return () => {
        unsubscribe();
    };
}, []);

// Determine the initial route based on the user state
const initialRouteName = 'Quackamole';

  if (!fontsLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Score" component={Score} options={{ headerShown: false }} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="ClassDashboard" component={ClassDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="StartMenu" component={StartMenu} options={{ headerShown: false }} />
        <Stack.Screen name="QuackamoleLevels" component={QuackamoleLevels} options={{headerShown: false}}/>
        <Stack.Screen name="QuackmanLevels" component={QuackmanLevels} options={{headerShown: false}}/>
        <Stack.Screen name="QuackslateLevels" component={QuackslateLevels} options={{headerShown: false}}/>
        <Stack.Screen name="QuackmanEdit" component={QuackmanEdit} options={{ headerShown: false }} />
        <Stack.Screen name="QuackslateEdit" component={QuackslateEdit} options={{ headerShown: false }} />
        <Stack.Screen name="QuackamoleEdit" component={QuackamoleEdit} options={{ headerShown: false }} />
        <Stack.Screen name="QuackmanOption" component={QuackmanOption} options={{ headerShown: false }} />
        <Stack.Screen name="QuackslateOption" component={QuackslateOption} options={{ headerShown: false }} />
        <Stack.Screen name="QuackamoleOption" component={QuackamoleOption} options={{ headerShown: false }} />
        <Stack.Screen name="QuackamoleOption2" component={QuackamoleOption2} options={{ headerShown: false }} />
        <Stack.Screen name="Quackslate" component={Quackslate} options={{ headerShown: false }} />
        <Stack.Screen name="Quackamole" component={Quackamole} options={{ headerShown: false }} />


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
