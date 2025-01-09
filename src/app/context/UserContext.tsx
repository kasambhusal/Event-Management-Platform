"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User type
interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

// Define the context type
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updateUserContext: (user: User) => void;
  logout: () => void;
}

// Create the context with a default value of `undefined`
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({});

  const updateUserContext = (updatedUser: User): void => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  const logout = (): void => {
    setUser({});
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUserContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
