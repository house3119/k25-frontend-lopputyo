import { Customer } from "../models/customer";
import { Training } from "../models/training";

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
          self: c._links.self.href,
          trainings: c._links.trainings.href
        }
      })
    })
    return customerArray;
}


const getAllTrainings = async () : Promise<Training[]> => {
  const response = await fetch(`${apiUrl}/trainings`);
  const data = await response.json();
  const trainingData = data._embedded.trainings;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trainingArray = trainingData.map((t: any) => {
    return ({
      customerFirstName: '',
      customerLastName: '',
      activity: t.activity,
      duration: t.duration,
      date: new Date(t.date),
      links: {
        self: t._links.self.href,
        customer: t._links.customer.href
      }
    })
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalArray = trainingArray.map(async (t: any) => {
    const res = await fetch(t.links.customer);
    const data = await res.json();
    return ({
      ...t,
      customerFirstName: data.firstname,
      customerLastName: data.lastname
    })
  })

  return await Promise.all(finalArray);
}

export default {
  getAllCustomers,
  getAllTrainings
}