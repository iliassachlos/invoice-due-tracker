export type Invoice = {
  supplierName: string;
  invoiceNumber: string;
  purchaseDate: string;
  amount: number;
  paymentDays: number;
  done: boolean;
};

/** An invoice read back from Firestore, carrying its document id */
export type InvoiceWithId = Invoice & { id: string };
