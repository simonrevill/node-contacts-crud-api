import { type ReactNode } from "react";
import type { IContactsAPI } from "types";
import { ContactsApiContext } from "api/ContactsApiContext";

export const ContactsApiProvider = ({
  api,
  children,
}: {
  api: IContactsAPI;
  children: ReactNode;
}) => (
  <ContactsApiContext.Provider value={api}>
    {children}
  </ContactsApiContext.Provider>
);
