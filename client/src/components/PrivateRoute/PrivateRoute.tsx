import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { API_ACCOUNT } from "@config/app.config";
import { useUser } from "@providers/user.provider";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API_ACCOUNT}/get-user-profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = response.data;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default PrivateRoute;
