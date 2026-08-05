import { Invoices } from "@/features/invoices/invoices";
import { useInvoices } from "@/features/invoices/useInvoices";
import { NewInvoice } from "@/features/new-invoice/new-invoice";
import { Stack } from "@mui/material";

const HomePage = () => {
  const { rows, loading, loadFailed, reload, removeInvoice } = useInvoices();

  return (
    <Stack
      direction="column"
      sx={{ justifyContent: "center", alignItems: "flex-start", alignSelf: "stretch", gap: 3 }}
    >
      <NewInvoice onSaved={reload} />

      <Invoices
        rows={rows}
        loading={loading}
        loadFailed={loadFailed}
        removeInvoice={removeInvoice}
      />
    </Stack>
  );
};

export default HomePage;
