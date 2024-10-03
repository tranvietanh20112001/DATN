import "react-toastify/dist/ReactToastify.css"; // Css for toast notification

import { ReactNode, useEffect } from "react";
import { APP_TITLE } from "@config/app.config";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@stores/index.store";

interface IAppProviderProps {
  children: ReactNode;
}

export default function AppProvider({ children }: IAppProviderProps) {
  useEffect(() => {
    document.title = APP_TITLE;
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
}
