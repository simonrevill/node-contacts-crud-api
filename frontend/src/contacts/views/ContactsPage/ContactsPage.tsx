import useContacts from "../../hooks/useContacts";

export default function ContactsPage() {
  const { isError } = useContacts();

  if (isError) {
    return (
      <div role="alert">
        <h2>Something went wrong.</h2>
        <p>Please try again later</p>
      </div>
    );
  }
}
