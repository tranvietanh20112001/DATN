import "./App.css";
import NotificationProvider from "@providers/notification.provider";
import AppProvider from "./providers/app.provider";
import AppRoutes from "./routers/app.router";
function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </AppProvider>
  );
}

export default App;
