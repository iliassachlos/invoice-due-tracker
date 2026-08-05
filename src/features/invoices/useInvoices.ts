import { deleteInvoice, getInvoices, setInvoiceDone } from "@/api/invoice";
import type { InvoiceWithId } from "@/types/invoice";
import { getDueDate, getInvoiceStatus, type InvoiceStatus } from "@/utils/dates";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";

export type InvoiceRow = InvoiceWithId & {
  dueDate: Dayjs | null;
  status: InvoiceStatus;
};

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<InvoiceWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const load = async () => {
    try {
      setInvoices(await getInvoices());
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInvoices = async () => {
      load();
    };

    loadInvoices();
  }, []);

  const toggleDone = async (id: string, done: boolean) => {
    setInvoices((current) =>
      current.map((invoice) => (invoice.id === id ? { ...invoice, done } : invoice)),
    );

    try {
      await setInvoiceDone(id, done);
    } catch {
      load();
    }
  };

  const removeInvoice = async (id: string) => {
    // Drop it from the list straight away, then persist.
    setInvoices((current) => current.filter((invoice) => invoice.id !== id));

    try {
      await deleteInvoice(id);
    } catch {
      load();
    }
  };

  const rows: InvoiceRow[] = invoices
    .map((invoice) => {
      const dueDate = getDueDate(dayjs(invoice.purchaseDate), invoice.paymentDays);

      return { ...invoice, dueDate, status: getInvoiceStatus(dueDate, invoice.done) };
    })
    // Oldest purchase date first.
    .sort((a, b) => a.purchaseDate.localeCompare(b.purchaseDate));

  return { rows, loading, loadFailed, reload: load, toggleDone, removeInvoice };
};
