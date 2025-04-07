import { useEffect, useState } from "react";
import { Customer } from "../models/customer"
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import { useRef } from "react";
import dataService from "../services/data-service"

ModuleRegistry.registerModules([AllCommunityModule]);


export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([ ]);
  const gridRef = useRef<AgGridReact<Customer>>(null);

  useEffect(() => {
    getCustomerData();
  }, [])

  const getCustomerData = async () => {
    setCustomers(await dataService.getAllCustomers());
  }

  const [columnDefs] = useState<ColDef<Customer>[]>([
    {
      field: "firstName",
      sortable: false,
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "lastName",
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "streetAdress",
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "postCode",
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "city",
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "email",
      filter: true,
      floatingFilter: true,
      flex: 1
    },
    {
      field: "phone",
      filter: true,
      floatingFilter: true,
      flex: 1
    }
  ]);

  return (
    <div>
      <h1 className="my-3">Customers</h1>
      <div className="ag-theme-material" style={{width: "100%"}}>
        <AgGridReact
          columnDefs={columnDefs}
          ref={gridRef} 
          rowData={customers.map(customer => customer)}
          rowSelection="single"
          domLayout="autoHeight"
        />
      </div>
    </div>
  )
}
