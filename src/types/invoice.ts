export type Invoice = {
  supplierName: string;
  invoiceNumber: string;
  purchaseDate: string;
  amount: number;
  paymentDays: number;
  done: boolean;
};

// Invoice with an ID, used for editing existing invoices
export type InvoiceWithId = Invoice & { id: string };
