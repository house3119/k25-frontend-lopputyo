import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import { useRef } from "react";
import { Training } from "../models/training";
import { format } from "date-fns";
import dataService from "../services/data-service"

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
      <div className="ag-theme-material" style={{width: "100%", height: "1000px"}}>
        <AgGridReact
          columnDefs={columnDefs}
          ref={gridRef} 
          rowData={trainings.map(training => training)}
          rowSelection="single"
        />
      </div>
    </div>
  )
}
