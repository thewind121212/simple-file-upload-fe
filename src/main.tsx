import { App } from "@/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./auth/components/Login";
import SignUp from "./auth/components/SignUp";
import Verify from "./auth/components/Verify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfirmProvider } from "@/shared/confirm/components/ConfirmProvider";
import { theme } from "@/shared/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CallbackMicrosoftAuth from "./auth/components/CallBackLoginWithMicrosoft";
import CallBackGithubAuth from "./auth/components/CallBackLoginWithGithub";
import CallBackFacebookAuth from "./auth/components/CallBackLoginWithFacebook";
import CallBackGoogleAuth from "./auth/components/CallBackLoginWithGoogle";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/linh",
    element: <App />,
  },
  {
    path: "/auth/google/callback",
    element: <CallBackGoogleAuth />,
  },
  {
    path: "/auth/microsoft/callback",
    element: <CallbackMicrosoftAuth />,
  },
  {
    path: "/auth/facebook/callback",
    element: <CallBackFacebookAuth />,
  },
  {
    path: "/auth/github/callback",
    element: <CallBackGithubAuth />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="631616764148-8f9vco8s2rid09dht4jjptk0pph0lkfh.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConfirmProvider>
          <RouterProvider router={router} />
        </ConfirmProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
