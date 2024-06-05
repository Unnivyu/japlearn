import React, { useState, useEffect, useContext } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as Font from 'expo-font';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { ClassCodeProvider } from '../context/ClassCodeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getFonts = () => Font.loadAsync({ 'Jua': require('../assets/fonts/Jua.ttf') });

const routeAccessConfig = {
  student: ['Menu', 'StartMenu', 'ScenePrompter', 'Profile'],
  teacher: ['TeacherDashboard', 'ScenePrompter', 'ProfileTeacher'],
};

const defaultRouteByRole = {
  student: 'Menu',
  teacher: 'TeacherDashboard',
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
        setIsMounted(true);
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
    if (isMounted && fontLoaded) {
      const currentSegment = segments.length > 0 ? segments[0] : '';
      console.log("Current segment:", currentSegment, "User:", user);
  
      // Check if user is authenticated
      if (!user && (routeAccessConfig.student.includes(currentSegment) || routeAccessConfig.teacher.includes(currentSegment))) {
        router.replace('/Login');
      } else if (user) {
        // Check if the current segment is allowed for the user's role
        if (!routeAccessConfig[user.role].includes(currentSegment)) {
          // Redirect to the default route only if not already there
          const defaultRoute = defaultRouteByRole[user.role] || '/Login';
          if (currentSegment !== defaultRoute.slice(1)) { // Removing leading '/' for comparison
            router.replace(defaultRoute);
          }
        }
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
          <Stack.Screen name="Profile" />
        </>
      )}
      {user?.role === 'teacher' && (
        <>
          <Stack.Screen name="TeacherDashboard" />
          <Stack.Screen name="ProfileTeacher" />
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
