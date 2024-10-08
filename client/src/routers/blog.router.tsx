import { IRoute } from "@interfaces/common.interface";
import Homepage from "@pages/blogs/homepage/homepage";
import ProjectDetail from "@pages/blogs/projectDetail/projectDetail";
import Campus from "@pages/blogs/campus/Campus";
export const blogRouter: IRoute[] = [
  {
    path: "/",
    component: <Homepage />,
  },
  {
    path: "/project/:id",
    component: <ProjectDetail />,
  },
  {
    path: "/co-so",
    component: <Campus />,
  },
];
