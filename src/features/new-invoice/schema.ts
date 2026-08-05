import dayjs, { type Dayjs } from "dayjs";
import { z } from "zod";

import { t } from "@/i18n/config";

const dayjsSchema = z.custom<Dayjs>((value) => dayjs.isDayjs(value) && value.isValid(), {
  message: t("newInvoice.invalidDate"),
});

export const newInvoiceSchema = z.object({
  supplierName: z.string().trim().min(1, t("newInvoice.supplierNameRequired")),
  invoiceNumber: z.string().trim().min(1, t("newInvoice.invoiceNumberRequired")),
  purchaseDate: dayjsSchema,
  amount: z
    .number({ message: t("newInvoice.amountRequired") })
    .positive(t("newInvoice.amountPositive")),
  paymentDays: z
    .number({ message: t("newInvoice.paymentDaysRequired") })
    .int(t("newInvoice.paymentDaysInteger"))
    .min(0, t("newInvoice.paymentDaysPositive")),
});

export type NewInvoiceSchema = z.infer<typeof newInvoiceSchema>;

export const newInvoiceDefaultValues: NewInvoiceSchema = {
  supplierName: "",
  invoiceNumber: "",
  purchaseDate: dayjs().startOf("day"),
  amount: 0,
  paymentDays: 30,
};
