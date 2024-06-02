import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';

const getFonts = () => Font.loadAsync({ 'Jua': require('../assets/fonts/Jua.ttf') });


const RootLayout = () => {
  const [fontLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    getFonts()
      .then(() => setFontsLoaded(true))
      .catch(error => console.error('Error loading fonts', error));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <Stack>
        <Stack.Screen name= "index" options={{headerShown: false}}/>
        <Stack.Screen name= "Login" options={{headerShown: false}}/>
        <Stack.Screen name= "Signup" options={{headerShown: false}}/>
        <Stack.Screen name= "Menu" options={{headerShown: false}}/>

    </Stack>
  )
}

export default RootLayout;
