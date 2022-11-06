import React from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles,
}) => {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some((role: string) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
