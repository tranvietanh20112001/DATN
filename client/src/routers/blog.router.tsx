import { IRoute } from "@interfaces/common.interface";
import Homepage from "@pages/blogs/homepage/homepage";
import ProjectDetail from "@pages/blogs/projectDetail/projectDetail";
import Campus from "@pages/blogs/campus/Campus";
import CampusDetail from "@pages/blogs/campusDetail/campusDetail";
import StudentDetail from "@pages/blogs/studentDetail/studentDetail";
import AccountProfile from "@pages/blogs/accountProfile/accountProfile";
import AboutUs from "@pages/blogs/AboutUs/AboutUs";
import ProjectByTag from "@pages/blogs/ProjectsByTag/ProjectByTag";
import ChatAI from "@pages/blogs/ChatAI/ChatAI";
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
    path: "/projects/:tag",
    component: <ProjectByTag />,
  },
  {
    path: "/co-so",
    component: <Campus />,
  },
  {
    path: "/co-so/:id",
    component: <CampusDetail />,
  },
  {
    path: "/sinh-vien/:id",
    component: <StudentDetail />,
  },
  {
    path: "/ho-so-cua-ban",
    component: <AccountProfile />,
  },
  {
    path: "/ve-chung-toi",
    component: <AboutUs />,
  },
  {
    path: "/chat-with-ai",
    component: <ChatAI />,
  },
];
