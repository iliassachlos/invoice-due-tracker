import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { paths } from "@/routes/paths";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      sx={{ justifyContent: "center", alignItems: "center", height: "100vh", gap: 2 }}
    >
      <Typography variant="h4">
        {t("notFound.title")}
      </Typography>

      <Button component={RouterLink} to={paths.home} variant="contained">
        {t("common.goHome")}
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
