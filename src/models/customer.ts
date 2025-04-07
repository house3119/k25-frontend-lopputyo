export type Customer = {
  firstName: string;
  lastName: string;
  streetAdress: string;
  postCode: string;
  city: string;
  email: string;
  phone: string;
  links: {
    self: string;
    trainings: string;
  }
}