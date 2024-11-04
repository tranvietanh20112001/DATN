import { IRoute } from "@interfaces/common.interface";
import ListOfProjects from "../pages/managements/projects/projects";
import Home from "../pages/managements/home/home";
import Campus from "../pages/managements/campus/campus";
import Teacher from "../pages/managements/teacher/teacher";
import Faculty from "../pages/managements/faculty/faculty";
import Student from "../pages/managements/student/student";
import AddNewProject from "../pages/managements/projects/AddNewProjectPage/AddNewProject";
import YourAccount from "../pages/managements/yourAccount/yourAccount";
import Account from "../pages/managements/account/account";
import Tag from "@pages/managements/hastag/tag";
import Comment from "@pages/managements/comment/comment";
export const managementRoutes: IRoute[] = [
  {
    path: "/do-an",
    component: <ListOfProjects />,
  },
  {
    path: "/trang-chu",
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
  {
    path: "/tai-khoan",
    component: <Account />,
  },
  {
    path: "/tai-khoan-cua-ban",
    component: <YourAccount />,
  },
  {
    path: "/tag",
    component: <Tag />,
  },
  {
    path: "/binh-luan",
    component: <Comment />,
  },
];
