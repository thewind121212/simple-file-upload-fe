// Callback.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "@/shared/httpClient";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState("Processing login...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const storedState = sessionStorage.getItem("oauth_state");
    console.log(storedState);
    if (!state || !code || !storedState) {
      setAuthState(
        "Authorization code or state not found. Redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    }


    const stateCode = state!.split("-");
    if (stateCode[1] !== storedState) {
      setAuthState("Invalid state. Redirecting to login page...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    }

    if (code) {
      httpClient
        .post("/auth/login_with_google", { code })
        .then((response) => {
          console.log("Response from server:", response.data);
        })
        .catch((error) => {
          if (stateCode[0] === "login" && error.status === 404) {
            setAuthState(
              "User not found. Please sign up first. Redirecting to signup page..."
            );
            setTimeout(() => {
              navigate("/sign-up");
            }, 1000);
          }
          console.error("Failed to exchange authorization code:", error);
        });
    } else {
      console.error("Authorization code not found");
    }
  }, [navigate]);

  return (
    <div className="w-full h-svh flex justify-center items-center">
      {authState}
    </div>
  );
};

export default Callback;
