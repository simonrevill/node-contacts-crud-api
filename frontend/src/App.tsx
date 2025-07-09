import { Route, Routes } from "react-router";

import { Header } from "components";
import { ContactsPage, AddContactPage } from "views";

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
