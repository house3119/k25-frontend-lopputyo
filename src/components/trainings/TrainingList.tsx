import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from 'ag-grid-community';
import { useRef } from "react";
import { Training } from "../../models/training";
import { format } from "date-fns";
import dataService from "../../services/data-service";
import AddTraining from "./AddTraining";
import DeleteTrainingBtn from "./DeleteTrainingBtn";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([ ]);

  const gridRef = useRef<AgGridReact<Training>>(null);

  useEffect(() => {
    getTrainingData();
  }, [])

  
  const getTrainingData = async () => {
    setTrainings(await dataService.getAllTrainings2());
  }
  

  const [columnDefs] = useState<ColDef<Training>[]>([
    {
      field: "customerFirstName",
      sortable: true,
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
        return format(data.value, "dd.MM.yyyy HH:mm")
      }
    },
    {
      cellRenderer: (params: ICellRendererParams<Training>) =>
        DeleteTrainingBtn(
          params.data as Training,
          getTrainingData
        ),
      flex: 1,
    }
  ]);

  return (
    <div>
      <AddTraining getTrainingData={getTrainingData} />
      <div className="ag-theme-material mb-3 mt-2" style={{width: "100%"}}>
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
