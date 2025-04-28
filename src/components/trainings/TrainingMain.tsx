import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import Tab from "@mui/material/Tab";
import { useState } from 'react';
import TrainingList from './TrainingList';
import TrainingCalendar from './TrainingCalendar';
import TrainingChart from './TrainingChart';

export default function TrainingMain() {
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return(
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX: '24px' }}>
          <h1 className="my-3">Trainings</h1>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="List View" value="1" />
            <Tab label="Calendar" value="2" />
            <Tab label="Charts" value="3" />
          </TabList>     
        </Box>

        <div className='mb-5'>
          <TabPanel value="1">
            <TrainingList />
          </TabPanel>

          <TabPanel value="2">
            <TrainingCalendar />
          </TabPanel>

          <TabPanel value="3">
            <TrainingChart />
          </TabPanel> 
        </div>
      </TabContext>
    </>
  )
}