import { IRoute } from "@interfaces/common.interface";
import Homepage from "@pages/blogs/homepage/homepage";

export const blogRouter: IRoute[] = [
  {
    path: "/",
    component: <Homepage />,
  },
];
