import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";
import { generateRandomState } from "@/lib/utils";

export const AuthButtonWithGoogle = ({authMethod, btnCtx} : {authMethod: "login" | "register", btnCtx: string}) => {

  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";


  const handleGoogleLogin = () => {
    const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const clientId = "631616764148-8f9vco8s2rid09dht4jjptk0pph0lkfh.apps.googleusercontent.com";
    const redirectUri = "http://localhost:5173/auth/google/callback";


    // Construct the URL parameters
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid profile email",
        state: authMethod + "-" + generateRandomState(),
        access_type: "offline", 
        prompt: "consent", // Force consent screen to allow refresh token issuance
    }).toString();

    // Redirect the user to Google login
    window.location.href = `${authorizationUrl}?${params}`;
};


  return (
    <LoadingButton
      size="small"
      type="submit"
      loading={false}
      onClick={handleGoogleLogin}
      sx={{
        borderRadius: "8px",
        height: "40px",
        fontSize: "16px",
        backgroundColor: isDarkMode
          ? theme.palette.common.white
          : theme.palette.grey[800],
        color: isDarkMode
          ? theme.palette.common.black
          : theme.palette.common.white,
        "&:hover": {
          backgroundColor: isDarkMode
            ? theme.palette.grey[300]
            : theme.palette.common.black,
        },
      }}
      variant="outlined"
      startIcon={<GoogleIcon />}
    >
        {btnCtx}
    </LoadingButton>
  );
};
