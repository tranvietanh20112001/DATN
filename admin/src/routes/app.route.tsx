import { Route, Routes } from "react-router";
import { authRoutes } from "./auth.route";
import AuthLayout from "../pages/auth/auth.layout";
export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {authRoutes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
      </Route>
    </Routes>
  );
}