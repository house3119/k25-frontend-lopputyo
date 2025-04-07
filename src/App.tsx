import './App.css'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              <Button color='inherit' href='/'>Lopputyö</Button>
            </Typography>
            <Button color='inherit' href='/customer'>
              Customers
            </Button>
            <Button color='inherit'href='/training'>
              Trainings
            </Button>
          </Toolbar>
        </AppBar>

        <Outlet />
      </Box>
      
    </>
  )
}

export default App
