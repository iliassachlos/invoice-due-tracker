import { Alert, IconButton, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { EditInvoiceDialog } from "@/features/edit-invoice/edit-invoice-dialog";
import { formatDate } from "@/utils/dates";

import type { InvoiceRow } from "./useInvoices";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface InvoicesProps {
  rows: InvoiceRow[];
  loading: boolean;
  loadFailed: boolean;
  removeInvoice: (id: string) => void;
  reload: () => void;
}

export const Invoices = ({ rows, loading, loadFailed, removeInvoice, reload }: InvoicesProps) => {
  const [pendingDelete, setPendingDelete] = useState<InvoiceRow | null>(null);
  const [pendingEdit, setPendingEdit] = useState<InvoiceRow | null>(null);

  const { t } = useTranslation();
  const theme = useTheme();

  const confirmDelete = () => {
    if (pendingDelete) removeInvoice(pendingDelete.id);
    setPendingDelete(null);
  };

  const columns: GridColDef<InvoiceRow>[] = [
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
      cellClassName: ({ row }) => (row.status === "overdue" ? "invoice-cell--overdue" : ""),
    },
    {
      field: "actions",
      headerName: "",
      width: 110,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center", height: "100%", gap: 1 }}
        >
          <Tooltip title={t("invoices.edit")}>
            <IconButton
              size="small"
              onClick={() => setPendingEdit(row)}
              sx={{ "&:hover": { color: theme.palette.primary.main } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("invoices.delete")}>
            <IconButton
              size="small"
              onClick={() => setPendingDelete(row)}
              sx={{ "&:hover": { color: theme.palette.error.main } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
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
        localeText={{ noRowsLabel: t("invoices.noRows") }}
        getRowClassName={({ row }) => `invoice-row--${row.status}`}
        sx={{
          width: "100%",
          "& .invoice-row--overdue": {
            bgcolor: theme.palette.error.light,
          },
          "& .invoice-row--dueSoon": {
            bgcolor: theme.palette.warning.light,
          },
        }}
      />

      <EditInvoiceDialog
        invoice={pendingEdit}
        onClose={() => setPendingEdit(null)}
        onSaved={reload}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        title={t("invoices.deleteTitle")}
        message={t("invoices.deleteMessage", {
          invoiceNumber: pendingDelete?.invoiceNumber ?? "",
        })}
        confirmLabel={t("invoices.delete")}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </Stack>
  );
};
