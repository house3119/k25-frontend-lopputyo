import { Customer } from "../models/customer";

const apiUrl = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

const getAllCustomers = async () : Promise<Customer[]> => {
    const response = await fetch(`${apiUrl}/customers`);
    const data = await response.json();
    const customerData = data._embedded.customers;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customerArray = customerData.map((c: any) => {
      return ({
        firstName: c.firstname,
        lastName: c.lastname,
        streetAdress: c.streetaddress,
        postCode: c.postcode,
        city: c.city,
        email: c.email,
        phone: c.phone,
        links: {
          self: c._links.self,
          trainings: c._links.trainings
        }
      })
    })
    return customerArray;
}

export default {
  getAllCustomers,
}