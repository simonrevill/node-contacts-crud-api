import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import App from "./App.tsx";
import { ContactsApiProvider } from "./contacts/api/ContactsApiProvider.tsx";
import { ContactsApi } from "./contacts/api/ContactsApi.ts";

const contactsApiServive = new ContactsApi();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ContactsApiProvider api={contactsApiServive}>
        <App />
      </ContactsApiProvider>
    </ChakraProvider>
  </StrictMode>
);
