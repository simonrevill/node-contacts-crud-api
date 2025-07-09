import { useContactsApi } from "api/ContactsApiContext";
import { renderWithProviders } from "test-utils";

describe("ContactsApiContext tests", () => {
  it("should throw an error when useContactsApi is called outside of ContactsApiProvider", () => {
    // Arrange
    const TestComponent = () => {
      useContactsApi();
      return null;
    };

    // Assert
    expect(() => {
      renderWithProviders(<TestComponent />);
    }).toThrowError("useContactsApi must be used within a ContactsApiProvider");
  });
});
