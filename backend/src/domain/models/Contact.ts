export interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Contact extends ContactInput {
  id: number;
  createdAt: string;
}
