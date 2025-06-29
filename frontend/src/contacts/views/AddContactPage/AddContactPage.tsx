import { IconButton } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";

import { Main } from "../../components";

export default function AddContactPage() {
  return (
    <Main>
      <IconButton variant="outline">
        <ChevronLeft />
        Back
      </IconButton>
      <h2>Add Contact</h2>
    </Main>
  );
}
