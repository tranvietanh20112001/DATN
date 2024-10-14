import React, { createContext, useContext, useState, ReactNode } from "react";

interface Account {
  email: string;
  role: string;
}

interface AccountContextType {
  Account: Account | null;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
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
  const [Account, setAccount] = useState<Account | null>(null);

  return (
    <AccountContext.Provider value={{ Account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
