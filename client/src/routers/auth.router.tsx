import { IRoute } from "@interfaces/common.interface";
import Login from "@pages/auth/login/login";
import SignUp from "@pages/auth/signup/signup";
export const authRouter: IRoute[] = [
  {
    path: "/dang-nhap",
    component: <Login />,
  },
  {
    path: "/dang-ky",
    component: <SignUp />,
  },
];
