import { Topbar } from "@/shared/ui/Topbar";
import { httpClient } from "@/shared/httpClient";
import {
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { RegisterSchemaRHF, RegisterSchema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { AuthButtonWithGoogle } from "./GoogleAuthButton";
import { AuthButtonWithFacebook } from "./FacebookAuthButton";
import { AuthButtonWithMicrosoft } from "./MicrosoftAuthButton";
import { AuthButtonWithGithub } from "./GithubAuthButton";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaRHF>({
    mode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  const onSubmit = async (data: RegisterSchemaRHF) => {
    const newData: RegisterSchemaRHF & {
      googleProviderId?: string;
      microsoftProviderId?: string;
      githubProviderId?: string;
      loginProvider: string;
    } = {
      ...data,
      loginProvider: "local",
    };
    await httpClient.post("auth/register", newData);
  };

  return (
    <>
      <Topbar />
      <Container
        sx={{
          paddingY: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Stack sx={{ gap: 2, width: "320px" }}>
          <Typography variant="h5">
            Welcome To Wliafdew File Manager, Register{" "}
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-auto gap-4 flex flex-col"
          >
            <TextField
              {...register("username")}
              label="User Name"
              error={!!errors.username}
              helperText={errors.username?.message}
              type="text"
              variant="outlined"
              sx={{
                ".MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              {...register("firstName")}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              type="text"
              variant="outlined"
              sx={{
                ".MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <TextField
              {...register("lastName")}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              type="text"
              variant="outlined"
              sx={{
                ".MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
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
            <TextField
              {...register("passwordConfirmation")}
              label="Cofirm Password"
              error={!!errors.passwordConfirmation}
              helperText={errors.passwordConfirmation?.message}
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
              Sign Up
            </LoadingButton>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption" className="cursor-default">
                Don't want to sign up with email?
              </Typography>
            </Stack>

            <AuthButtonWithGoogle
              authMethod="register"
              btnCtx="Sign Up With Google"
            />
            <AuthButtonWithFacebook
              authMethod="register"
              btnCtx="Sign Up With Facebook"
            />
            <AuthButtonWithMicrosoft
              authMethod="register"
              btnCtx="Sign Up With Microsoft"
            />
            <AuthButtonWithGithub
              authMethod="register"
              btnCtx="Sign Up With Github"
            />
          </form>
        </Stack>
      </Container>
    </>
  );
}
