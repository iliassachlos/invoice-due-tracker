import { addInvoice } from "@/api/invoice";
import {
  newInvoiceDefaultValues,
  newInvoiceSchema,
  type NewInvoiceSchema,
} from "@/features/new-invoice/schema";
import type { Invoice } from "@/types/invoice";
import { getDueDate } from "@/utils/dates";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

export const useNewInvoice = (onSaved?: () => void) => {
  const [saveFailed, setSaveFailed] = useState(false);

  const methods = useForm<NewInvoiceSchema>({
    resolver: zodResolver(newInvoiceSchema),
    defaultValues: newInvoiceDefaultValues,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const purchaseDate = useWatch({ control, name: "purchaseDate" });
  const paymentDays = useWatch({ control, name: "paymentDays" });

  const dueDate = getDueDate(purchaseDate, paymentDays);

  const onSubmit = async (formData: NewInvoiceSchema) => {
    setSaveFailed(false);

    try {
      const payload: Invoice = {
        supplierName: formData.supplierName,
        invoiceNumber: formData.invoiceNumber,
        purchaseDate: formData.purchaseDate.format("YYYY-MM-DD"),
        amount: formData.amount,
        paymentDays: formData.paymentDays,
        done: false,
      };

      await addInvoice(payload);

      reset(newInvoiceDefaultValues);
      onSaved?.();
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
