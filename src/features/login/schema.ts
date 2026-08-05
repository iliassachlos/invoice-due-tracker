import { z } from "zod";

import { t } from "@/i18n/config";

export const loginSchema = z.object({
  email: z.email(t("login.invalidEmail")),
  password: z.string().min(1, t("login.passwordRequired")),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginDefaultValues: LoginSchema = {
  email: "",
  password: "",
};
