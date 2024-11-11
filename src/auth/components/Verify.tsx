import { Topbar } from "@/shared/ui/Topbar";
import { Container, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/shared/httpClient";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { LoadingButton } from "@mui/lab";

export default function Verify() {
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";
  const [searchParams] = useSearchParams();
  const [verifyStatus, setVerifyStatus] = useState<
    "verifying" | "success" | "fail"
  >("verifying");

  const token = searchParams.get("v");
  const email = searchParams.get("e");

  const mutation = useMutation({
    onError: () => {
      setVerifyStatus("fail");
    },
    mutationFn: async ({ email, token }: { email: string; token: string }) => {
      await httpClient.post("/auth/verify_account", {
        token,
        email,
      });
    },
    onSuccess: () => {
      setVerifyStatus("success");
    },
  });

  useEffect(() => {
    if (token && email) {
      mutation.mutate({ email, token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = mutation.error as AxiosError | null;

  const reSendEmail = async () => {
    await httpClient.post("/auth/resend_verify_email", {
      email,
    });
  };

  return (
    <>
      <Topbar />
      <Container
        sx={{
          height: "calc(100vh - 64px)",
          paddingY: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {verifyStatus === "success" && (
          <div>
            Your account {email} has been successfully verified. You now have
            full access to all features.
          </div>
        )}
        {verifyStatus === "fail" && error && error.status === 409 && (
          <div>Account Already Verify</div>
        )}
        {verifyStatus === "fail" && error && error.status === 400 && (
          <div>
            <p>Invalid Verify Link</p>
            <LoadingButton
              size="small"
              type="submit"
              onClick={reSendEmail}
              loading={false}
              sx={{
                borderRadius: "8px",
                height: "40px",
                fontSize: "16px",
                marginTop: "8px",
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
                Resend Email
            </LoadingButton>
          </div>
        )}
      </Container>
    </>
  );
}
