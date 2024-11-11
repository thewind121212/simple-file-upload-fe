import { Topbar } from "@/shared/ui/Topbar";
import { Container } from "@mui/material";
import FileManager from "./fileManager/components/FileManager";

export function App() {
  return (
    <>
      <Topbar />
      <Container sx={{ paddingY: 5 }}>
        <FileManager />
      </Container>
    </>
  );
}
