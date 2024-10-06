import { Route, Routes } from "react-router";
import { blogRouter } from "./blog.router";
import { authRouter } from "./auth.router";
import BlogLayout from "@pages/blogs/blog.layout";
import AuthLayout from "@pages/auth/auth.layout";
import PrivateRoute from "@components/PrivateRoute/PrivateRoute";
export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<BlogLayout />}>
          {blogRouter.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        {authRouter.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
      </Route>
    </Routes>
  );
}
