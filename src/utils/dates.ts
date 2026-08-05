import dayjs, { type Dayjs } from "dayjs";

export const DUE_SOON_DAYS = 3;

/**
 *  Calculates the due date based on the purchase date and payment days.
 *
 * @param purchaseDate - The date of purchase as a Dayjs object.
 * @param paymentDays - The number of days until payment is due.
 * @returns The due date as a Dayjs object, or null if inputs are invalid.
 */
export const getDueDate = (purchaseDate: Dayjs | null, paymentDays: number | null) => {
  if (!purchaseDate?.isValid() || paymentDays === null || Number.isNaN(paymentDays)) {
    return null;
  }

  return purchaseDate.add(paymentDays, "day");
};

export const formatDate = (date: Dayjs | null) => (date ? date.format("DD/MM/YYYY") : "—");

export const today = () => dayjs().startOf("day");

export type InvoiceStatus = "done" | "overdue" | "dueSoon" | "upcoming";

export const getInvoiceStatus = (dueDate: Dayjs | null, done: boolean): InvoiceStatus => {
  if (done) return "done";
  if (!dueDate?.isValid()) return "upcoming";

  const daysLeft = dueDate.startOf("day").diff(today(), "day");

  if (daysLeft < 0) return "overdue";
  if (daysLeft <= DUE_SOON_DAYS) return "dueSoon";

  return "upcoming";
};
