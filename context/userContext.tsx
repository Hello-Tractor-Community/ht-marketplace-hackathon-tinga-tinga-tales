'use client';

import React, { createContext, useContext} from 'react';

interface UserContextProps {
    user: User | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({user, children }: {user: User | null, children: React.ReactNode}) => {

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};