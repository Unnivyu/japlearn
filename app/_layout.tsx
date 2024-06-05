import React, { useState, useEffect, useContext } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as Font from 'expo-font';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { ClassCodeProvider } from '../context/ClassCodeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getFonts = () => Font.loadAsync({ 'Jua': require('../assets/fonts/Jua.ttf') });

// Define route access based on user roles
const routeAccessConfig = {
  student: ['Menu', 'StartMenu', 'ScenePrompter'],
  teacher: ['TeacherDashboard', 'ScenePrompter'],
};

const RootLayout = () => {
  const [fontLoaded, setFontsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const loadResources = async () => {
      try {
        await Promise.all([getFonts(), checkUserAuth()]);
      } catch (error) {
        console.error('Error loading resources', error);
      } finally {
        setFontsLoaded(true);
        setIsMounted(true); // Ensure this is set after resources are loaded
      }
    };

    const checkUserAuth = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    if (isMounted && fontLoaded) { // Check if the component is mounted and fonts are loaded before navigating
      if (!user && (segments.some(seg => routeAccessConfig.student.includes(seg) || routeAccessConfig.teacher.includes(seg)))) {
        router.replace('/Login');
      } else if (user && !routeAccessConfig[user.role].some(seg => segments.includes(seg))) {
        router.replace('/Unauthorized'); // Assume Unauthorized is a valid route
      }
    }
  }, [isMounted, fontLoaded, user, segments]);

  if (!fontLoaded || !isMounted) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" />
      <Stack.Screen name="Signup" />
      {user?.role === 'student' && (
        <>
          <Stack.Screen name="Menu" />
          <Stack.Screen name="StartMenu" />
          <Stack.Screen name="ScenePrompter" />
        </>
      )}
      {user?.role === 'teacher' && (
        <>
          <Stack.Screen name="TeacherDashboard" />
          <Stack.Screen name="ScenePrompter" />
        </>
      )}
    </Stack>
  );
};

const styles = StyleSheet.create({
  whiteScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const RootLayoutWithProvider = () => (
  <AuthProvider>
    <ClassCodeProvider>
      <RootLayout />
    </ClassCodeProvider>
  </AuthProvider>
);

export default RootLayoutWithProvider;
