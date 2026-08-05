import { Alert, alpha, Checkbox, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { formatDate } from "@/utils/dates";

import type { InvoiceRow } from "./useInvoices";

interface InvoicesProps {
  rows: InvoiceRow[];
  loading: boolean;
  loadFailed: boolean;
  toggleDone: (id: string, done: boolean) => void;
}

export const Invoices = ({ rows, loading, loadFailed, toggleDone }: InvoicesProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const columns: GridColDef<InvoiceRow>[] = [
    {
      field: "done",
      headerName: t("invoices.done"),
      width: 110,
      sortable: false,
      renderCell: ({ row }) => (
        <Checkbox
          checked={row.done}
          onChange={(event) => toggleDone(row.id, event.target.checked)}
        />
      ),
    },
    { field: "supplierName", headerName: t("invoices.supplierName"), flex: 1, minWidth: 140 },
    { field: "invoiceNumber", headerName: t("invoices.invoiceNumber"), flex: 1, minWidth: 130 },
    {
      field: "purchaseDate",
      headerName: t("invoices.purchaseDate"),
      width: 130,
      valueFormatter: (value: string) => formatDate(value ? dayjs(value) : null),
    },
    {
      field: "amount",
      headerName: t("invoices.amount"),
      width: 120,
      type: "number",
      valueFormatter: (value: number) => `${value.toFixed(2)} €`,
    },
    { field: "paymentDays", headerName: t("invoices.paymentDays"), width: 110, type: "number" },
    {
      field: "dueDate",
      headerName: t("invoices.dueDate"),
      width: 130,
      valueFormatter: (value: InvoiceRow["dueDate"]) => formatDate(value),
    },
  ];

  if (loadFailed) {
    return <Alert severity="error">{t("invoices.loadFailed")}</Alert>;
  }

  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: 2,
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {t("invoices.title")}
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
        pageSizeOptions={[10, 25, 50]}
        getRowClassName={({ row }) => `invoice-row--${row.status}`}
        sx={{
          width: "100%",
          border: 0,
          "& .invoice-row--overdue": {
            bgcolor: alpha(theme.palette.error.main, 0.12),
            "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.18) },
          },
          "& .invoice-row--dueSoon": {
            bgcolor: alpha(theme.palette.warning.main, 0.15),
            "&:hover": { bgcolor: alpha(theme.palette.warning.main, 0.22) },
          },

          "& .invoice-row--done": {
            opacity: 0.55,
          },
        }}
      />
    </Stack>
  );
};
