import { updateInvoice } from "@/api/invoice";
import { newInvoiceSchema, type NewInvoiceSchema } from "@/features/new-invoice/schema";
import type { InvoiceWithId } from "@/types/invoice";
import { getDueDate } from "@/utils/dates";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const toFormValues = (invoice: InvoiceWithId): NewInvoiceSchema => ({
  supplierName: invoice.supplierName,
  invoiceNumber: invoice.invoiceNumber,
  purchaseDate: dayjs(invoice.purchaseDate),
  amount: invoice.amount,
  paymentDays: invoice.paymentDays,
});

export const useEditInvoice = (invoice: InvoiceWithId | null, onSaved?: () => void) => {
  const [saveFailed, setSaveFailed] = useState(false);

  const methods = useForm<NewInvoiceSchema>({
    resolver: zodResolver(newInvoiceSchema),
    defaultValues: invoice ? toFormValues(invoice) : undefined,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Reset form values when invoice changes
  useEffect(() => {
    if (invoice) {
      reset(toFormValues(invoice));
    }
  }, [invoice, reset]);

  const purchaseDate = useWatch({ control, name: "purchaseDate" });
  const paymentDays = useWatch({ control, name: "paymentDays" });

  const dueDate = getDueDate(purchaseDate, paymentDays);

  const onSubmit = async (formData: NewInvoiceSchema) => {
    if (!invoice) return;

    try {
      await updateInvoice(invoice.id, {
        supplierName: formData.supplierName,
        invoiceNumber: formData.invoiceNumber,
        purchaseDate: formData.purchaseDate.format("YYYY-MM-DD"),
        amount: formData.amount,
        paymentDays: formData.paymentDays,
        done: invoice.done,
      });

      onSaved?.();
      setSaveFailed(false);
    } catch {
      setSaveFailed(true);
    }
  };

  return {
    methods,
    isSubmitting,
    saveFailed,
    dueDate,
    handleSubmit,
    onSubmit,
  };
};
