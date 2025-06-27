import { render } from "@testing-library/react";

import { useContactsApi } from "../../../src/contacts/api/ContactsApiContext";

describe("ContactsApiContext tests", () => {
  it("should throw an error when useContactsApi is called outside of ContactsApiProvider", () => {
    // Arrange
    const TestComponent = () => {
      useContactsApi();
      return null;
    };

    // Assert
    expect(() => {
      render(<TestComponent />);
    }).toThrowError("useContactsApi must be used within a ContactsApiProvider");
  });
});
