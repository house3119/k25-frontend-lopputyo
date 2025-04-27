import Button from "@mui/material/Button";

export default function ExportCustomersCsvBtn({ gridRefData }) {

  const params = {
    columnKeys: ['firstName', 'lastName', 'streetAdress', 'postCode', 'city', 'email', 'phone'],
    allColumns: false,
    fileName: 'customers.csv',
    skipHeader: false,
  }

  const exportData = () => {
    gridRefData.current!.api.exportDataAsCsv(params);
  };

  return(
    <>
      <Button color="secondary" variant="outlined" className="ms-2" onClick={exportData}>
        Export as CSV
      </Button>
    </>
  )
}