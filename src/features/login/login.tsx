import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useLogin } from "./useLogin";

export const Login = () => {
  const { signInFailed, errors, isSubmitting, register, handleSubmit, onSubmit } = useLogin();
  const { t } = useTranslation();

  return (
    <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
      <Stack
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
          width: { xs: "100%", md: "40%" },
          gap: 2,
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ gap: 3, width: "100%" }}
          noValidate
        >
          <Typography variant="h5" component="h1">
            {t("login.title")}
          </Typography>

          {signInFailed && <Alert severity="error">{t("login.failed")}</Alert>}

          <TextField
            label={t("login.email")}
            type="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label={t("login.password")}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" variant="contained" size="large" loading={isSubmitting}>
            {t("login.submit")}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
