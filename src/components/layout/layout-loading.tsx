import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const LayoutLoading = () => (
  <Stack
    sx={{
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}
  >
    <CircularProgress />
  </Stack>
);
