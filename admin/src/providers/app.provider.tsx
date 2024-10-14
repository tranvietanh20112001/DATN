import { ReactNode, useEffect } from "react";
import { APP_TITLE } from "../config/app.config";
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "./account.provider";
import NotificationProvider from "./notification.provider";
interface IAppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: IAppProviderProps) {
  useEffect(() => {
    document.title = APP_TITLE;
  }, []);

  return (
    <BrowserRouter>
      <NotificationProvider>
        <AccountProvider>{children}</AccountProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
