import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { API_ACCOUNT } from "../../config/app.config";
import { useAccount } from "@providers/account.provider";

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const { Account, setAccount } = useAccount();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      const fetchAccountData = async () => {
        try {
          const response = await axios.get(
            `${API_ACCOUNT}/get-account-profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const AccountData = response.data;
          setAccount(AccountData);
          localStorage.setItem("account", JSON.stringify(AccountData));
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch Account data:", error);
          setLoading(false);
        }
      };

      fetchAccountData();
    } else {
      setLoading(false);
    }
  }, [token, setAccount]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (Account && (Account.role === "Admin" || Account.role === "editor")) {
    return <Outlet />;
  }

  return <Navigate to="/no-access" />;
};

export default PrivateRoute;
