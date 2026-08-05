import { db } from "@/firebase/config";
import type { Invoice, InvoiceWithId } from "@/types/invoice";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const invoicesCollection = collection(db, "invoices");

export const addInvoice = async (payload: Invoice) => {
  await addDoc(invoicesCollection, payload);
};

export const getInvoices = async (): Promise<InvoiceWithId[]> => {
  const snapshot = await getDocs(invoicesCollection);

  return snapshot.docs.map((entry) => ({
    id: entry.id,
    ...(entry.data() as Invoice),
  }));
};

export const setInvoiceDone = async (id: string, done: boolean) => {
  await updateDoc(doc(db, "invoices", id), { done });
};

export const deleteInvoice = async (id: string) => {
  await deleteDoc(doc(db, "invoices", id));
};
