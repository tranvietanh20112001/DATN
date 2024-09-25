import { IRoute } from "@interfaces/common.interface";
import ListOfProjects from "../pages/managements/projects/projects";
import Home from "../pages/managements/home/home";
import Campus from "../pages/managements/campus/campus";
import Teacher from "../pages/managements/teacher/teacher";
import Faculty from "../pages/managements/faculty/faculty";
import Student from "../pages/managements/student/student";
import AddNewProject from "../pages/managements/projects/AddNewProjectPage/AddNewProject";
export const managementRoutes: IRoute[] = [
  {
    path: "/do-an",
    component: <ListOfProjects />,
  },
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/co-so",
    component: <Campus />,
  },
  {
    path: "/giao-vien",
    component: <Teacher />,
  },
  {
    path: "/chuyen-nganh",
    component: <Faculty />,
  },
  {
    path: "/sinh-vien",
    component: <Student />,
  },
  {
    path: "/tao-moi-do-an",
    component: <AddNewProject />,
  },
];
