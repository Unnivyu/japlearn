import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  fname: string;
  lname: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => Promise<void>; // Updated login function to accept a User object
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const userDataString = await AsyncStorage.getItem('user');
      if (userDataString) {
        const userData: User = JSON.parse(userDataString);
        setUser(userData);
      }
    };
    loadUserData();
  }, []);

  const login = async (userData: User) => { // Updated login function to accept a User object
    try {
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
