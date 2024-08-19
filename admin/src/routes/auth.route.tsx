import { IRoute } from "@interfaces/common.interface";
import Login from "../pages/auth/login/login";

export const authRoutes : IRoute[] = [
    {
        path: "/login",
        component: <Login/>
    }
]