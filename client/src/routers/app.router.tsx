import { Route, Routes } from "react-router";
import { blogRouter } from "./blog.router";
import BlogLayout from "@pages/blogs/blog.layout";
export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<BlogLayout />}>
        {blogRouter.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
      </Route>
    </Routes>
  );
}
