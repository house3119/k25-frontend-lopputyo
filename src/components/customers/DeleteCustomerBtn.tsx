import Button from "@mui/material/Button";

export default function DeleteCustomerBtn(deleteUrl: string, firstname: string, lastname: string, getAllCustomers: () => void) {
  
  const deleteCustomer = async () => {
    if (window.confirm(`Are you sure you want to remove customer:\n${firstname} ${lastname}`)) {
      await fetch(deleteUrl, {method: 'DELETE'});
      getAllCustomers();
    }
  }

  return(
    <Button color="error" onClick={deleteCustomer}>
      Delete
    </Button>
  )
}
