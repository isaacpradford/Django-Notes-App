import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import { useState, useEffect } from "react";
import "../styles/Loading.css";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // As soon as a protected route is loaded, check if they're authorized
  useEffect(() => {
    auth().catch(() => {
      setIsAuthorized(false);
    });
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        // If successful, set it in local storage for api.js to use
        localStorage.setItem(ACCESS_TOKEN, res.data.acess);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
    }
    const decoded = jwtDecode(token);

    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // Get date in seconds

    if (tokenExpiration < now) {
      // If the token is expired, get the refresh token, else set authorized = true
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <LoadingIndicator />;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
