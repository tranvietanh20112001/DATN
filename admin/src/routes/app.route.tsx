import { Route, Routes } from "react-router";
import { authRoutes } from "./auth.route";
import AuthLayout from "../pages/auth/auth.layout";
import { managementRoutes } from "./management.route";
import ManagementLayout from "../pages/managements/management.layout";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import NoAccess from "../pages/no-access/NoAccess";
export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {authRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<ManagementLayout />}>
          {managementRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Route>
      </Route>
      <Route path="/no-access" element={<NoAccess />}></Route>
    </Routes>
  );
}
