import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { API_USER } from "../../config/app.config";
const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const fetchUserData = async (token: string) => {
      try {
        const response = await axios.get(`${API_USER}/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;

        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData;
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
