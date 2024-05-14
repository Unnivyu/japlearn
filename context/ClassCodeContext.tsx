import React, { createContext, useState } from 'react';

const ClassCodeContext = createContext();

export const ClassCodeProvider = ({ children }) => {
    const [classCode, setClassCode] = useState('');

    return (
        <ClassCodeContext.Provider value={{ classCode, setClassCode }}>
            {children}
        </ClassCodeContext.Provider>
    );
};

export const useClassCode = () => {
    return useContext(ClassCodeContext);
};
