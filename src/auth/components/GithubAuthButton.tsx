import { LoadingButton } from "@mui/lab";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";
import { generateRandomState } from "@/lib/utils";

export const AuthButtonWithGithub = ({authMethod, btnCtx} : {authMethod: "login" | "register", btnCtx: string}) => {
  const clientId = "776de494aeba17ce3c5e";
  const redirectUri = "http://localhost:5173/auth/github/callback";

  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  const handleLogin = () => {
    const authorizationUrl = `https://github.com/login/oauth/authorize`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_mode: "query",
      scope: "read:user user:email",
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
      startIcon={<GitHubIcon />}
    >
      {btnCtx}
    </LoadingButton>
  );
};
