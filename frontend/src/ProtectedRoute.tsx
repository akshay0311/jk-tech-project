import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ path, children }: { path: any, children: React.ReactNode }) => {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token") || localStorage.getItem("jwt");

    if (token) {
      localStorage.setItem("jwt", token);
      login();
      navigate(path , { replace: true });
    }
  }, [location.search, login, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
