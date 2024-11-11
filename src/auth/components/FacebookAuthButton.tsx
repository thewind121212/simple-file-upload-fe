import { LoadingButton } from "@mui/lab";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useTheme } from "@mui/material/styles";
import { generateRandomState } from "@/lib/utils";

export const AuthButtonWithFacebook = ({authMethod, btnCtx} : {authMethod: "login" | "register", btnCtx: string}) => {
  const clientId = "1771132680384554";
  const redirectUri = "http://localhost:5173/auth/facebook/callback";

  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  const handleLogin = () => {
    const authorizationUrl = `https://www.facebook.com/v21.0/dialog/oauth`;
    //save the state in the local storage
    localStorage.setItem("state", generateRandomState());

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      display: "popup",
      state: authMethod + "-" + generateRandomState(),
    }).toString();

    window.location.href = `${authorizationUrl}?${params}`;
  };

  return (
    <LoadingButton
      onClick={handleLogin}
      size="small"
      type="submit"
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
      loading={false}
      variant="outlined"
      startIcon={<FacebookIcon />}
    >
      {btnCtx}
    </LoadingButton>
  );
};
