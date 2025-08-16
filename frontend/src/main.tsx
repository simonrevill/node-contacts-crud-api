import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.tsx";
import { system } from "./theme.ts";
import { ContactsApiProvider } from "./contacts/api/ContactsApiProvider.tsx";
import { createContactsApiAdapter } from "./contacts/api/ContactsApiService.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const contactsApi = createContactsApiAdapter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <ContactsApiProvider api={contactsApi}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContactsApiProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
