import dayjs from "dayjs";
import "dayjs/locale/el";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import gr from "./locales/gr.json";

dayjs.locale("el");

export const defaultNS = "translation";

export const resources = {
  gr: { translation: gr },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "gr",
  fallbackLng: "gr",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export const t = i18n.t;

export default i18n;
