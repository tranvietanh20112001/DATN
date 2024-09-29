import { ReactNode, useEffect } from "react";
import { APP_TITLE } from "../config/app.config";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./user.provider";
interface IAppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: IAppProviderProps) {
  useEffect(() => {
    document.title = APP_TITLE;
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>{children}</UserProvider>
    </BrowserRouter>
  );
}
