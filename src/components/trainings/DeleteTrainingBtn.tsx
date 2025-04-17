import Button from "@mui/material/Button";
import { Training } from "../../models/training";
import { format } from "date-fns";

export default function DeleteTrainingBtn(trainingToBeDeleted: Training, getTrainingData: () => void) {
  
  const deleteTraining = async () => {
    if (window.confirm(`Are you sure you want to remove training:\n${trainingToBeDeleted.customerFirstName} ${trainingToBeDeleted.customerLastName}, ${trainingToBeDeleted.activity} ${trainingToBeDeleted.duration} min, ${format(trainingToBeDeleted.date, "dd.MM.yyyy hh:mm")}`)) {
      await fetch(trainingToBeDeleted.links.self, {method: 'DELETE'});
      getTrainingData();
    }
  }

  return(
    <Button color="error" onClick={deleteTraining}>
      Delete
    </Button>
  )
}