import { Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";

interface NoContactsProps {
  onAddContact: () => void;
}

export default function NoContacts({ onAddContact }: NoContactsProps) {
  return (
    <div role="alert">
      <h2>No Contacts</h2>
      <p>Add a contact to get started</p>
      <Button
        variant="solid"
        size="lg"
        colorScheme="teal"
        onClick={onAddContact}
      >
        <Plus />
        Add contact
      </Button>
    </div>
  );
}
