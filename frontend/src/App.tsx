import { Header } from "./contacts/components/Header";
import { ContactsPage } from "./contacts/views/ContactsPage";
import { AddContactPage } from "./contacts/views/AddContactPage";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="/create" element={<AddContactPage />} />
      </Routes>
    </>
  );
}

export default App;
