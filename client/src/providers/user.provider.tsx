import React, { createContext, useContext, useState, ReactNode } from "react";
import { IGetUerProfile } from "@interfaces/user.interface";
interface UserContextType {
  user: IGetUerProfile | null;
  setUser: React.Dispatch<React.SetStateAction<IGetUerProfile | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IGetUerProfile | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
