import { Alert, IconButton, Stack, SvgIcon, Tooltip, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "@/components/confirm-dialog";
import { formatDate } from "@/utils/dates";

import type { InvoiceRow } from "./useInvoices";

const TrashIcon = () => (
  <SvgIcon fontSize="small">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </SvgIcon>
);

interface InvoicesProps {
  rows: InvoiceRow[];
  loading: boolean;
  loadFailed: boolean;
  removeInvoice: (id: string) => void;
}

export const Invoices = ({ rows, loading, loadFailed, removeInvoice }: InvoicesProps) => {
  const { t } = useTranslation();

  // The invoice awaiting delete confirmation, or null when the dialog is shut.
  const [pendingDelete, setPendingDelete] = useState<InvoiceRow | null>(null);

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
    },
    {
      field: "actions",
      headerName: "",
      width: 70,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: ({ row }) => (
        <Tooltip title={t("invoices.delete")}>
          <IconButton size="small" color="error" onClick={() => setPendingDelete(row)}>
            <TrashIcon />
          </IconButton>
        </Tooltip>
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
        sx={{ width: "100%" }}
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
