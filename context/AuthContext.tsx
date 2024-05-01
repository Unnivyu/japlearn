import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);

        // Determine the user role
        const role = userData.user && userData.user.classList ? 'teacher' : 'user';
        
        // Store user data and role in local storage
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userRole', role);
    };
    
    const logout = () => {
        setUser(null);

        // Remove user data and role from local storage
        localStorage.removeItem('userData');
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}> 
            {children}
        </AuthContext.Provider>
    );
};
