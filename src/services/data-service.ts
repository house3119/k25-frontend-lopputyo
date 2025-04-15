import { Customer } from "../models/customer";
import { NewCustomer } from "../models/new_customer";
import { NewTraining } from "../models/new_training";
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

const addCustomer = async (newCustomer: NewCustomer) => {
  try {
    const response = await fetch(`${apiUrl}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });

    if (response.status != 201) {
      return ({
        status: response.status,
        message: "Error during saving customer. Please try again."
      })

    } else {
      return ({
        status: 201,
        message: "OK"
      })
    }

  } catch (error) {
    console.error(error);
    return ({
      status: 500,
      message: "Unexpected error"
    })
  }
}


const editCustomer = async (editUrl: string, editCustomer: NewCustomer) => {
  try {
    const response = await fetch(editUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editCustomer),
    });

    if (response.status != 200) {
      return ({
        status: response.status,
        message: "Error during saving customer. Please try again."
      })

    } else {
      return ({
        status: 200,
        message: "OK"
      })
    }

  } catch (error) {
    console.error(error);
    return ({
      status: 500,
      message: "Unexpected error"
    })
  }
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


const addTraining = async (newTraining: NewTraining) => {
  try {
    const response = await fetch(`${apiUrl}/trainings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...newTraining, date: newTraining.date?.toISOString()}),
    });

    if (response.status != 201) {
      return ({
        status: response.status,
        message: "Error during saving training. Please try again."
      })

    } else {
      return ({
        status: 201,
        message: "OK"
      })
    }

  } catch (error) {
    console.error(error);
    return ({
      status: 500,
      message: "Unexpected error"
    })
  }
}


export default {
  getAllCustomers,
  getAllTrainings,
  addCustomer,
  editCustomer,
  addTraining
}