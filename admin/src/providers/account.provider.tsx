import { IAccount } from "@interfaces/account.interface";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AccountContextType {
  Account: IAccount | null;
  setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
};

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [Account, setAccount] = useState<IAccount | null>(null);

  return (
    <AccountContext.Provider value={{ Account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
