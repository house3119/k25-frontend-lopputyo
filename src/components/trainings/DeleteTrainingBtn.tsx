import Button from "@mui/material/Button";
import { Training } from "../../models/training";
import { format } from "date-fns";

export default function DeleteTrainingBtn(trainingToBeDeleted: Training, getTrainingData: () => void) {
  const apiUrl = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';
  
  const deleteTraining = async () => {
    if (window.confirm(`Are you sure you want to remove training:\n${trainingToBeDeleted.customerFirstName} ${trainingToBeDeleted.customerLastName}, ${trainingToBeDeleted.activity} ${trainingToBeDeleted.duration} min, ${format(trainingToBeDeleted.date, "dd.MM.yyyy hh:mm")}`)) {
      await fetch(`${apiUrl}/trainings/${trainingToBeDeleted.id}`, {method: 'DELETE'});
      getTrainingData();
    }
  }

  return(
    <Button color="error" onClick={deleteTraining}>
      Delete
    </Button>
  )
}