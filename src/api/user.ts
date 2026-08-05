import type { LoginSchema } from "@/features/login/schema";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (payload: LoginSchema) => {
  await signInWithEmailAndPassword(auth, payload.email, payload.password);
};
