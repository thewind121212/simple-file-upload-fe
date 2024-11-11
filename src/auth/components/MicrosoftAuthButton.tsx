import { LoadingButton } from "@mui/lab";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { useTheme } from "@mui/material/styles";
import { generateRandomState } from "@/lib/utils";

export const AuthButtonWithMicrosoft = ({authMethod, btnCtx} : {authMethod: "login" | "register", btnCtx: string}) => {
  const clientId = "aea45ffd-cf3b-4b9e-8bb4-78ede950b294";
  const tenantId = "45c0702f-b84e-4d00-9df4-866127ae042a";
  const redirectUri = "http://localhost:5173/auth/microsoft/callback";

  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  const handleLogin = () => {
    const authorizationUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`;
    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      response_mode: "query",
      scope: "openid profile offline_access User.Read",
      state:  authMethod + "-" + generateRandomState(),
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
      startIcon={<MicrosoftIcon />}
    >
      {btnCtx}
    </LoadingButton>
  );
};
