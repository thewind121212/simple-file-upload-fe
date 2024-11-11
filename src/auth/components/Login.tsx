import { Topbar } from "@/shared/ui/Topbar";
import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AuthButtonWithMicrosoft } from "./MicrosoftAuthButton";
import { AuthButtonWithGoogle } from "./GoogleAuthButton";
import { AuthButtonWithFacebook } from "./FacebookAuthButton";
import { LoginSchemaRHF, LoginSchema } from "../types/schema";
import { LoadingButton } from "@mui/lab";
import { AuthButtonWithGithub } from "./GithubAuthButton";

export default function Login() {
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaRHF>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
  });

  //   const onSubmit = (data: LoginSchemaRHF) => {
  //     console.log(data);
  //   };

  return (
    <>
      <Topbar />
      <Container
        sx={{
          paddingY: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <Stack sx={{ gap: 2, width: "320px" }}>
          <Typography variant="h5">Login To Wliafdew File Manager</Typography>
          <TextField
            {...register("email")}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            type="text"
            variant="outlined"
            sx={{
              ".MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            {...register("password")}
            label="Your Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            variant="outlined"
            sx={{
              ".MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <LoadingButton
            size="small"
            type="submit"
            loading={false}
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
          >
            Login
          </LoadingButton>
          <Stack direction="row" spacing={1}>
            <Typography variant="caption" className="cursor-default">
              Don't have an account?
            </Typography>
            <Typography variant="caption" className="cursor-pointer">
              <Link to="/sign-up">Sign up</Link>
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              className={`w-full h-[1px]`}
              style={{ backgroundColor: theme.palette.grey[500] }}
            />
            <Typography variant="h6" sx={{ fontSize: "12px" }}>
              OR
            </Typography>
            <span
              className="w-full h-[1px] bg-white"
              style={{ backgroundColor: theme.palette.grey[500] }}
            />
          </Stack>
          <AuthButtonWithGoogle authMethod="login" btnCtx="Login With Google" />
          <AuthButtonWithFacebook
            authMethod="login"
            btnCtx="Login With Facebook"
          />
          <AuthButtonWithMicrosoft
            authMethod="login"
            btnCtx="Login With Microsoft"
          />
          <AuthButtonWithGithub
            authMethod="login"
            btnCtx="Login With Github"
          />
        </Stack>
      </Container>
    </>
  );
}
