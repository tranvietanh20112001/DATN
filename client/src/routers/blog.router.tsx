import { IRoute } from "@interfaces/common.interface";
import Homepage from "@pages/blogs/homepage/homepage";
import ProjectDetail from "@pages/blogs/projectDetail/projectDetail";
import Campus from "@pages/blogs/campus/Campus";
import CampusDetail from "@pages/blogs/campusDetail/campusDetail";
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
  {
    path: "/co-so/:id",
    component: <CampusDetail />,
  },
];
