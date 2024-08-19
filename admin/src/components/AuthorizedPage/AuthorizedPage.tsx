import { Navigate, useLocation } from "react-router-dom";
import { ERole } from "@interfaces/user.interface";
import { notifyError } from "@utils/notification.utils";
import { ReactNode } from "react";

interface IAuthorizedPageProps {
  allowedRoles?: ERole[];
  children: ReactNode;
}

export default function AuthorizedPage({
  allowedRoles,
  children,
}: IAuthorizedPageProps) {

  const { pathname } = useLocation();

  if (!user) return <Navigate to={"/login" + "?redirect=" + pathname} />;

  if (!allowedRoles || allowedRoles.includes(user!.role)) {
    return <>{children}</>;
  }

  notifyError("You are not authorized to access this page!");
  return <Navigate to="/" />;
}