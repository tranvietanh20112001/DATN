import { IRoute } from "@interfaces/common.interface";
import Homepage from "@pages/blogs/homepage/homepage";
import ProjectDetail from "@pages/blogs/projectDetail/projectDetail";
export const blogRouter: IRoute[] = [
  {
    path: "/",
    component: <Homepage />,
  },
  {
    path: "/project/:id",
    component: <ProjectDetail />,
  },
];
