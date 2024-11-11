import { alpha, ButtonBase, colors, Stack, Typography } from "@mui/material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { useDropzone } from "react-dropzone";
import { useFileManagerStore } from "../hooks/useFileManagerStore";
import UploadProgressCard from "./UploadProgressCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useFileUploadMutation } from "../hooks/useFileUploadMutation";
import FilesDataGrid from "./FilesDataGrid";

export default function FileManager() {
  const files = useFileManagerStore((state) => state.files);
  const [autoAnimateRef] = useAutoAnimate();
  const fileUploadMutation = useFileUploadMutation();

  const onDrop = (acceptedFiles: File[]) => {
    //check if name + 37 > 255 then return file to long
    fileUploadMutation.mutate(
      acceptedFiles.map((file) => {
        if (file.name.length + 37 > 255) {
          return {
            file: file,
                id: `${file.name}${file.size}`,
                uploadProgress: 0,
                uploadStatus: "error",
            }
        }
       return  {
        file: file,
        id: `${file.name}${file.size}`,
        uploadProgress: 0,
        uploadStatus: "idle",
      }})
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    maxFiles: 15,
    maxSize: 10 * 1024 * 1024 * 1024,
  });
  return (
    <>
      <Typography variant="h4">File</Typography>
      <Typography sx={{ marginBottom: 3 }}>
        Files and assets that have been uploaded
      </Typography>
      <ButtonBase
        sx={(theme) => {
          return {
            backgroundColor: alpha(colors.grey[500], 0.1),
            padding: 2,
            width: 1,
            borderRadius: `${theme.shape.borderRadius}px`,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 3,
          };
        }}
        disableRipple={true}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <FileUploadRoundedIcon fontSize="large" />
        <Stack sx={{ alignItems: "center", gap: 1 }}>
          <Typography>Click to upload or drag and drop</Typography>
          <Typography>Max 10GB</Typography>
        </Stack>
        <Stack sx={{ gap: 2, width: 1 }} ref={autoAnimateRef}>
          {files.map((file) => (
            <Stack key={file.id}>
              <UploadProgressCard {...file} />
            </Stack>
          ))}
        </Stack>
      </ButtonBase>
      <FilesDataGrid/>
    </>
  );
}
