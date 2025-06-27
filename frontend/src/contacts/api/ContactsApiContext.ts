import { createContext, useContext } from "react";
import type { IContactsAPI } from "../../types";

export const ContactsApiContext = createContext<IContactsAPI | null>(null);

export function useContactsApi() {
  const context = useContext(ContactsApiContext);

  if (!context) {
    throw new Error("useContactsApi must be used within a ContactsApiProvider");
  }

  return context;
}
