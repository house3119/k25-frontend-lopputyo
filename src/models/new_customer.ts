export type NewCustomer = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
}

export const emptyNewCustomer:NewCustomer = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  streetaddress: '',
  postcode: '',
  city: '',
}

export interface NewCustomerProps {
  getCustomerData: () => void;
}
