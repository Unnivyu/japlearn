// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role state

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData.user);
          setRole(parsedUserData.role); // Set role from stored data
        } else {
          // Navigate to the login screen if there is no user data
          const navigation = useNavigation();
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };
    getUserData();
  }, []);

  const login = async (userData) => {
    if (userData) {
      setUser(userData.user);
      setRole(userData.role); // Set role when logging in
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    } else {
      console.error('Error: userData is null or undefined');
    }
  };

  const logout = async () => {
    setUser(null);
    setRole(null); 
    try {
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
