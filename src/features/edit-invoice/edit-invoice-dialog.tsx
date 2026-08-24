import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { RhfDatePicker } from "@/components/form/rhf-date-picker";
import { RhfTextField } from "@/components/form/rhf-text-field";
import type { InvoiceWithId } from "@/types/invoice";
import { formatDate } from "@/utils/dates";

import { useEditInvoice } from "./useEditInvoice";

interface EditInvoiceDialogProps {
  invoice: InvoiceWithId | null;
  onClose: () => void;
  onSaved: () => void;
}

export const EditInvoiceDialog = ({ invoice, onClose, onSaved }: EditInvoiceDialogProps) => {
  const { t } = useTranslation();

  const handleSave = () => {
    onSaved();
    onClose();
  };

  const { methods, handleSubmit, onSubmit, isSubmitting, saveFailed, dueDate } = useEditInvoice(
    invoice,
    handleSave,
  );

  return (
    <Dialog open={!!invoice} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("editInvoice.title")}</DialogTitle>

      <FormProvider {...methods}>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(event) => {
            const target = event.target as HTMLElement;

            if (event.key === "Enter" && target.tagName === "INPUT") {
              event.preventDefault();
            }
          }}
          noValidate
        >
          <DialogContent>
            <Stack sx={{ gap: 2.5 }}>
              {saveFailed && (
                <Alert severity="error" variant="outlined">
                  {t("editInvoice.failed")}
                </Alert>
              )}

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <RhfTextField name="supplierName" label={t("newInvoice.supplierName")} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <RhfTextField name="invoiceNumber" label={t("newInvoice.invoiceNumber")} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <RhfTextField
                    name="amount"
                    numeric
                    label={t("newInvoice.amount")}
                    slotProps={{ input: { endAdornment: "€" }, htmlInput: { min: 0 } }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <RhfDatePicker name="purchaseDate" label={t("newInvoice.purchaseDate")} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <RhfTextField
                    name="paymentDays"
                    numeric
                    label={t("newInvoice.paymentDays")}
                    slotProps={{ htmlInput: { min: 0 } }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
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
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={onClose} color="inherit">
              {t("common.cancel")}
            </Button>
            <Button type="submit" variant="contained" disableElevation loading={isSubmitting}>
              {t("editInvoice.submit")}
            </Button>
          </DialogActions>
        </Stack>
      </FormProvider>
    </Dialog>
  );
};
