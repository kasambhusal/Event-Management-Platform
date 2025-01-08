"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the User type
interface User {
  id: string | null;
  name: string | null;
  email: string | null;
}

// Define the context type
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Create the context with a default value of `undefined`
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: null,
    name: null,
    email: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
