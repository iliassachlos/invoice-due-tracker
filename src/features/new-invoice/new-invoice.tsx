import { Alert, Button, Card, Divider, Grid, Stack, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { RhfDatePicker } from "@/components/form/rhf-date-picker";
import { RhfTextField } from "@/components/form/rhf-text-field";
import { formatDate } from "@/utils/dates";

import { useNewInvoice } from "./useNewInvoice";

interface NewInvoiceProps {
  /** Called after a successful save, so the list can refresh. */
  onSaved?: () => void;
}

export const NewInvoice = ({ onSaved }: NewInvoiceProps) => {
  const { methods, handleSubmit, onSubmit, isSubmitting, saveFailed, dueDate } =
    useNewInvoice(onSaved);
  const { t } = useTranslation();

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 4 },
        width: "100%",
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
      }}
    >
      <FormProvider {...methods}>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ gap: 3 }} noValidate>
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              {t("newInvoice.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("newInvoice.subtitle")}
            </Typography>
          </Stack>

          {saveFailed && (
            <Alert severity="error" variant="outlined">
              {t("newInvoice.failed")}
            </Alert>
          )}

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <RhfTextField name="supplierName" label={t("newInvoice.supplierName")} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <RhfTextField name="invoiceNumber" label={t("newInvoice.invoiceNumber")} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <RhfTextField
                name="amount"
                numeric
                label={t("newInvoice.amount")}
                slotProps={{ input: { endAdornment: "€" }, htmlInput: { min: 0 } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <RhfDatePicker name="purchaseDate" label={t("newInvoice.purchaseDate")} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <RhfTextField
                name="paymentDays"
                numeric
                label={t("newInvoice.paymentDays")}
                slotProps={{ htmlInput: { min: 0 } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                sx={{
                  height: 56,
                  px: 2,
                  justifyContent: "center",
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {t("newInvoice.dueDate")}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                  {formatDate(dueDate)}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider />

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center", gap: 2 }}
          >
            <Typography variant="caption" color="text.secondary">
              {t("newInvoice.dueDateHint")}
            </Typography>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disableElevation
              loading={isSubmitting}
              sx={{ borderRadius: 2, px: 3, textTransform: "none" }}
            >
              {t("newInvoice.submit")}
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </Card>
  );
};
