    import React, { createContext, useState } from 'react';

    export const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState(null);
        const [role, setRole] = useState(null); 

        const login = (userData) => {
            console.log('Logging in with user data:', userData);
        
            setUser(userData);
        
            if (userData.user && userData.user.classList) {
                console.log('User is a teacher.');
                setRole('teacher');
            } else {
                console.log('User is not a teacher.');
                setRole('user');
            }
        };
        
        const logout = () => {
            setUser(null);
            setRole(null);
        };

        return (
            <AuthContext.Provider value={{ user, role, login, logout }}> 
                {children}
            </AuthContext.Provider>
        );
    };
