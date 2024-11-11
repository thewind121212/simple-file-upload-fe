// Callback.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "@/shared/httpClient";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      httpClient
        .post("/auth/login_with_microsoft", { code })
        .then((response) => {
          console.log("Response from server:", response.data);
        })
        .catch((error) => {
          console.error("Failed to exchange authorization code:", error);
        });
    } else {
      console.error("Authorization code not found");
    }
  }, [navigate]);

  return <div>Processing login...</div>;
};

export default Callback;
