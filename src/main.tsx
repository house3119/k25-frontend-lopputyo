import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import CustomerList from "./components/customers/CustomerList.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB, fi } from "date-fns/locale";
import TrainingMain from "./components/trainings/TrainingMain.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <CustomerList />,
        index: true,
      },
      {
        path: "training",
        element: <TrainingMain />,
      },
      {
        path: "customer",
        element: <CustomerList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </StrictMode>
);
