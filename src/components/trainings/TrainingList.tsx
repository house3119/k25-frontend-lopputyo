import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import { useRef } from "react";
import { Training } from "../../models/training";
import { format } from "date-fns";
import dataService from "../../services/data-service";
import AddTraining from "./AddTraining";

ModuleRegistry.registerModules([AllCommunityModule]);


export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([ ]);

  const gridRef = useRef<AgGridReact<Training>>(null);

  useEffect(() => {
    getTrainingData();
  }, [])

  
  const getTrainingData = async () => {
    setTrainings(await dataService.getAllTrainings());
  }
  

  const [columnDefs] = useState<ColDef<Training>[]>([
    {
      field: "customerFirstName",
      sortable: false,
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "customerLastName",
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "activity",
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "duration",
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "date",
      filter: true,
      floatingFilter: true,
      flex: 1,
      cellRenderer: (data: {value: Date}) => {
        return format(data.value, "dd.MM.yyyy hh:mm")
      }
    }
  ]);

  return (
    <div>
      <h1 className="my-3">Trainings</h1>
      <AddTraining getTrainingData={getTrainingData} />
      <div className="ag-theme-material mb-5 mt-2" style={{width: "100%"}}>
        <AgGridReact
          columnDefs={columnDefs}
          ref={gridRef} 
          rowData={trainings.map(training => training)}
          rowSelection="single"
          domLayout="autoHeight"
        />
      </div>
    </div>
  )
}
