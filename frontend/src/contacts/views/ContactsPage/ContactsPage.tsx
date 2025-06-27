import useContacts from "../../hooks/useContacts";

export default function ContactsPage() {
  const { contacts, isError } = useContacts();

  if (isError) {
    return (
      <div role="alert">
        <h2>Something went wrong.</h2>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>{`${contact.firstName} ${contact.lastName}`}</li>
      ))}
    </ul>
  );
}
