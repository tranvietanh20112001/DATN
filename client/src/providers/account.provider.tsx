import React, { createContext, useContext, useState, ReactNode } from "react";
import { IGetAccountProfile } from "@interfaces/account.interface";
interface AccountContextType {
  account: IGetAccountProfile | null;
  setAccount: React.Dispatch<React.SetStateAction<IGetAccountProfile | null>>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within a accountProvider");
  }
  return context;
};

interface accountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<accountProviderProps> = ({
  children,
}) => {
  const [account, setAccount] = useState<IGetAccountProfile | null>(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
