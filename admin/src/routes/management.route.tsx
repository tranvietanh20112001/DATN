import { IRoute } from "@interfaces/common.interface";
import ListOfProjects from "../pages/managements/projects/projects";
import Home from "../pages/managements/home/home";
export const managementRoutes : IRoute[] = [
    {
        path: "/do-an",
        component: <ListOfProjects/>
    },
    {
        path: "/trang-chu",
        component: <Home/>
    }
]