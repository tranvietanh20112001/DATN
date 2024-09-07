import { Route, Routes } from "react-router";
import { authRoutes } from "./auth.route";
import AuthLayout from "../pages/auth/auth.layout";
import { managementRoutes} from "./management.route";
import ManagementLayout from "../pages/managements/management.layout";
export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {authRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
      </Route>

      <Route element={<ManagementLayout />}>
        {managementRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
      </Route>
    </Routes>
  );
}