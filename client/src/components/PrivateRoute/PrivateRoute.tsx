import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { API_ACCOUNT } from "@config/app.config";
import { useAccount } from "@providers/account.provider";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const { account, setAccount } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);

  console.log(account);
  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${API_ACCOUNT}/get-account-profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const userData = response.data;
          setAccount(userData);
          sessionStorage.setItem("user", JSON.stringify(userData));
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
  }, [token, setAccount]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default PrivateRoute;
