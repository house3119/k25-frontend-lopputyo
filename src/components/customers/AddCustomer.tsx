import { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import { NewCustomer, emptyNewCustomer, NewCustomerProps } from "../../models/new_customer";
import dataService from "../../services/data-service";

export default function AddCustomer(props: NewCustomerProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [newCustomer, setNewCustomer] = useState<NewCustomer>(emptyNewCustomer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    setNewCustomer(emptyNewCustomer);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };
  
  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dataService.addCustomer(newCustomer);

    if (result.status != 201) {
      setErrorMessage(result.message);
    } else {
      handleClose();
      props.getCustomerData();
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
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
            value={newCustomer.firstname}
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
            value={newCustomer.lastname}
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
            value={newCustomer.email}
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
            value={newCustomer.phone}
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
            value={newCustomer.streetaddress}
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
            value={newCustomer.postcode}
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
            value={newCustomer.city}
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
