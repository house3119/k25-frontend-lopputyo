import { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dataService from "../../services/data-service";
import { emptyNewTraining, NewTraining, NewTrainingProps } from "../../models/new_training";
import { DatePicker, TimeField } from "@mui/x-date-pickers";
import { Customer } from "../../models/customer";

export default function AddTraining(props: NewTrainingProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [newTraining, setNewTraining] = useState<NewTraining>(emptyNewTraining);
  const [customers, setCustomers] = useState<Customer[]>([ ]);

  useEffect(() => {
    getCustomerData()
  }, [])

  const getCustomerData = async () => {
    setCustomers(await dataService.getAllCustomers());
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
    setNewTraining(emptyNewTraining);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewTraining({ ...newTraining, [event.target.name]: event.target.value });
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(newTraining)
    event.preventDefault();
    const result = await dataService.addTraining(newTraining);
    if (result.status != 201) {
      setErrorMessage(result.message);
    } else {
      handleClose();
      props.getTrainingData();
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
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
        }}>

        <DialogTitle>Add New Training</DialogTitle>
        <DialogContent className="pt-2">
          {errorMessage && (
            <DialogContentText color="error">{errorMessage}</DialogContentText>
          )}

          <FormControl style={{width: "12em", marginBottom: "1em"}}>
            <InputLabel id="customer-select" style={{backgroundColor: "white"}}>Customer</InputLabel>
            <Select
              labelId="customer-select"
              value={newTraining.customer}
              label="Priority"
              onChange={event => setNewTraining({ ...newTraining, customer: event.target.value})}
            >
              {customers.map(customer => {
                return(
                  <MenuItem value={customer.links.self}>{customer.firstName} {customer.lastName}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <br />

          <DatePicker
            label="Date"
            format="dd.MM.yyyy"
            onChange={date => setNewTraining({ ...newTraining, date: date})}
            value={newTraining.date}
          />

          <TimeField
            style={{marginLeft: "20px"}}
            label="Time"
            format="HH:mm"
            disabled={newTraining.date ? false : true}
            value={newTraining.date}
            onChange={date => setNewTraining({ ...newTraining, date: date})}
          />

          <TextField
            required
            margin="dense"
            name="activity"
            value={newTraining.activity}
            label="Activity"
            onChange={(event) => handleInputChange(event)}
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            name="duration"
            value={newTraining.duration}
            label="Duration (minutes)"
            onChange={(event) => handleInputChange(event)}
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ min: 1, max: 999 }}
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
