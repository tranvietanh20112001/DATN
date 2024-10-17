import "react-toastify/dist/ReactToastify.css";

import { ReactNode, useEffect } from "react";
import { APP_TITLE } from "@config/app.config";
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "./account.provider";
import Favicon from "react-favicon";
import logo from "@assets/logo.png";

interface IAppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: IAppProviderProps) {
  useEffect(() => {
    document.title = APP_TITLE;
  }, []);

  return (
    <BrowserRouter>
      <Favicon url={logo} />
      <AccountProvider>{children}</AccountProvider>
    </BrowserRouter>
  );
}
