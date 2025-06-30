import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

import App from "./App.tsx";
import { ContactsApiProvider } from "./contacts/api/ContactsApiProvider.tsx";
import { createContactsApiAdapter } from "./contacts/api/ContactsApiService.ts";

const contactsApi = createContactsApiAdapter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ContactsApiProvider api={contactsApi}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContactsApiProvider>
    </ChakraProvider>
  </StrictMode>
);
