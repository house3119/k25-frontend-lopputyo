import { Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


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
        <div className='container'>
          <Outlet />
        </div>
        
      </Box>
    </>
  )
}

export default App
