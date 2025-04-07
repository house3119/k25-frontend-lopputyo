export type Customer = {
  firstName: string;
  lastName: string;
  streetAdress: string;
  postCode: string;
  city: string;
  emal: string;
  phone: string;
  links: {
    self: string;
    trainings: string;
  }
}