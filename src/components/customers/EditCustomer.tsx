import { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import { NewCustomer } from "../../models/new_customer";
import { Customer } from "../../models/customer";
import dataService from "../../services/data-service";

export default function EditCustomer(customer: Customer, getCustomerData: () => void) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [editCustomer, setEditCustomer] = useState<NewCustomer>({
    firstname: customer.firstName,
    lastname: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    streetaddress: customer.streetAdress,
    postcode: customer.postCode,
    city: customer.city,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditCustomer({
      ...editCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dataService.editCustomer(customer.links.self, editCustomer);
    if (result.status != 200) {
      setErrorMessage(result.message);
    } else {
      handleClose();
      getCustomerData();
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Edit</Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
              onFormSubmit(event),
          },
        }}
      >
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <DialogContentText color="error">{errorMessage}</DialogContentText>
          )}
          <TextField
            autoFocus
            required
            margin="dense"
            name="firstname"
            value={editCustomer.firstname}
            label="First name"
            onChange={(event) => handleInputChange(event)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="lastname"
            value={editCustomer.lastname}
            label="Last name"
            onChange={(event) => handleInputChange(event)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="email"
            value={editCustomer.email}
            label="Email"
            onChange={(event) => handleInputChange(event)}
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="phone"
            value={editCustomer.phone}
            label="Phone"
            onChange={(event) => handleInputChange(event)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="streetaddress"
            value={editCustomer.streetaddress}
            label="Street address"
            onChange={(event) => handleInputChange(event)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="postcode"
            value={editCustomer.postcode}
            label="Postcode"
            onChange={(event) => handleInputChange(event)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="city"
            value={editCustomer.city}
            label="City"
            onChange={(event) => handleInputChange(event)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
